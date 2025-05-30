import './App.css'
import {useEffect, useState} from "react";

function App() {
// Welke functionaliteiten wil ik
    // Er is een lijn met liggende streepjes waar het woord moet komen
    // Je kan een letter intypen en submitten
    // De letter wordt gecheckt -> goed = toevoegen aan lijn || fout = toevoegen aan foute letters
    // De speler mag max 10x fout gokken. Het aantal gokken dat over is wordt getoond
    // Is het woord geraden, dan staat het volledige woord op de lijn en wordt getoond 'CORRECT!'


    const [word, setWord] = useState('hangman')
    const [typedLetter, setTypedLetter] = useState('');
    const [displayWord, setDisplayWord] = useState('');
    const [guessesLeft, setGuessesLeft] = useState(10);
    const [rightLetters, setRightLetters] = useState([])
    const [wrongLetters, setWrongLetters] = useState([])
    const [wordGuessed, setWordGuessed] = useState(false);

    // splits word op in chars ->
    // alle rightLetters worden ingevuld in plaats van lage streepjes ->
    // .join(' ') maakt er weer een string van.
    useEffect(() => {
        setDisplayWord(
            word.split('').map(
                char => rightLetters.includes(char) ? char + ' ' : '_ ').join(' ')
        )
    }, [rightLetters]);


    useEffect(() => {
        if (wordGuessed) {
            console.log('guessed')
        }
    }, [])


    // checkt of het woord geraden is
    useEffect(() => {
        console.log('word: ', word, ' || ', 'displayWord: ', displayWord)
        if (word === displayWord.replaceAll(' ', '')) {
            setWordGuessed(true);
        } else {
            setWordGuessed(false)
        }
    }, [displayWord])

    function handleChange(event) {
        setTypedLetter(event.target.value);
    }


    // check of de letter in het woord zit of niet
    function handleSubmit(event) {
        if (word.includes(typedLetter)) {
            setRightLetters([
                ...rightLetters,
                typedLetter
            ])
        }

        if (!word.includes(typedLetter)) {
            setWrongLetters([
                ...wrongLetters,
                typedLetter
            ])
            setGuessesLeft(guessesLeft - 1)
        }
        // maakt de value van de input weer leeg
        setTypedLetter('');
    }

    return (
        <>
            <section className='outer-box'>
                <div className='inner-box'>
                    <h1>HANGMAN</h1>
                    <p>Display Word: {displayWord}</p>
                    <p>Wrong letters: {wrongLetters}</p>
                    <p>Right letters: {rightLetters}</p>
                    <p>Guesses left: {guessesLeft}</p>
                    <p>Typed letter: {typedLetter}</p>
                    <input
                        type='text'
                        onChange={handleChange}
                        value={typedLetter}
                        maxLength={1}
                    />
                    <button
                        onClick={handleSubmit}
                        disabled={wordGuessed}
                    >
                        Guess
                    </button>
                    <p>{wordGuessed ? 'CORRECT!' : 'keep guessing'}</p>
                </div>
            </section>
        </>
    )
}

export default App
