/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

const game = new Game();
buttons = document.querySelectorAll(".key");

document.getElementById("btn__reset").addEventListener("click", () => {
    game.startGame();
});

buttons.forEach(button => {
    button.addEventListener("click", (event) => {
        game.handleInteraction(event.target);
    });
});

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