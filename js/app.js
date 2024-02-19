/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

// Initializing variables for starting new game and button
const game = new Game();
buttons = document.querySelectorAll(".key");

// When the Start Game button is clicked, a new game will start
document.getElementById("btn__reset").addEventListener("click", () => {
    game.startGame();
});

// Code for every letter button to be clicked and calls handleInteraction 
// to check if letter guessed is in the phrase or not
buttons.forEach(button => {
    button.addEventListener("click", (event) => {
        game.handleInteraction(event.target);
    });
});

// Code for clicking the keys on a keyboard to make a guess of a letter 
// rather than clicking the button with the mouse on the screen
document.addEventListener("keydown", (e) => {
    const keyClicked = e.key.toLowerCase();
    const lettersRegex = /^[a-z]$/;
    if (lettersRegex.test(keyClicked)) {
        buttons.forEach(button => {
            if (button.textContent === keyClicked) {
                game.handleInteraction(button);
            }
        });
    }
});