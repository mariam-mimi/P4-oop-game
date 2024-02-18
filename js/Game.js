/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
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

    getRandomPhrase() {
        return this.phrases[Math.floor(Math.random() * this.phrases.length)];
    }

    startGame() {
        const screenOverlay = document.querySelector("#overlay");
        screenOverlay.style.display = "none";
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
    }

    removeLife() {
        const hearts = document.querySelectorAll(".tries img");
        hearts[this.missed].src = "images/lostHeart.png";
        this.missed++;
        if (this.missed === 5) {
            this.gameOver(false);
        }
    }

    checkForWin() {
        const hiddenLetters = document.querySelectorAll(".hide");
        return hiddenLetters.length === 0;
    }

    gameOver(win) {
        const screenOverlay = document.querySelector("#overlay");
        screenOverlay.style.display = "flex";
        const gameOverMessage = document.querySelector("#game-over-message");
        if (win) {
            gameOverMessage.textContent = "Congrats, you win!";
            screenOverlay.className = "win";
        } else {
            gameOverMessage.textContent = "Sorry you lose, try again!";
            screenOverlay.className = "lose";
        }
        this.resetGame();
    }

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