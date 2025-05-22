import { User, UserCreationInput } from "@src/model";
import { dbClient } from "@src/data/orm/database-client";

export class UserRepository {
  async insert(input: UserCreationInput): Promise<User> {
    const user = await dbClient.user.create({
      data: { ...input, salt: "default" },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
      },
    });

    return user;
  }
}
