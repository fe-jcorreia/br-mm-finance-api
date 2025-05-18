import { User } from "@prisma/client";
import { prisma } from "@src/data/orm/prisma";
import { Service } from "typedi";

@Service()
export class UserCreateUseCase {
  async exec(input: any): Promise<User> {
    const user = await prisma.user.create({
      data: {
        firstName: "Fernando",
        lastName: "Correia 2",
        phone: "+5511999991111",
      },
    });

    return user;
  }
}
