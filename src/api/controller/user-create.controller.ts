import { UserCreateUseCase } from "@src/domain/user-create.usecase";
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { z } from "zod";

const userCreationSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string(),
});

@injectable()
export class UserCreateController {
  constructor(
    @inject("UserCreateUseCase")
    private readonly userCreateUseCase: UserCreateUseCase
  ) {}

  async handle(
    req: Request,
    res: Response
  ) {
    const body = userCreationSchema.parse(req.body);

    const user = await this.userCreateUseCase.exec(body);

    res.status(201).send({ message: "Created", user });
  }
}
