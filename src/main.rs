use actix_files::{Files, NamedFile};
use actix_web::{get, middleware, post, web, App, HttpResponse, HttpServer, Responder};
use openssl::ssl::{SslAcceptor, SslFiletype, SslMethod};
use std::sync::Mutex;

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
async fn root() -> std::io::Result<NamedFile> {
    NamedFile::open("static/chimps.html")
}

#[get("/test")]
async fn test_handler() -> impl Responder {
    HttpResponse::Ok().body("This is the test Handler")
}

#[actix_web::main]
async fn run() -> std::io::Result<()> {
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
    })
    .shutdown_timeout(10)
    .workers(4)
    .bind(("0.0.0.0", 8080))?
    .run()
    .await
}

fn main() {
    match run() {
        Ok(()) => println!("Running"),
        Err(err) => println!("Error: {:?}", err),
    }
}
