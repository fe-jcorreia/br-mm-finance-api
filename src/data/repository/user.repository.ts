import {
  User,
  UserCreationInput,
  UserUpdateInput,
  UserWithCredentials,
} from "@src/model";
import { dbClient } from "@src/data/orm/database-client";
import { CryptoService } from "@src/core/security";
import { ConflictError } from "@src/core/error";

const UNIQUE_CONSTRAINT_ERROR = "P2002";

export class UserRepository {
  async insert(input: UserCreationInput): Promise<User> {
    const salt = CryptoService.generateRandomPassword();
    const hashedPassword = await CryptoService.generateHashWithSalt(
      input.password,
      salt
    );

    try {
      return await dbClient.user.create({
        data: { ...input, salt, password: hashedPassword },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          phone: true,
        },
      });
    } catch (error) {
      if (error.code === UNIQUE_CONSTRAINT_ERROR) {
        throw new ConflictError({
          code: "USR_01",
          message: "users.error.existing-email",
        });
      }

      throw error;
    }
  }

  async update(input: UserUpdateInput): Promise<User> {
    return {} as User;
  }

  async remove(input: UserWithCredentials): Promise<User> {
    return dbClient.user.update({
      where: { id: input.id },
      data: {
        email: await CryptoService.generateHashWithSalt(
          input.email,
          input.salt
        ),
        firstName: await CryptoService.generateHashWithSalt(
          input.email,
          input.salt
        ),
        lastName: await CryptoService.generateHashWithSalt(
          input.email,
          input.salt
        ),
        password: null,
        deletedAt: new Date(),
      },
    });
  }
}
