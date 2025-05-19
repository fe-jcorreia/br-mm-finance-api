import express, { Request, Response } from 'express'
import { UserCreateController } from './user-create.controller';
import { container } from 'tsyringe';

export const authRoute = express.Router()

authRoute.post("/create", (req: Request, res: Response) => {
  

  res.send({message: "Response"})
})

authRoute.get("/me", async (req: Request, res: Response) => {

  res.send({ message: "Selected" })
})
