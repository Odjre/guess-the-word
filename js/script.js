// unordered list where the player’s guessed letters will appear
const guessedLettersList = document.querySelector(".guessed-letters");
// button with the text “Guess!” 
const guessButton = document.querySelector(".guess");
// text input where the player will guess a letter
const letterInput = document.querySelector(".letter");
// empty paragraph where the word in progress will appear
const wordInProgress = document.querySelector(".word-in-progress");
// paragraph where the remaining guesses will display
const remainingGuessesP = document.querySelector(".remaining");
// span inside the paragraph where the remaining guesses will display
const remainingGuessesSpan = document.querySelector(".remaining span");
// empty paragraph where messages will appear when the player guesses a letter
const message = document.querySelector(".message");
// hidden button that will appear prompting the player to play again
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;


const getWord = async function () {
	const response = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
	const words = await response.text();
	const wordArray = words.split("\n");
	const randomIndex = Math.floor (Math.random() * wordArray.length);
	word = wordArray[randomIndex].trim();
	placeholder(word);
};

getWord();



// Display circles as placeholders for the chosen word's letters
const placeholder = function (word) {
  const placeholderLetters = [];
  for (const letter of word) {
    console.log(letter);
    placeholderLetters.push("●");
  }
  wordInProgress.innerText = placeholderLetters.join("");
};


// Guess Button 
guessButton.addEventListener("click", function (e) {
	e.preventDefault();
	message.innerText = "";
	const guess = letterInput.value;
	const goodGuess = validate (guess);
	if (goodGuess) {
		makeGuess(guess);
	}
	letterInput.value = "";
});


 // Validate player's input
const validate = function (input) {
	const acceptedLetter = /[a-zA-Z]/;
	if (input.length === 0) {
		message.innerText = "Guess a letter.";
	} else if (input.length > 1) {
		message.innerText = "Guess one letter.";
	} else if (!input.match(acceptedLetter)) {
		message.innerText = "Guess a letter A-Z.";
	} else {
		return input;
	}
};

const makeGuess = function (guess) {
	guess = guess.toUpperCase();
	if (guessedLetters.includes(guess)) {
		message.innerText = "You already guessed that letter, Silly.  Try again.";
	} else {
		guessedLetters.push(guess);
		console.log (guessedLetters);
		countRemainingGuesses(guess);
		showGuessedLetters();
		updateWordInProgress(guessedLetters);
	}
};

// show guessed letters
const showGuessedLetters = function (){
	guessedLettersList.innerHTML = "";
	for (const letter of guessedLetters) {
		const guessedLetter = document.createElement("li");
		guessedLetter.innerText = letter;
		guessedLettersList.append(guessedLetter);
	}
};


// update word in progress
const updateWordInProgress = function (guessedLetters) {
	const wordUpper = word.toUpperCase();
	const wordArray = wordUpper.split("");
	const revealWord = [];
	for (const letter of wordArray) {
		if (guessedLetters.includes(letter)) {
			revealWord.push(letter.toUpperCase());
		} else {
			revealWord.push("●");
		}
	}
	wordInProgress.innerText = revealWord.join("");
	checkIfWin();
};

// tally remaining guesses
const countRemainingGuesses = function (guess) {
	const upperWord = word.toUpperCase();
	if (!upperWord.includes(guess)){
		remainingGuesses -= 1;
		message.innerText="Nope! Try again.";
	} else {
		message.innerText = "You got it!";
	}

	if (remainingGuesses === 0) {
		message.innerHTML= `Sorry, you lose! The word was <span class="highlight">${word}</span>.`;
		startOver();
	} else if (remainingGuesses === 1) {
		remainingGuessesSpan.innerText = "1 guess"; 
	} else {
		remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
	}
};

// did the player win?
const checkIfWin = function (){
	if (word.toUpperCase() === wordInProgress.innerText) {
		message.classList.add ("win");
		message.innerHTML = `<p class="highlight">You guessed the correct word!</p>`;
		startOver();
	}
};

const startOver = function () {
	guessButton.classList.add ("hide");
	remainingGuessesP.classList.add ("hide");
	guessedLettersList.classList.add("hide");
	playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function (){
	message.classList.remove("win");
	message.innerText= "";
	guessedLettersList.innerHTML="";
	remainingGuesses= 8;
	guessedLetters = [];
	remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;

	getWord();
	
	playAgainButton.classList.add("hide");
	guessButton.classList.remove("hide");
	remainingGuessesP.classList.remove("hide");
	guessedLettersList.classList.remove("hide");
});