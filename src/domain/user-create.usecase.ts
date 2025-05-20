import { User } from "@prisma/client";
import { UserRepository } from "@src/data/repository";
import { UserCreationInput } from "@src/model";
import { inject, injectable } from "tsyringe";

@injectable()
export class UserCreateUseCase {
  constructor(
    @inject("UserRepository") private readonly userRepository: UserRepository
  ) {}

  async exec(input: UserCreationInput): Promise<User> {
    const insertedUser = await this.userRepository.insert(input)
    
    return insertedUser;
  }
}
