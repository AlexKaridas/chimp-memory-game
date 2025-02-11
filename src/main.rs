use actix_files::Files;
use actix_web::{get, middleware, post, web, App, HttpResponse, HttpServer, Responder};
use log::info;
use openssl::ssl::{SslAcceptor, SslFiletype, SslMethod};
use std::{fs, io::Read, path::Path, sync::Mutex};

struct AppState {
    app_name: String,
    counter: Mutex<i32>,
}

#[get("/counter")]
async fn index(data: web::Data<AppState>) -> String {
    let mut counter = match data.counter.lock() {
        Ok(c) => c,
        Err(poisoned) => poisoned.into_inner(),
    };
    *counter += 1;
    format!("Request number: {counter}!, and name is {}", data.app_name)
}

#[get("/hello")]
async fn hello() -> impl Responder {
    HttpResponse::Ok().body("Hello World!")
}

#[post("/echo")]
async fn echo(req_body: String) -> impl Responder {
    HttpResponse::Ok().body(req_body)
}

#[get("/")]
async fn root() -> impl Responder {
    match fs::read_to_string("static/chimps.html") {
        Ok(contents) => HttpResponse::Ok()
            .content_type("text/html; charset=utf-8")
            .body(contents),
        Err(_) => HttpResponse::InternalServerError().body("Error reading HTML file"),
    }
}

#[get("/test")]
async fn test_handler() -> impl Responder {
    HttpResponse::Ok().body("This is the test Handler")
}

async fn static_files(path: web::Path<String>) -> impl Responder {
    let filename = format!("static/{}", path.into_inner());

    info!("Requesting file: {}", filename);

    if let Ok(mut file) = fs::File::open(&filename) {
        let content_type = if filename.ends_with(".js") {
            "application/javascript"
        } else if filename.ends_with(".html") {
            "text/html"
        } else if filename.ends_with(".wav") {
            "audio/wav"
        } else if filename.ends_with(".mp3") {
            "audio/mpeg"
        } else {
            "application/octet-stream"
        };

        info!("Content-type: {}", content_type);

        let mut contents = Vec::new();
        if let Ok(_) = file.read_to_end(&mut contents) {
            info!("Successfully read the file returning response");
            return HttpResponse::Ok().content_type(content_type).body(contents);
        }
    } else {
        log::error!("Failed to find the file: {}", filename);
    }

    info!("File not found, returning 404");
    HttpResponse::NotFound().body("File not found")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    std::env::set_var("RUST_LOG", "actix_web=info");
    env_logger::init();

    let counter = web::Data::new(AppState {
        counter: Mutex::new(0),
        app_name: "Chimp_game".to_string(),
    });

    let mut builder = SslAcceptor::mozilla_intermediate(SslMethod::tls()).unwrap();
    builder
        .set_private_key_file("key.pem", SslFiletype::PEM)
        .unwrap();
    builder.set_certificate_chain_file("cert.pem").unwrap();

    HttpServer::new(move || {
        App::new()
            .app_data(counter.clone())
            .wrap(middleware::Logger::new("%a \"%r\" %s %b %T"))
            .service(root)
            .service(Files::new("/static", "./static").show_files_listing())
            .route("/{filename:.*}", web::get().to(static_files))
    })
    .shutdown_timeout(10)
    .workers(4)
    .bind(("0.0.0.0", 8080))?
    .run()
    .await
}
