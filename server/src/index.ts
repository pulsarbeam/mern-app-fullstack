import express, { Request, Response } from 'express'
import mongoose from 'mongoose'

import Deck from './models/Deck'

const PORT = 4000

const app = express()

app.use(express.json())

app.post('/decks', async (req: Request, res: Response) => {
  const newDeck = new Deck({ title: req.body.title })
  await newDeck.save()
  res.json(newDeck)
})

mongoose
  .connect(
    'mongodb+srv://renegrooth:w55m5KISBxpObH09@cluster0.h3gdar7.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log(`Connected to ${PORT}!`)

    app.listen(PORT)
  })
