import { useEffect, useState } from 'react'
import './App.css'

type TDeck = {
  title: string
  _id: string
}

function App() {
  const [decks, setDecks] = useState<TDeck[]>([])
  const [title, setTitle] = useState('')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setTitle('')
    fetch('http://localhost:4000/decks', {
      method: 'POST',
      body: JSON.stringify({ title }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  useEffect(() => {
    fetch('http://localhost:4000/decks')
      .then((res) => res.json())
      .then((data) => {
        setDecks(data)
      })
  }, [title])

  return (
    <div className="App">
      <div>
        <ul className="decks">
          {decks.map((deck) => (
            <div key={deck._id}>
              <li>{deck.title}</li>
            </div>
          ))}
        </ul>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="deckInput">Name your Deck:</label>
        <input
          type="text"
          id="deckInput"
          name="deckInput"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value)
          }}
        />
        <button type="submit" value="Submit">
          Create Deck
        </button>
      </form>
    </div>
  )
}

export default App
