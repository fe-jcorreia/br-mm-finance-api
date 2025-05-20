import { User, UserCreationInput } from "@src/model";
import { prisma } from "@src/data/orm/prisma";

export class UserRepository {
  async insert(input: UserCreationInput): Promise<User> {
    const user = await prisma.user.create({ data: input });

    return user;
  }
}
