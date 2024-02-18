/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }

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

    checkLetter(letter) {
        return this.phrase.includes(letter);
    }

    showMatchedLetter(letter) {
        const matchingLetters = document.querySelectorAll(`.${letter}`);
        matchingLetters.forEach(matchedLetter => {
            matchedLetter.classList.remove("hide");
            matchedLetter.classList.add("show");
        });
    }
}