import express, { Request, Response } from "express";
import { container } from "tsyringe";

import { UserCreateController } from "@api/controller/user";
import { asyncErrorHandler } from "@core/error/generic";

export const userRoute = express.Router();

userRoute.post(
  "/create",
  asyncErrorHandler((req: Request, res: Response) =>
    container.resolve(UserCreateController).handle(req, res)
  )
);

userRoute.get("/me", async (req: Request, res: Response) => {
  res.send({ message: "Selected" });
});
