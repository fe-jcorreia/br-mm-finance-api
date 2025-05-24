import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";

import { UserCreateUseCase } from "@domain/user";
import { userCreationSchema, userSchema } from "@api/schema";

@injectable()
export class UserCreateController {
  constructor(
    @inject("UserCreateUseCase")
    private readonly userCreateUseCase: UserCreateUseCase
  ) {}

  async handle(req: Request, res: Response) {
    const body = userCreationSchema.parse(req.body);

    const user = await this.userCreateUseCase.exec(body);

    res.status(201).send({ user: userSchema.parse(user) });
  }
}
