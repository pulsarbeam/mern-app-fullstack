import { config } from 'dotenv'
config()
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import { getDecksController } from './controllers/getDeckController'
import { createDecksConroller } from './controllers/createDeckContoller'
import { deleteDeckController } from './controllers/deleteDeckController'
import { createCardForDeckController } from './controllers/createCardForDeckController'

const PORT = 4000

const app = express()

app.use(cors())
app.use(express.json())

app.post('/decks', createDecksConroller)

app.get('/decks', getDecksController)

app.delete('/decks/:deckId', deleteDeckController)

app.post('/decks/:deckId/cards', createCardForDeckController)

mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`Connected to ${PORT}!`)

  app.listen(PORT)
})
