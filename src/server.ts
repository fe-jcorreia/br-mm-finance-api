import "reflect-metadata";
import express from "express";
import "./container-registry";
import { Env } from "@src/env";

import { authRoute } from "./api/auth.route";
import { parseGlobalError } from "./core/error/error.middleware";
import { CryptoService, JwtService } from "./core/security";

const app = express();

CryptoService.configure(Env.CRYPTO_SALT);
JwtService.configure({ expiration: Env.JWT_EXPIRATION, secret: Env.JWT_SECRET });

app.use(express.json());

app.use("/auth", authRoute);


app.use(parseGlobalError);

app.listen(Env.PORT, () => {
  console.log(`Server running on PORT ${Env.PORT}`);
});
