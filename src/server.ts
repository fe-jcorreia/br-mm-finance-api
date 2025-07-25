import "reflect-metadata";
import "./container-registry";
import path from "node:path";
import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import { authenticationRoute, userRoute } from "@/api";
import { ContextMiddleware } from "@/api/middleware";
import { parseGlobalError } from "@/core/error";
import { CryptoService, JwtService } from "@/core/security";
import { Env } from "@/env";

const app = express();

CryptoService.configure(Env.CRYPTO_SALT);
JwtService.configure({ expiration: Env.JWT_EXPIRATION, secret: Env.JWT_SECRET });

app.use(express.json());
app.use(ContextMiddleware);

app.use("/auth", authenticationRoute);
app.use("/user", userRoute);

app.use(parseGlobalError);

const options = {
	failOnErrors: false, // Whether or not to throw when parsing errors. Defaults to false.
	definition: {
		openapi: "3.0.0",
		info: {
			title: "br-mm-finance-api",
			version: "1.0.0",
		},
	},
	apis: [path.resolve(__dirname, "./api/**/*.route.ts"), path.resolve(__dirname, "./api/**/*.route.js")],
};
const openapiSpecification = swaggerJsdoc(options);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.listen(Env.PORT, () => {
	// biome-ignore lint/suspicious/noConsole: server startup
	console.log(`Server running on http://localhost:${Env.PORT}`);
	console.log(`Swagger docs on http://localhost:${Env.PORT}/docs`);
});
