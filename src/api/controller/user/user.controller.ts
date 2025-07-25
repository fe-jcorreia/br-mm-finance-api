import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";

import { userSchema } from "@/api/schema";
import { UserUseCase } from "@/domain/user";

@injectable()
export class UserController {
	constructor(
		@inject("UserUseCase")
		private readonly userUseCase: UserUseCase,
	) {}

	async handle(_req: Request, res: Response) {
		const user = await this.userUseCase.exec();

		res.status(200).send({ user: userSchema.parse(user) });
	}
}
