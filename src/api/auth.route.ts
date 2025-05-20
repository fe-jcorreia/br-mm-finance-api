import express, { Request, Response } from 'express'
import { UserCreateController } from './controller/user-create.controller';
import { container } from 'tsyringe';

export const authRoute = express.Router()

authRoute.post("/create", (req: Request, res: Response) => {
  const controller = container.resolve(UserCreateController);
  
  return controller.handle(req, res);
})

authRoute.get("/me", async (req: Request, res: Response) => {

  res.send({ message: "Selected" })
})
