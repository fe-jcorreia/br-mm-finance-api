import express, { Request, Response } from "express";
import { container } from "tsyringe";

import { UserCreateController } from "@api/controller";
import { asyncErrorHandler } from "@core/error";

export const authRoute = express.Router();

authRoute.post(
  "/create",
  asyncErrorHandler((req: Request, res: Response) =>
    container.resolve(UserCreateController).handle(req, res)
  )
);

authRoute.get("/me", async (req: Request, res: Response) => {
  res.send({ message: "Selected" });
});
