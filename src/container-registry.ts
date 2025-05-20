import { container } from "tsyringe";
import { UserCreateUseCase } from "./domain/user-create.usecase";
import { UserCreateController } from "./api/controller/user-create.controller";
import { UserRepository } from "./data/repository";

container.registerSingleton("UserCreateUseCase", UserCreateUseCase);
container.registerSingleton("UserCreateController", UserCreateController);
container.registerSingleton("UserRepository", UserRepository)