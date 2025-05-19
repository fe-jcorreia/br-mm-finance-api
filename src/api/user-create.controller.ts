import { UserCreateUseCase } from "@src/domain/user-create.usecase";
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";

@injectable()
export class UserCreateController {
  constructor(@inject("UserCreateUseCase") private readonly userCreateUseCase: UserCreateUseCase) {}

  async exec(req: Request, res: Response) {
    await this.userCreateUseCase.exec({});

    return res.send({ message: "Created" });
  }
}
