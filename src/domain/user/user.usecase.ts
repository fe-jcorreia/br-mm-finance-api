import { inject, injectable } from "tsyringe";

import { NotFoundError } from "@core/error/generic";
import { AuthenticatedContext, ContextProvider } from "@core/context";
import { UserErrors } from "@domain/user";
import { UserRepository } from "@data/repository";
import { UserWithCredentials } from "@model";

@injectable()
export class UserUseCase {
  constructor(
    @inject("UserRepository") private readonly userRepository: UserRepository
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
