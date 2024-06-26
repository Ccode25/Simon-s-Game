const buttonColour = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let start = false;
let gameLevel = 1;
let userClickedPattern = [];
let detectTap = false;

// Event listeners for touch events
$(document).on('touchstart', function() {
  detectTap = true; // Set detectTap on touchstart
});
$(document).on('touchmove', function() {
  detectTap = false; // Reset detectTap on touchmove (to avoid scrolling issues)
});
$(document).on('touchend', function(event) {
  if (detectTap) {
    event.preventDefault(); // Prevent simulated mouse events
    startGame();
  }
});

// Event listener for keyboard input (keydown)
$(document).on('keydown', function(event) {
  if (!start) {
    startGame();
  }
});

function startGame() {
  if (!start) {
    start = true;
    headerOutput();
    nextSequence();
    clickColor();
  }
}

function clickColor() {
  $("#red").on("click touchend", handleUserClick);
  $("#blue").on("click touchend", handleUserClick);
  $("#green").on("click touchend", handleUserClick);
  $("#yellow").on("click touchend", handleUserClick);
}

function unclickColor() {
  $("#red").off("click touchend", handleUserClick);
  $("#blue").off("click touchend", handleUserClick);
  $("#green").off("click touchend", handleUserClick);
  $("#yellow").off("click touchend", handleUserClick);
}

// Function to update the header of the game
function headerOutput() {
  $("h1").text("Level " + gameLevel);
}

// Function to generate next sequence color
function nextSequence() {
  let randomNumbers = Math.floor(Math.random() * 4);
  let randomColour = buttonColour[randomNumbers];
  gamePattern.push(randomColour);
  playSound(randomColour);
  fadeEffect($("#" + randomColour));
  userClickedPattern = []; //reset user pattern for new sequence 
}

// Function to handle button click and user input
function handleUserClick(event) {
  if (event.type === "touchend") {
    event.preventDefault(); // Prevent simulated mouse events on touch devices
    detectTap = false; // Reset detectTap
  }

  let button = $(this);
  let userChosenColour = button.attr("id");
  userClickedPattern.push(userChosenColour);
  fadeEffect(button);
  playSound(userChosenColour);

  if (!checkClickPattern()) {
    $("h1").text("Game Over, Press any key to Start Again");
    playSound("wrong");
    unclickColor();
    startOver();
  } else if (gamePattern.length === userClickedPattern.length) {
    setTimeout(function() {
      gameLevel++;
      headerOutput();
      nextSequence();
    }, 1000);
  }
}

// Function to check game pattern and user pattern
function checkClickPattern() {
  for (let i = 0; i < userClickedPattern.length; i++) {
    if (gamePattern[i] !== userClickedPattern[i]) {
      return false;
    }
  }
  return true;
}

function fadeEffect(button) {
  button.animate({ opacity: 0 }, 20).animate({ opacity: 1 }, 100);
}

function playSound(name) {
  let sound = new Audio("./sounds/" + name + ".mp3");
  sound.play();
}

function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  gameLevel = 1;
  start = false;
}