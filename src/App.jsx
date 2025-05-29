import './App.css'
import {useEffect, useState} from "react";

function App() {
    // maak state met een gegeven letter
    // maak input om een letter in te typen
    // als state en input letter gelijk zijn, toon melding 'correct'
    const [word, setWord] = useState('a')
    const [typedLetter, setTypedLetter] = useState('');
    const [wordGuessed, setWordGuessed] = useState('incorrect');

    useEffect(()=> {
        if (word === typedLetter) {
            setWordGuessed('correct');
        }
    },[typedLetter])

    function handleChange(event) {
        setTypedLetter(event.target.value);
    }

  return (
    <>
        <section className='outer-box'>
            <div className='inner-box'>
                <h1>GALGJE</h1>
                <p>{word}</p>
                <p>{typedLetter}</p>
                <input
                    type='text'
                    onChange={handleChange}
                    value={typedLetter}
                />
                <p>{wordGuessed}</p>
            </div>
        </section>
    </>
  )
}

export default App
