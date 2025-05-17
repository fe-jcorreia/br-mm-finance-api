import { prisma } from '@src/data/orm/prisma';
import express, { Request, Response } from 'express'

export const authRoute = express.Router()

authRoute.post("/auth/create", async (req: Request, res: Response) => {
  const user = await prisma.user.create({
    data: {
      firstName: "Fernando",
      lastName: "Correia",
      phone: "+5511999991111",
    },
  });

  res.send({ message: "Created", user })
})

authRoute.get("/auth/me", async (req: Request, res: Response) => {

  res.send({ message: "Selected" })
})

