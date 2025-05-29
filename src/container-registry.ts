import { container } from "tsyringe";

import { UserController, UserCreateController, UserUpdateController } from "@api/controller/user";
import { AuthenticationController } from "@api/controller/auth";
import { UserCreateUseCase, UserUpdateUseCase, UserUseCase } from "@domain/user";
import { AuthenticationUseCase } from "@domain/auth";
import { UserRepository } from "@data/repository";

// User
container.registerSingleton("UserCreateController", UserCreateController);
container.registerSingleton("UserCreateUseCase", UserCreateUseCase);
container.registerSingleton("UserController", UserController);
container.registerSingleton("UserUseCase", UserUseCase);
container.registerSingleton("UserUpdateController", UserUpdateController);
container.registerSingleton("UserUpdateUseCase", UserUpdateUseCase);
container.registerSingleton("UserRepository", UserRepository);

// Authentication
container.registerSingleton("AuthenticationUseCase", AuthenticationUseCase);
container.registerSingleton("AuthenticationController", AuthenticationController);
