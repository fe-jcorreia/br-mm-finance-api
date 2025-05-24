import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

import { isBaseError } from "./base.error";

export interface ErrorBody {
  code: string;
  message: string;
  details?: any;
}

export function parseGlobalError(
  err: any,
  _req: Request,
  res: Response,
  next: NextFunction
) {
  const errors: ErrorBody[] = [];
  let status = 500;

  if (isBaseError(err)) {
    status = err.status;
    errors.push({
      code: err.code,
      message: err.message,
      details: err.details,
    });
  } else if (err instanceof ZodError) {
    status = 400;

    errors.push(
      ...err.errors.map((validation) => ({
        code: "VAL_01",
        message: "validation.error.generic",
        details: `Field ${validation.path?.[0]} - ${validation.message}`,
      }))
    );
  } else {
    errors.push({
      code: "GLB_01",
      message: "global.error.generic",
      details: err.message,
    });
  }

  res.status(status).send({ errors });
}
