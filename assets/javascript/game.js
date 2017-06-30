var wordCurrent;
var allowedGuesses;
var correctGuesses;
var wrongGuesses;
var wordOptions;

var hangmanWord = document.getElementById('hangman-word');
console.log('hangmanWord', hangmanWord);
var livesLeft = document.getElementById('lives-left');
var lettersGuessed = document.getElementById('letters-guessed');

function setup() {
  wordOptions = ['cat', 'dog', 'horse', 'cow', 'sheep', 'pig'];
  allowedGuesses = 13;
  wrongGuesses = [];
  correctGuesses = [];

wordCurrent = wordOptions[Math.floor(Math.random() * wordOptions.length)];

// console.log(wordCurrent);

  // initialize correctGuesses array with underscores
  for (var i = 0; i < wordCurrent.length; i++) {
    correctGuesses.push('_');
  }
  console.log('hangmanWord', hangmanWord);
  hangmanWord.innerHTML = correctGuesses.join(' ');
  livesLeft.innerHTML = allowedGuesses;
}


function updateGuesses(letter) {
  allowedGuesses--; // decrement guesses left
  livesLeft.innerHTML = allowedGuesses;

  if (wordCurrent.indexOf(letter) === -1) { // letter is NOT in the word
    wrongGuesses.push(letter); // update letters guessed
    lettersGuessed.innerHTML = wrongGuesses.join(', ');
    // console.log(wrongGuesses);
  } else { // letter IS in the word
    // replace underscore with the letter
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

setup();