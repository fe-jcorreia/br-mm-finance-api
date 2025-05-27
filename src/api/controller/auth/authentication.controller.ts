import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";

import { AuthenticationUseCase } from "@domain/auth";
import { authenticationInputSchema, authenticationSchema } from "@api/schema";

@injectable()
export class AuthenticationController {
  constructor(
    @inject("AuthenticationUseCase")
    private readonly authenticationUseCase: AuthenticationUseCase
  ) {}

  async handle(req: Request, res: Response) {
    const input = authenticationInputSchema.parse(req.body);

    const authToken = await this.authenticationUseCase.exec(input);

    res.status(200).send(authenticationSchema.parse(authToken));
  }
}
