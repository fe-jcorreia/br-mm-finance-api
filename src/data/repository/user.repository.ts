import { CryptoService } from "@core/security";
import { ConflictError } from "@core/error";
import { dbClient } from "@data/orm";
import {
  User,
  UserCreationInput,
  UserUpdateInput,
  UserWithCredentials,
} from "@model";

const UNIQUE_CONSTRAINT_ERROR = "P2002";
const userSelection = {
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  phone: true,
};

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
        select: userSelection,
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

  async findOneByEmail(email: string): Promise<User | null> {
    return await dbClient.user.findUnique({
      where: { email, deletedAt: null },
      select: userSelection,
    });
  }

  async findOneById(id: string): Promise<User | null> {
    return await dbClient.user.findUnique({
      where: { id, deletedAt: null },
      select: userSelection,
    });
  }

  async update(id: string, input: UserUpdateInput): Promise<User> {
    return dbClient.user.update({
      where: { id },
      data: input,
      select: userSelection,
    });
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
      select: userSelection,
    });
  }
}
