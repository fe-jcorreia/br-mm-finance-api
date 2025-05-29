import express, { Request, Response } from "express";
import { container } from "tsyringe";

import {
  UserController,
  UserCreateController,
  UserUpdateController,
} from "@api/controller/user";
import { asyncErrorHandler } from "@core/error";
import { AuthorizationMiddleware } from "@api/middleware";

export const userRoute = express.Router();

userRoute.post(
  "/create",
  asyncErrorHandler((req: Request, res: Response) =>
    container.resolve(UserCreateController).handle(req, res)
  )
);

userRoute.get(
  "/me",
  AuthorizationMiddleware,
  asyncErrorHandler((req: Request, res: Response) => {
    container.resolve(UserController).handle(req, res);
  })
);

userRoute.patch(
  "/update",
  AuthorizationMiddleware,
  asyncErrorHandler((req: Request, res: Response) => {
    container.resolve(UserUpdateController).handle(req, res);
  })
);
