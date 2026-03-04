# 🐵 Chimp Memory Game

[![Rust](https://img.shields.io/badge/Rust-000000?style=for-the-badge&logo=rust&logoColor=white)](https://www.rust-lang.org/)
[![Actix-web](https://img.shields.io/badge/Actix--Web-222222?style=for-the-badge&logo=actix&logoColor=white)](https://actix.rs/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

A high-performance web implementation of the **Chimp Memory Test** (Ayumu Memory Test). This project demonstrates a full-stack application using **Rust** for a secure, high-concurrency backend and **Vanilla JavaScript** for a smooth, interactive frontend.

## 🌟 Overview

The Chimp Memory Game is inspired by a famous experiment involving Ayumu, a young chimpanzee at Kyoto University who outperformed humans in a numerical memory task. 

### Gameplay:
1.  **Memorize:** Numbers 1-9 appear randomly on a 3x5 grid.
2.  **Recall:** Once the first number (1) is clicked, all other numbers are hidden behind squares.
3.  **Sequence:** The player must click the hidden squares in ascending order (1 → 2 → ... → 9).
4.  **Precision:** Two mistakes lead to a "Game Over."

## 🚀 Key Features

-   **High-Performance Backend:** Built with Actix-web, providing low-latency static file serving and request handling.
-   **Robust Game Logic:** Implements the Fisher-Yates shuffle algorithm for fair and randomized grid generation.
-   **Security First:** Configured with **HTTPS/TLS** support using `openssl` for secure local and remote communication.
-   **Responsive Design:** Styled with Tailwind CSS to ensure a modern, polished look across different screen sizes.
-   **Interactive Feedback:** Integrated audio cues and visual animations (pulsing effects, color transitions) to enhance the user experience.

## 🛠️ Technical Stack

-   **Backend:** Rust, Actix-web, Actix-files, OpenSSL
-   **Frontend:** HTML5, CSS3 (Tailwind CSS), Vanilla JavaScript (ES6+)
-   **Deployment/Environment:** Cargo (Rust package manager), Environment Logging (env_logger)

## 🔧 Installation & Setup

### Prerequisites
-   [Rust & Cargo](https://rustup.rs/) (latest stable version)
-   SSL Certificates (`key.pem` and `cert.pem`) in the root directory.

### Running Locally
1.  **Clone the repository:**
    ```bash
    git clone https://github.com/AlexKaridas/chimp-memory-game.git
    cd chimp-memory-game
    ```
2.  **Generate or provide SSL certificates:**
    The server requires HTTPS. You can generate a self-signed certificate for local testing:
    ```bash
    openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
    ```
3.  **Run the application:**
    ```bash
    cargo run
    ```
4.  **Access in browser:**
    Open `https://localhost:8080`. (Accept the self-signed certificate warning if prompted).

## 📈 Future Roadmap

-   [ ] **Global Leaderboard:** Implement a persistent database (PostgreSQL/Redis) to track high scores.
-   [ ] **Custom Difficulty:** Adjustable grid sizes and number ranges.
-   [ ] **Progressive Web App (PWA):** Enable offline play and mobile installation.

---

*This project was developed with a focus on clean code, idiomatic Rust patterns, and performance-oriented frontend logic.*
