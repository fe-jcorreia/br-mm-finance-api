import { container } from "tsyringe";

import { UserCreateUseCase } from "@domain/user";
import { UserCreateController } from "@api/controller/user";
import { UserRepository } from "@data/repository";
import { AuthenticationUseCase } from "@domain/auth";
import { AuthenticationController } from "@api/controller/auth";

// User
container.registerSingleton("UserCreateController", UserCreateController);
container.registerSingleton("UserCreateUseCase", UserCreateUseCase);
container.registerSingleton("UserRepository", UserRepository);

// Authentication
container.registerSingleton("AuthenticationUseCase", AuthenticationUseCase);
container.registerSingleton("AuthenticationController", AuthenticationController);