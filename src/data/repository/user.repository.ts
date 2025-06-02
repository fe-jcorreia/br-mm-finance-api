import { CryptoService } from "@core/security";
import { ConflictError } from "@core/error/generic";
import { UserErrors } from "@domain/user";
import { dbClient } from "@data/orm";
import {
  User,
  UserCreationInput,
  UserUpdateInput,
  UserWithCredentials,
} from "@model";

const UNIQUE_CONSTRAINT_ERROR = "P2002";

export class UserRepository {
  async insert(input: UserCreationInput): Promise<User> {
    const salt = CryptoService.generateRandomPassword();
    const hashedPassword = await CryptoService.generateHashWithSalt(input.password, salt);

    try {
      return await dbClient.user.create({ data: { ...input, salt, password: hashedPassword } });
    } catch (error) {
      if (error.code === UNIQUE_CONSTRAINT_ERROR) {
        throw new ConflictError(UserErrors.AlreadyRegistered);
      }

      throw error;
    }
  }

  async findOneByEmail(email: string): Promise<UserWithCredentials | null> {
    return await dbClient.user.findUnique({
      where: { email, deletedAt: null },
    });
  }

  async findOneById(id: string): Promise<UserWithCredentials | null> {
    return await dbClient.user.findUnique({
      where: { id, deletedAt: null },
    });
  }

  async update(id: string, input: UserUpdateInput): Promise<User> {
    return dbClient.user.update({
      where: { id },
      data: input,
    });
  }

  async remove(input: UserWithCredentials): Promise<User> {
    return dbClient.user.update({
      where: { id: input.id },
      data: {
        email: await CryptoService.generateHashWithSalt(input.email, input.salt),
        firstName: await CryptoService.generateHashWithSalt(input.email, input.salt),
        lastName: await CryptoService.generateHashWithSalt(input.email, input.salt),
        password: null,
        deletedAt: new Date(),
      },
    });
  }
}
