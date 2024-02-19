/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

// This is the Phrase class
class Phrase {
    //Sets phrases to all lowercase
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }

    // Adds letter placeholders to the display when game starts
    addPhraseToDisplay() {
        const phraseUl = document.querySelector('#phrase ul');
        const letters = this.phrase.split('');
        letters.forEach(letter => {
            const li = document.createElement('li');
            if (letter === ' ') {
                li.className = 'space';
            } else {
                li.className = `hide letter ${letter}`;
                li.textContent = letter;
            }
            phraseUl.appendChild(li);
        });
    }

    // Checks if letter selected by player matches the phrase's letter
    checkLetter(letter) {
        return this.phrase.includes(letter);
    }

    // Shows the letters on the board that match a player's selection
    showMatchedLetter(letter) {
        const matchingLetters = document.querySelectorAll(`.${letter}`);
        matchingLetters.forEach(matchedLetter => {
            matchedLetter.classList.remove("hide");
            matchedLetter.classList.add("show");
        });
    }
}