import express, { Request, Response } from "express";
import { container } from "tsyringe";

import { asyncErrorHandler } from "@core/error";
import { AuthenticationController } from "@api/controller/auth";

export const authenticationRoute = express.Router();

authenticationRoute.post(
  "/auth",
  asyncErrorHandler((req: Request, res: Response) =>
    container.resolve(AuthenticationController).handle(req, res)
  )
);
