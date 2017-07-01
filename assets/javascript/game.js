var wordCurrent;
var allowedGuesses;
var correctGuesses;
var wrongGuesses;
var wordOptions;

var hangmanWord = document.getElementById('hangman-word');
var livesLeft = document.getElementById('lives-left');
var lettersGuessed = document.getElementById('letters-guessed');

function setup() {
  wordOptions = ['cat', 'dog', 'horse', 'cow', 'sheep', 'pig', 'goat', 'chicken', 'bull', ];
  allowedGuesses = 13;
  wrongGuesses = [];
  correctGuesses = [];

wordCurrent = wordOptions[Math.floor(Math.random() * wordOptions.length)];

  for (var i = 0; i < wordCurrent.length; i++) {
    correctGuesses.push('_');
  }
  hangmanWord.innerHTML = correctGuesses.join(' ');
  livesLeft.innerHTML = allowedGuesses;
}


function updateGuesses(letter) {
  allowedGuesses--; 
  livesLeft.innerHTML = allowedGuesses;

  if (wordCurrent.indexOf(letter) === -1) {
    wrongGuesses.push(letter);
    lettersGuessed.innerHTML = wrongGuesses.join(', ');
    
  } else { 
    for (var i = 0; i < wordCurrent.length; i++) {
      if (wordCurrent[i] === letter) {
        correctGuesses[i] = letter;
      }
    }

    hangmanWord.innerHTML = correctGuesses.join(' ');
  }
}

function checkWin() {
  if (correctGuesses.indexOf('_') === -1) {
    alert('You Won!');
  } else if (allowedGuesses === 0) {
    alert('You Lost!');
  }
}

document.onkeyup = function (event) {
  var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
  updateGuesses(letterGuessed);
  checkWin();
};