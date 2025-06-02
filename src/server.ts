import "reflect-metadata";
import express from "express";
import { Env } from "@env";
import "./container-registry";

import { userRoute, authenticationRoute } from "@api";
import { CryptoService, JwtService } from "@core/security";
import { parseGlobalError } from "@core/error";
import { ContextMiddleware } from "@api/middleware";

const app = express();

CryptoService.configure(Env.CRYPTO_SALT);
JwtService.configure({ expiration: Env.JWT_EXPIRATION, secret: Env.JWT_SECRET });

app.use(express.json());
app.use(ContextMiddleware);

app.use("/auth", authenticationRoute);
app.use("/user", userRoute);

app.use(parseGlobalError);

app.listen(Env.PORT, () => {
  console.log(`Server running on PORT ${Env.PORT}`);
});
