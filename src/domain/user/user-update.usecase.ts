import { inject, injectable } from "tsyringe";

import { UserErrors, UserUseCase } from "@domain/user";
import { UserRepository } from "@data/repository";
import { User, UserUpdateInput, UserWithCredentials } from "@model";
import { CryptoService } from "@core/security";
import { InvalidDataError } from "@core/error/generic";

@injectable()
export class UserUpdateUseCase {
  constructor(
    @inject("UserUseCase") private readonly userUseCase: UserUseCase,
    @inject("UserRepository") private readonly userRepository: UserRepository
  ) {}

  async exec(input: UserUpdateInput): Promise<User> {
    const user = await this.userUseCase.exec();

    let password;
    if (input.password) {
      await this.checkOldPassword(user, input);
      password = await CryptoService.generateHashWithSalt(input.password, user.salt);
    }

    const { oldPassword, ...validFieldsToUpdate } = input;
    const patchedUser = await this.userRepository.update(user.id, { ...validFieldsToUpdate, password });

    return patchedUser;
  }

  private async checkOldPassword(user: UserWithCredentials, input: UserUpdateInput) {
    const hashedOldPassword = input.oldPassword && (await CryptoService.generateHashWithSalt(input.oldPassword, user.salt));

    if (!input.oldPassword || hashedOldPassword !== user.password) {
      throw new InvalidDataError(UserErrors.InvalidOldPassword);
    }
  }
}
