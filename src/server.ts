import "reflect-metadata";
import { Env } from "@env";
import express from "express";
import "./container-registry";

import { authenticationRoute, userRoute } from "@api";
import { ContextMiddleware } from "@api/middleware";
import { parseGlobalError } from "@core/error";
import { CryptoService, JwtService } from "@core/security";

const app = express();

CryptoService.configure(Env.CRYPTO_SALT);
JwtService.configure({ expiration: Env.JWT_EXPIRATION, secret: Env.JWT_SECRET });

app.use(express.json());
app.use(ContextMiddleware);

app.use("/auth", authenticationRoute);
app.use("/user", userRoute);

app.use(parseGlobalError);

app.listen(Env.PORT, () => {
	// biome-ignore lint/suspicious/noConsole: server startup
	console.log(`Server running on PORT ${Env.PORT}`);
});
