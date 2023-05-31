import { config } from 'dotenv'
config()
import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import Deck from './models/Deck'

const PORT = 4000

const app = express()

app.use(cors())
app.use(express.json())

app.post('/decks', async (req: Request, res: Response) => {
  const newDeck = new Deck({ title: req.body.title })
  await newDeck.save()
  res.json(newDeck)
})

app.get('/decks', async (req: Request, res: Response) => {
  const decks = await Deck.find()

  res.json(decks)
})

mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`Connected to ${PORT}!`)

  app.listen(PORT)
})
