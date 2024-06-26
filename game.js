const buttonColour = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let start = false;
let gameLevel = 1;
let userClickedPattern = [];

$(document).on('touchstart', function() {
  detectTap = true; // Detects all touch events
});
$(document).on('touchmove', function() {
  detectTap = false; // Excludes the scroll events from touch events
});
$(document).on('click touchend', function(event) {
  if (event.type == "click") detectTap = true; // Detects click events
     if (detectTap){
      $(document).keydown(function() {
        if (!start) {
          start = true;
          headerOutput()
          nextSequence();
          clickColor();
        }
      });
      
     }
});

$(document).keydown(function() {
  if (!start) {
    start = true;
    headerOutput()
    nextSequence();
    clickColor();
  }
});


function clickColor() {
  $("#red").on("click", randomChosenColour);
  $("#blue").on("click", randomChosenColour);
  $("#green").on("click", randomChosenColour);
  $("#yellow").on("click", randomChosenColour);
  }

function unclickColor () {
  $("#red").off("click", randomChosenColour);
  $("#blue").off("click", randomChosenColour);
  $("#green").off("click", randomChosenColour);
  $("#yellow").off("click", randomChosenColour);
}

  // Function to update the header of the game
function headerOutput () {
    $("h1").text("Level " + gameLevel);
  }

// Function to generate next sequence color
function nextSequence () {
  let randomNumbers = Math.floor(Math.random() * 4);
  let randomColour = buttonColour[randomNumbers];
  gamePattern.push(randomColour);
  playSound(randomColour); 
  fadeEffect($("#" + randomColour));
  userClickedPattern = [] //reset user pattern for new sequence 
}


// Function to handle button click and user input
function randomChosenColour() {
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
  }

  else if (gamePattern.length === userClickedPattern.length) {
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


// function playSound(name) {

//   switch (name) {
//     case "blue":
//       let blueSound = new Audio("./sounds/blue.mp3");
//       blueSound.play();
//     break;

//     case "green":
//       let greenSound = new Audio("./sounds/green.mp3");
//       greenSound.play();
//     break;

//     case "red":
//       let redSound = new Audio("./sounds/red.mp3");
//       redSound.play();
//     break;

//     case "yellow":
//       let yellowSound = new Audio("./sounds/yellow.mp3");
//       yellowSound.play();
//     break;

//     default:
//       let wrongSound = new Audio("./sounds/wrong.mp3");
//       wrongSound.play();
//     break;


//   }

// }




