const readline = require('readline');

const hangmanDrawing = `
  +---+
  |   |
  O   |
 /|\\  |
 / \\  |
      |
=========
`;

const word = 'aap';
const rightLetters = [];
const wrongLetters = [];
let guessesLeft = 10;

// Deze code zorgt ervoor dat er straks user input gegeven kan worden.
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// maakt lage streepjes van de letters die nog niet geraden zijn. Update ook de letters die wel goed geraden zijn
function adjustDisplayWord() {
    return [...word].map(char =>
        rightLetters.includes(char) ? char + ' ' : '_ '
    ).join('').trim();
}

function spaceLetters(letters) {
    let spaced = ''
    for (const char of letters) {
        spaced = spaced + char + ' ';
    }
    return spaced
}

let displayWord = adjustDisplayWord();

console.log('Welcome to Hangman!');

// Functie met de logica van de game
function handleTurn() {
    console.log(displayWord);

    console.log('Right letters: ', spaceLetters(rightLetters))
    console.log('Wrong letters: ', spaceLetters(wrongLetters))
    console.log('Guesses left: ', guessesLeft)

    if (guessesLeft === 0) {
        console.log(hangmanDrawing)
        console.log('GAME OVER')
        return;
    }

    rl.question('Please enter a letter: ', (letter) => {
        if (word.includes(letter)) {
            rightLetters.push(letter);
            displayWord = adjustDisplayWord();
            console.log('That is right!');
        } else {
            wrongLetters.push(letter);
            guessesLeft = guessesLeft - 1
            console.log('Wrong guess!')
        }


        if (displayWord.split(' ').join('') === word) {
            console.log('CORRECT!');
            rl.close();
            // Als het woord geraden is verlaten we deze functie met 'return'. De handleTurn() aan het einde van deze functie wordt dus niet meer aangeroepen.
            return;
        }

        // Zolang het woord nog niet geraden is voeren we op deze manier de functie nog een keer uit.
        handleTurn();
    });
}

// Start the game
handleTurn();