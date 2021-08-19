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

const word = "magnolia";

const guessedLetters = [];


// Display circles as placeholders for the chosen word's letters
const placeholder = function (word) {
  const placeholderLetters = [];
  for (const letter of word) {
    console.log(letter);
    placeholderLetters.push("●");
  }
  wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

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

// did the player win?
const checkIfWin = function (){
	if (word.toUpperCase() === wordInProgress.innerText) {
		message.classList.add ("win");
		message.innerHTML = `<p class="highlight">You guessed the correct word!</p>`;

	}
};