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
	const letter = letterInput.value;
	console.log(letter);
	letterInput.value = "";
});

