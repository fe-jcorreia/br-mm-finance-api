import { NextFunction, Request, Response } from "express";

import {
  AuthenticatedContext,
  ContextProvider,
  ServerContext,
} from "@core/context";
import { UnauthorizedError } from "@core/error/generic";

export function AuthorizationMiddleware(
  _req: Request,
  _res: Response,
  next: NextFunction
) {
  const context = ContextProvider.getInstance<ServerContext>().get();

  if (!isAuthenticated(context)) {
    throw new UnauthorizedError();
  }

  next();
}

function isAuthenticated(context: any): context is AuthenticatedContext {
  return !!context.userId;
}
