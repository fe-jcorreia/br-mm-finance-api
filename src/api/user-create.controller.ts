import { UserCreateUseCase } from "@src/domain/user-create.usecase";
import { Request, Response } from "express";
import { Service } from "typedi";

@Service()
export class UserCreateController {
  constructor(private readonly userCreateUseCase: UserCreateUseCase) {}

  async exec(req: Request, res: Response) {
    await this.userCreateUseCase.exec({});

    return res.send({ message: "Created" });
  }
}
