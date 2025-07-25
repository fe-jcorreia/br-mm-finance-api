import { inject, injectable } from "tsyringe";

import { UnauthorizedError } from "@/core/error/generic";
import { CryptoService, JwtService } from "@/core/security";
import { UserRepository } from "@/data/repository";
import { Authentication, AuthenticationInput, JwtPayload } from "@/model";

import { AuthenticationErrors } from "./authentication.error";

const FAKE_SALT_TO_FORCE_HASH = "salt";

@injectable()
export class AuthenticationUseCase {
	constructor(
		@inject("UserRepository")
		private readonly userRepository: UserRepository,
	) {}

	async exec({ email, password }: AuthenticationInput): Promise<Authentication> {
		const user = await this.userRepository.findOneByEmail(email);
		const inputPassword = await CryptoService.generateHashWithSalt(password, user?.salt ?? FAKE_SALT_TO_FORCE_HASH);

		if (!user || inputPassword !== user.password) {
			throw new UnauthorizedError(AuthenticationErrors.Credentials);
		}

		return { token: JwtService.sign<JwtPayload>({ id: user.id }) };
	}
}
