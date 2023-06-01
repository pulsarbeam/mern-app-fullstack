import { useEffect, useState } from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import { deleteDeck } from './api/deleteDeck'
import { getDecks } from './api/getDecks'
import { TDeck } from './api/getDecks'
import { createDecks } from './api/createDecks'

function App() {
  const [decks, setDecks] = useState<TDeck[]>([])
  const [title, setTitle] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!title) return setError('Please Enter a Title')

    const deck = await createDecks(title)

    setDecks([...decks, deck])
    setTitle('')
    setError('')
  }

  async function handleDelete(deckId: string) {
    await deleteDeck(deckId)
    setDecks(decks.filter((deck) => deck._id !== deckId))
  }

  useEffect(() => {
    async function fetchDecks() {
      const newDecks = await getDecks()
      setDecks(newDecks)
    }
    fetchDecks()
  }, [])

  return (
    <div className="App">
      <div>
        <ul className="decks">
          {decks.map((deck) => (
            <div key={deck._id}>
              <li>
                <button onClick={() => handleDelete(deck._id)}>X</button>

                <Link to={`/deck/${deck._id}`}>{deck.title}</Link>
              </li>
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
      {error && <h4>{error}</h4>}
    </div>
  )
}

export default App
