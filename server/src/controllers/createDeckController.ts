import Deck from '../models/Deck'
import { Request, Response } from 'express'

export async function createDeckController(req: Request, res: Response) {
  const newDeck = new Deck({ title: req.body.title })
  await newDeck.save()
  res.json(newDeck)
}
