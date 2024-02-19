/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
    // Creates variable for missed letters and array of phrases
    constructor() {
        this.missed = 0;
        this.phrases = [
            new Phrase("Live Laugh Love"),
            new Phrase("You live and you learn"),
            new Phrase("You only live once"),
            new Phrase("Keep smiling"),
            new Phrase("You are epic")
        ];
        
        this.activePhrase = null;
    }

    // Gets a random phrase for each round
    getRandomPhrase() {
        return this.phrases[Math.floor(Math.random() * this.phrases.length)];
    }

    // Starts the game by changing the screen and calling the getRandomPhrase and addPhraseToDisplay functions
    startGame() {
        const screenOverlay = document.querySelector("#overlay");
        screenOverlay.style.display = "none";
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
    }

    // The logic of the game that differentiates between if the letter guessed is a part of the phrase or not
    handleInteraction(button) {
        button.disabled = true;
        const letter = button.textContent;
        if (this.activePhrase.checkLetter(letter)) {
            button.classList.add("chosen");
            this.activePhrase.showMatchedLetter(letter);
            if (this.checkForWin()) {
                this.gameOver(true);
            }
        } else {
            button.classList.add("wrong");
            this.removeLife();
        }
    }

    // When handleInteraction runs and a letter that isn't a part of the phrase is clicked, it makes the user lose a heart
    removeLife() {
        const hearts = document.querySelectorAll(".tries img");
        hearts[this.missed].src = "images/lostHeart.png";
        this.missed++;
        if (this.missed === 5) {
            this.gameOver(false);
        }
    }

    // Checks if player has revealed all the letters in the phrase
    checkForWin() {
        const hiddenLetters = document.querySelectorAll(".hide");
        return hiddenLetters.length === 0;
    }

    // Switches screen to start button and lets player know if they won or lost the round
    gameOver(win) {
        const screenOverlay = document.querySelector("#overlay");
        screenOverlay.style.display = "flex";
        const gameOverMessage = document.querySelector("#game-over-message");
        
        if (win) {
            gameOverMessage.textContent = "Congrats, you win!";
            screenOverlay.className = "win";
            
            // Code for the background color to change colors when the player wins. If the player loses, the background color stays red
            const colors = ["green", "yellow", "orange", "blue", "purple", "pink"];
            let colorIndex = 0;
            let colorInterval;
            const changeBackgroundColor = () => {
                document.getElementById("overlay").style.backgroundColor = colors[colorIndex];
                colorIndex++;
            };
            colorInterval = setInterval(changeBackgroundColor, 1000);
            const startGame = () => {
                clearInterval(colorInterval);
                document.querySelector("#btn__reset").removeEventListener("click", startGame);
            };
            document.querySelector("#btn__reset").addEventListener("click", startGame);
        
        } else {
            gameOverMessage.textContent = "Sorry you lose, try again!";
            screenOverlay.className = "lose";
            document.getElementById("overlay").style.backgroundColor = "red";
        }
        this.resetGame();
    }

    // Resets the game to be reformatted to the way it was when it first started
    resetGame() {
        const phraseUl = document.querySelector("#phrase ul");
        phraseUl.innerHTML = "";
        const keyboardButtons = document.querySelectorAll(".keyrow button");
        keyboardButtons.forEach(button => {
            button.disabled = false;
            button.classList.remove("chosen", "wrong");
        });
        const hearts = document.querySelectorAll(".tries img");
        hearts.forEach(heart => heart.src = "images/liveHeart.png");
        this.missed = 0;
    }
}