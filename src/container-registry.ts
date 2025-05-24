import { container } from "tsyringe";

import { UserCreateUseCase } from "@domain/user";
import { UserCreateController } from "@api/controller/user";
import { UserRepository } from "@data/repository";


container.registerSingleton("UserCreateController", UserCreateController);
container.registerSingleton("UserCreateUseCase", UserCreateUseCase);
container.registerSingleton("UserRepository", UserRepository)