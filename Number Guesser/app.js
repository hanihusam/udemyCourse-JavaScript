/* GAME FUNCTION
- Player must guess a number between a min and max
- Player gets certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player to choose play again
*/

// Min and max
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessLeft = 3;

// UI elements
const UIgame = document.querySelector("#game"),
  UIminNum = document.querySelector(".min-num"),
  UImaxNum = document.querySelector(".max-num"),
  UIguessBtn = document.querySelector("#guess-btn"),
  UIguessInput = document.querySelector("#guess-input"),
  UImessage = document.querySelector(".message");

// Assign UI min and max
UIminNum.textContent = min;
UImaxNum.textContent = max;

// Play again event listener
UIgame.addEventListener("mousedown", function(e) {
  if (e.target.classList.contains("play-again")) {
    window.location.reload();
  }
});

// Listen the submit button
UIguessBtn.addEventListener("click", function() {
  let guess = parseInt(UIguessInput.value);
  // Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter the number between ${min} and ${max}`, "red");
  }
  // Win
  if (guess === winningNum) {
    gameOver(true, `${winningNum} is correct, YOU WIN!`);
  } else {
    // Lost
    guessLeft -= 1;
    // Guess left is still available
    if (guessLeft == 0) {
      gameOver(
        false,
        `Game over, you lost. The correct number was ${winningNum}`
      );
    } else {
      // Change border color
      UIguessInput.style.borderColor = "red";
      // Clear value
      UIguessInput.value = "";
      // Set message
      setMessage(`${guess} is not correct, ${guessLeft} guesses left`, "red");
    }
  }
});

// Set message
function setMessage(msg, color) {
  UImessage.textContent = msg;
  UImessage.style.color = color;
}

// Random winning number
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Game over
function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : (color = "red");
  // Disable input
  UIguessInput.disabled = true;
  // Change border color
  UIguessInput.style.borderColor = color;
  // Set text color
  UImessage.style.color = color;
  // Set message
  setMessage(msg);

  // Play again?
  UIguessBtn.value = "Play Again";
  UIguessBtn.className += " play-again";
}
