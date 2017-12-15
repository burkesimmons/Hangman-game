//Global Variables


//Arrays and Variables for holding data
var wordOptions = ['zom bie', 'blood curdling', 'ceme tary', 'cor pse', 'de ad', 'disem bowel', 'goose bumps', 'grave yard'];
//******How do I place a space for 2 words and not need to guess the space? 
var wordGuessingNow = '';
var lettersInWord = [];
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
	console.log('Letters in word: ', lettersInWord);
	amountOfLettersInWord = lettersInWord.length;
	// console.log('# of letters: ', amountOfLettersInWord);

	// alphabetLetters = alphabet.split('');
// console.log(alphabetLetters);
	//Reset
	guessesLeft = 13;
	wrongGuesses = [];
	correctGuesses = [];

	//Populate correctGuesses with right number of blanks
	for (var i = 0; i < amountOfLettersInWord; i++) {
		if(wordGuessingNow[i] == " ") {
			correctGuesses.push("&nbsp");
			console.log('Correct Guesses Array', correctGuesses);
		} else {
		correctGuesses.push('_');
		// console.log(correctGuesses);
		};
		//****How does the space in a word get joined as a space and not _
	}

	//Change HTML to reflect round conditions
	document.getElementById('wordToGuess').innerHTML = correctGuesses.join(' ');
 	document.getElementById('guessesLeft').innerHTML = guessesLeft;
 	document.getElementById('winCounter').innerHTML = winCount;
 	document.getElementById('lossCounter').innerHTML = lossCount;
 	document.getElementById('wrongGuesses').innerHTML = wrongGuesses;

	console.log("Word used right now: ", wordGuessingNow);
	// console.log("Letter in word: ", lettersInWord);
	// console.log("Amount of letters in word: ", amountOfLettersInWord);
	// console.log("Correct guesses: ", correctGuesses);

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
				console.log('Correct Guesses: ', correctGuesses);
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
	// console.log('Win Count: ' + winCount + ' | Loss Count: ' + lossCount + ' | Guesses Left' + guessesLeft);

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
		// console.log(event.keyCode);

		var letterGuessed = String.fromCharCode(event.keyCode);
		// console.log(letterGuessed);
		checkLetterInWord(letterGuessed);
		roundComplete();

	} else {
		alert('Please use a letter from the alphapet');
		// console.log(event.keyCode);
	}

	// console.log(letterGuessed);
};