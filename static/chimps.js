let mistakes = 0;
let begin = false;
let startTime;
let timerInterval;
let numbers = [];
let win_sound = "/static/sound_files/win_sound.mp3";
let game_over_sound = "/static/sound_files/game_over.mp3";
let error = "/static/sound_files/error.mp3";

window.onunhandledrejection = function (event) {
  console.log(`Reason: ${event.reason}`,
    `Return value: ${event.returnValue}`
  );
};

function playSound(path) {
  console.log("Playing sound: ", path);
  let sound = new Audio();
  const sourceMp3 = document.createElement('source');
  sourceMp3.src = path;
  sourceMp3.type = 'audio/mpeg';
  sound.appendChild(sourceMp3);

  sound.addEventListener('loadeddata', () => {
    sound.play();
  });

  sound.addEventListener('error', (error) => {
    console.error("Error loading or playing sound:", error);
  });
  sound.play().catch(error => {
    console.error("Error with play():", error);
  });
  sound.addEventListener('ended', () => {
    console.log("Sound finished playing.");
    sound.remove();
  });
}

// Generating random numbers table from 1 to 9 to be rendered in the screen instead of counter
for (i = 1; i <= 9; i++) {
  let rand_num = Math.floor(Math.random() * (9 - 1 + 1)) + 1;

  if (numbers.includes(rand_num)) {
    while (numbers.includes(rand_num) && i <= 9) {
      rand_num = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
    }
    numbers.push(rand_num);
  } else {
    numbers.push(rand_num);
  }
}


function fill_table(table) {
  let counter = 0;
  let position = {};
  let good = [0];

  document.querySelectorAll(".box h1").forEach((h1, index) => {
    if (table.includes(index + 1)) {
      position[index] = numbers[counter];
      h1.innerText = `${numbers[counter]}`;
      h1.parentElement.style.backgroundColor = "green";
      h1.parentElement.style.border = "2px solid white";
      h1.parentElement.addEventListener("click", () => {
        click(table, good, index, position, h1);
      });
      counter++;
    } else {
      h1.parentElement.style.border = "none";
      h1.innerText = ``;
      h1.backgroundColor = "black";
    }
  });

}

function begin_window() {
  let button = document.querySelector("#start");
  let parentwindow = document.querySelector("#start_window");
  let back_window = document.querySelector("#back_window");

  startTime = Date.now();

  if (button) {
    button.addEventListener("click", () => {
      parentwindow.style.display = "none";
      back_window.style.display = "none";
    });
  }
}

function click(table, good, index, position, h1) {
  good.push(position[index]);
  let max = good.length - 1;

  if (good[max] - good[max - 1] == 1) {
    if (good[max] == 1) {
      document.querySelectorAll(".box h1").forEach((h1, index) => {
        if (table.includes(index + 1)) {
          h1.innerText = `?`;
        } else {
          h1.parentElement.style.border = "none";
          h1.innerText = ``;
          h1.parentElement.style.backgroundColor = "black";
          h1.backgroundColor = "black";
        }
      });
    }
    h1.parentElement.style.border = "none";
    h1.innerText = ``;
    h1.parentElement.style.backgroundColor = "black";
    h1.backgroundColor = "black";
    h1.parentElement.style.pointerEvents = "none";
  } else {
    mistake(h1);
    good.pop();
  }

  if (good.includes(9)) {
    console.log("Win");
    win();
  }
}

function mistake(h1) {
  playSound(error);
  h1.parentElement.style.border = '2px solid red';
  h1.style.color = 'red';
  setTimeout(() => {
    h1.parentElement.style.border = '2px solid white';
    h1.style.color = 'white';
  }, 200);
  mistakes++;
  if (mistakes >= 2) {
    lost();
  }
}

function lost() {
  playSound(game_over_sound);
  let restart_button = document.getElementById("restart");
  let game_over_window = document.getElementById("gameOverWindow");
  let back_window = document.querySelector("#back_window");

  if (back_window && game_over_window) {
    back_window.style.display = "block";
    back_window.classList.remove("hidden");

    game_over_window.classList.remove("hidden");
    game_over_window.classList.add("block");
  }
  restart_button.addEventListener("click", () => {
    window.location.reload(true);
  })
}

function win() {
  playSound(win_sound);
  let win_window = document.getElementById("win");
  let play_again_button = document.getElementById("play_again");
  begin = false;
  let timer = document.getElementById("timer");
  const elapsed = Date.now() - startTime;
  const formattedElapsed = String(elapsed).padStart(2, '0');
  if (timer) {
    timer.innerText = `Completed in ${formattedElapsed}`;
  }
  if (win_window) {
    win_window.classList.remove("hidden");
    win_window.classList.add("block");
  }
  play_again_button.addEventListener("click", () => {
    window.location.reload(true);
  });

}

function random_number() {
  return Math.floor(Math.random() * (15 - 1 + 1)) + 1;
}

function random_table() {
  let table = [];
  for (i = 0; i < 9; i++) {
    let num = random_number();
    if (table.includes(num)) {
      while (table.includes(num) && i < 9) {
        num = random_number();
      }
      table.push(num);
    } else {
      table.push(num);
    }
  }
  return table;
}

document.addEventListener("DOMContentLoaded", () => {
  main_load();
});

function main_load() {
  let table = [];
  table = random_table();
  fill_table(table);
  begin_window();
}
