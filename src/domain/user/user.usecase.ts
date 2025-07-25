import { inject, injectable } from "tsyringe";

import { AuthenticatedContext, ContextProvider } from "@/core/context";
import { NotFoundError } from "@/core/error/generic";
import { UserRepository } from "@/data/repository";
import { UserErrors } from "@/domain/user";
import { UserWithCredentials } from "@/model";

@injectable()
export class UserUseCase {
	constructor(
		@inject("UserRepository")
		private readonly userRepository: UserRepository,
	) {}

	async exec(): Promise<UserWithCredentials> {
		const userId = ContextProvider.getInstance<AuthenticatedContext>().get().userId;
		const user = await this.userRepository.findOneById(userId);

		if (!user) {
			throw new NotFoundError(UserErrors.NotFound);
		}

		return user;
	}
}
