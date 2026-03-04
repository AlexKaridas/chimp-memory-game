# GEMINI.md - Chimp Game Project Context

This project is a Rust-based implementation of the "Chimp Game" (inspired by the Ayumu memory test), where players must click numbers in ascending order after they are hidden.

## Project Overview
- **Purpose:** A memory-testing web game where numbers (1-9) appear randomly on a grid and are hidden behind "?" after the first click.
- **Backend:** [Actix-web](https://actix.rs/) (Rust) serving static files and a few utility API endpoints.
- **Frontend:** Vanilla JavaScript, [Tailwind CSS](https://tailwindcss.com/) (via CDN), and HTML.
- **Security:** The server is configured to run over **HTTPS** using `openssl`.

## Architecture
- `src/main.rs`: The entry point for the Rust server. It handles routing, SSL configuration, and static file serving.
- `static/`: Contains all frontend assets.
  - `chimps.html`: The main UI structure.
  - `chimps.js`: Core game logic (shuffling, state management, timer).
  - `sound_files/`: Audio assets for win, lose, and error states.
- `Cargo.toml`: Project dependencies and metadata.

## Building and Running
### Prerequisites
- [Rust & Cargo](https://rustup.rs/) installed.
- SSL Certificates: The server requires `key.pem` and `cert.pem` in the project root. (Note: These are git-ignored and must be provided locally).

### Commands
- **Run the project:**
  ```bash
  cargo run
  ```
- **Access the game:**
  Navigate to `https://localhost:8080` in your browser.
  *Note: You may need to bypass the "Unsafe" browser warning for local self-signed certificates.*
- **Build for production:**
  ```bash
  cargo build --release
  ```
- **Run tests (if applicable):**
  ```bash
  cargo test
  ```

## Development Conventions
- **Static Assets:** All frontend files (JS, CSS, HTML, Audio) should be placed in the `static/` directory.
- **API Endpoints:**
  - `/`: Serves the main game (`chimps.html`).
  - `/static/*`: Serves assets from the `static/` folder.
  - `/counter`: Increments a session-based request counter.
  - `/hello`, `/echo`, `/test`: Utility/Boilerplate endpoints.
- **Code Style:**
  - **Backend:** Follow standard Rust idioms and Actix-web patterns.
  - **Frontend:** Use Vanilla JS for game logic and Tailwind CSS for styling. Prefer modern JS (ES6+) syntax.
