import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";

import { userSchema, userUpdateSchema } from "@/api/schema";
import { UserUpdateUseCase } from "@/domain/user";

@injectable()
export class UserUpdateController {
	constructor(
		@inject("UserUpdateUseCase")
		private readonly userUpdateUseCase: UserUpdateUseCase,
	) {}

	async handle(req: Request, res: Response) {
		const body = userUpdateSchema.parse(req.body);

		const user = await this.userUpdateUseCase.exec(body);

		res.status(200).send({ user: userSchema.parse(user) });
	}
}
