//Global Variables


//Arrays and Variables for holding data
var wordOptions = ['zombie', 'blood curdling', 'cemetary', 'corpse', 'dead', 'disembowel', 'goosebumps', 'graveyard'];
var wordGuessingNow = '';
var lettersInWord = [];
var lettersInWordWithSpace = [];
var amountOfLettersInWord = 0;
var correctGuesses = [];
var wrongGuesses = [];
// var alphabet = "abcdefghijklmnopqrstuvwxyz";



//Game Counters
var winCount = 0;
var lossCount = 0;
var guessesLeft = 13;


//Functions
function startGame () {
	wordGuessingNow = wordOptions[Math.floor(Math.random() * wordOptions.length)];
	// console.log("Word used right now", wordGuessingNow);
	//****How do I store these wordGuessingNow and not chose it again upon playing?
	lettersInWord = wordGuessingNow.split('');
	amountOfLettersInWord = lettersInWord.length;
	for (var i = 0; i < amountOfLettersInWord; i++) {
		if(wordGuessingNow[i] == " ") {
			lettersInWord[i] = "&nbsp";
		};
	};

	//Reset
	guessesLeft = 13;
	wrongGuesses = [];
	correctGuesses = [];

	//Populate correctGuesses with right number of blanks and adds spaces automatically
	for (var i = 0; i < amountOfLettersInWord; i++) {
		if(wordGuessingNow[i] == " ") {
			correctGuesses.push("&nbsp");
		} else {
		correctGuesses.push('_');
		};
	}

	//Change HTML to reflect round conditions
	document.getElementById('wordToGuess').innerHTML = correctGuesses.join(' ');
 	document.getElementById('guessesLeft').innerHTML = guessesLeft;
 	document.getElementById('winCounter').innerHTML = winCount;
 	document.getElementById('lossCounter').innerHTML = lossCount;
 	document.getElementById('wrongGuesses').innerHTML = wrongGuesses;
};

function checkLetterInWord(letter) {
	//Check if letter exists in current hangman word

	var isLetterInWord = false;

	for (var i = 0; i < amountOfLettersInWord; i++) {
		if(wordGuessingNow[i] == letter) {
			isLetterInWord = true;
		};
	};

 	//Check where in word letter exists, then populate correctGuesses array
	if(isLetterInWord) {
		for (var i = 0; i < amountOfLettersInWord; i++) {
			if(wordGuessingNow[i] == letter) {
				correctGuesses[i] = letter;
			}
		};
	}

	//Letter wasn't found
	else {
		wrongGuesses.push(letter);
		guessesLeft --;
	};
};	

function roundComplete() {

	//Update the HTML to reflect the most recent count stats
	document.getElementById('guessesLeft').innerHTML = guessesLeft;
	document.getElementById('wordToGuess').innerHTML = correctGuesses.join(' ');
	document.getElementById('wrongGuesses').innerHTML = wrongGuesses.join(' ');

	//Check if user won
	if(lettersInWord.toString() == correctGuesses.toString()) {
		winCount ++;
		alert('You won!');

		//Update the win counter in the HTML
		document.getElementById('winCounter').innerHTML = winCount;
		startGame();
	} 

	//Check if the user lost
	else if (guessesLeft == 0) {
		lossCount ++;
		alert('You lost!');

		//Update the HTML
		document.getElementById('lossCounter').innerHTML = lossCount;

		startGame();
	}
}

//Main processes
startGame();

document.onkeypress = function(event) {
	if (event.keyCode >= 97 && event.keyCode <= 122) {

		var letterGuessed = String.fromCharCode(event.keyCode);
		checkLetterInWord(letterGuessed);
		roundComplete();

	} else {
		alert('Please use a letter from the alphapet');
	}
};