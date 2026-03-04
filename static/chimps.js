let mistakes = 0;
let begin = false;
let startTime;
let numbers = [];
const win_sound = "/static/sound_files/win_sound.mp3";
const game_over_sound = "/static/sound_files/game_over.mp3";
const error_sound = "/static/sound_files/error.mp3";

window.onunhandledrejection = function (event) {
  console.log(`Reason: ${event.reason}`,
    `Return value: ${event.returnValue}`
  );
};

function playSound(path) {
  console.log("Playing sound: ", path);
  const sound = new Audio(path);
  sound.play().catch(error => {
    console.error("Error with play():", error);
  });
  sound.addEventListener('ended', () => {
    sound.remove();
  });
}

function generateNumbers() {
  const nums = [];
  for (let i = 1; i <= 9; i++) {
    nums.push(i);
  }
  // Fisher-Yates shuffle
  for (let i = nums.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }
  return nums;
}

function fill_table(table) {
  let counter = 0;
  const position = {};
  const good = [0];

  document.querySelectorAll(".box h1").forEach((h1, index) => {
    const box = h1.parentElement;
    if (table.includes(index + 1)) {
      position[index] = numbers[counter];
      h1.innerText = `${numbers[counter]}`;
      box.style.backgroundColor = "green";
      box.style.border = "2px solid white";
      
      // Remove old event listeners if any (by replacing the node or just being careful)
      const newBox = box.cloneNode(true);
      box.parentNode.replaceChild(newBox, box);
      
      newBox.addEventListener("click", () => {
        click(table, good, index, position, newBox.querySelector("h1"));
      });
      counter++;
    } else {
      box.style.border = "none";
      h1.innerText = ``;
      box.style.backgroundColor = "black";
    }
  });
}

function begin_window() {
  const button = document.querySelector("#start");
  const parentwindow = document.querySelector("#start_window");
  const back_window = document.querySelector("#back_window");

  if (button) {
    button.addEventListener("click", () => {
      parentwindow.style.display = "none";
      back_window.style.display = "none";
      startTime = Date.now(); // Start timer here
      begin = true;
    });
  }
}

function click(table, good, index, position, h1) {
  if (!begin) return;
  
  const val = position[index];
  if (val === good[good.length - 1] + 1) {
    good.push(val);
    
    if (val === 1) {
      document.querySelectorAll(".box").forEach((box, idx) => {
        const boxH1 = box.querySelector("h1");
        if (table.includes(idx + 1)) {
          boxH1.innerText = `?`;
        }
      });
    }
    
    const box = h1.parentElement;
    box.style.border = "none";
    h1.innerText = ``;
    box.style.backgroundColor = "black";
    box.style.pointerEvents = "none";

    if (val === 9) {
      console.log("Win");
      win();
    }
  } else {
    mistake(h1);
  }
}

function mistake(h1) {
  playSound(error_sound);
  const box = h1.parentElement;
  const originalBorder = box.style.border;
  const originalColor = h1.style.color;
  
  box.style.border = '2px solid red';
  h1.style.color = 'red';
  
  setTimeout(() => {
    box.style.border = originalBorder;
    h1.style.color = originalColor;
  }, 200);
  
  mistakes++;
  if (mistakes >= 2) {
    lost();
  }
}

function lost() {
  begin = false;
  playSound(game_over_sound);
  const restart_button = document.getElementById("restart");
  const game_over_window = document.getElementById("gameOverWindow");
  const back_window = document.querySelector("#back_window");

  if (back_window && game_over_window) {
    back_window.style.display = "block";
    back_window.classList.remove("hidden");
    game_over_window.classList.remove("hidden");
    game_over_window.classList.add("block");
  }
  
  restart_button.onclick = () => {
    window.location.reload();
  };
}

function win() {
  begin = false;
  playSound(win_sound);
  const win_window = document.getElementById("win");
  const play_again_button = document.getElementById("play_again");
  const timerDisplay = document.getElementById("timer");
  
  const elapsed = (Date.now() - startTime) / 1000;
  if (timerDisplay) {
    timerDisplay.innerText = `Completed in ${elapsed.toFixed(2)}s`;
  }
  
  if (win_window) {
    win_window.classList.remove("hidden");
    win_window.classList.add("block");
  }
  
  play_again_button.onclick = () => {
    window.location.reload();
  };
}

function random_indices() {
  const indices = [];
  while (indices.length < 9) {
    const num = Math.floor(Math.random() * 15) + 1;
    if (!indices.includes(num)) {
      indices.push(num);
    }
  }
  return indices;
}

function main_load() {
  numbers = generateNumbers();
  const table = random_indices();
  fill_table(table);
  begin_window();
}

document.addEventListener("DOMContentLoaded", () => {
  main_load();
});
