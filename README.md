# Chimp Memory Game

## Overview
Chimp Memory Game is a web-based interactive number sequence game that tests users' memory and reaction speed. Inspired by the [Japanese chimpanzee memory experiment](https://www.youtube.com/watch?v=PNrWUS13th8), this game challenges players to recall and click numbers in the correct order before they disappear.

## Features
- **Randomized Number Sequences**: Each game session generates a unique set of numbers.
- **Interactive Gameplay**: Click the numbers in the correct order to progress.
- **Audio & Visual Feedback**: Real-time responses to correct and incorrect actions using the Web Audio API.
- **Optimized Performance**: Efficient event-driven logic ensures smooth user interaction.

## Tech Stack
- **Frontend**: JavaScript (dynamic rendering & event handling)
- **Backend**: Rust (Actix Web) for serving static assets securely
- **Styling**: Tailwind CSS for a clean and responsive UI
- **Audio Processing**: Web Audio API for game sound effects

## Installation
1. **Clone the repository:**
   ```sh
   git clone https://github.com/AlexKaridas/chimp-memory-game.git
   cd chimp-memory-game
   ```
2. **Run the backend server:**
   ```sh
   cargo run
   ```
3. **Open the game in a browser:**
   ```sh
   http://127.0.0.1:8080
   ```

## How to Play
1. Click the "Start" button to begin.
2. Memorize the number positions before they disappear.
3. Click the numbers in ascending order.
4. Make fewer than two mistakes to win!

## License
This project is open-source under the MIT License.
