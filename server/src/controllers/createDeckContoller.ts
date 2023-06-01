import Deck from '../models/Deck'
import { Request, Response } from 'express'

export async function createDecksConroller(req: Request, res: Response) {
  const newDeck = new Deck({ title: req.body.title })
  await newDeck.save()
  res.json(newDeck)
}
