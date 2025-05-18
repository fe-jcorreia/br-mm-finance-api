import express, { Request, Response } from 'express'
import { UserCreateController } from './user-create.controller';
import { Container } from 'typedi';

export const authRoute = express.Router()

authRoute.post("/create", (req: Request, res: Response) => Container.get(UserCreateController).exec(req, res))

authRoute.get("/me", async (req: Request, res: Response) => {

  res.send({ message: "Selected" })
})
