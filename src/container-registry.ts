import { container } from "tsyringe";

import { UserController, UserCreateController } from "@api/controller/user";
import { AuthenticationController } from "@api/controller/auth";
import { UserCreateUseCase, UserUseCase } from "@domain/user";
import { AuthenticationUseCase } from "@domain/auth";
import { UserRepository } from "@data/repository";

// User
container.registerSingleton("UserCreateController", UserCreateController);
container.registerSingleton("UserCreateUseCase", UserCreateUseCase);
container.registerSingleton("UserController", UserController);
container.registerSingleton("UserUseCase", UserUseCase);
container.registerSingleton("UserRepository", UserRepository);

// Authentication
container.registerSingleton("AuthenticationUseCase", AuthenticationUseCase);
container.registerSingleton("AuthenticationController", AuthenticationController);
