import express, { Request, Response } from "express";
import { UserCreateController } from "./controller/user-create.controller";
import { container } from "tsyringe";
import { asyncErrorHandler } from "@src/core/error/async-error-handler.middleware";

export const authRoute = express.Router();

authRoute.post(
  "/create",
  asyncErrorHandler((req: Request, res: Response) => {
    return container.resolve(UserCreateController).handle(req, res);
  })
);

authRoute.get("/me", async (req: Request, res: Response) => {
  res.send({ message: "Selected" });
});
