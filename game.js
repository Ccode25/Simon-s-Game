const buttonColour = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let start = false;
let gameLevel = 1;
let userClickedPattern = [];
let detectTap = false;

// Detect tap and click events to start the game
$(document).on('touchstart click', function(event) {
  if (event.type === "touchstart") {
    detectTap = true;
  }
  if (event.type === "click" || (event.type === "touchend" && detectTap)) {
    startGame();
  }
});

$(document).keydown(function() {
  startGame();
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
  $("#red").on("click touchend", randomChosenColour);
  $("#blue").on("click touchend", randomChosenColour);
  $("#green").on("click touchend", randomChosenColour);
  $("#yellow").on("click touchend", randomChosenColour);
}

function unclickColor() {
  $("#red").off("click touchend", randomChosenColour);
  $("#blue").off("click touchend", randomChosenColour);
  $("#green").off("click touchend", randomChosenColour);
  $("#yellow").off("click touchend", randomChosenColour);
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
function randomChosenColour(event) {
  if (event.type === "touchend") {
    event.preventDefault(); // Prevent simulated mouse events on touch devices
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
