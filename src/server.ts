import "reflect-metadata";
import express from "express";
import { Env } from "@env";
import "./container-registry";

import { userRoute } from "@api";
import { CryptoService, JwtService } from "@core/security";
import { parseGlobalError } from "@core/error";
import { ContextProvider } from "@core/context";
import { ServerContext } from "@core/context/context.model";
import { JwtPayload } from "jsonwebtoken";

const app = express();

CryptoService.configure(Env.CRYPTO_SALT);
JwtService.configure({
  expiration: Env.JWT_EXPIRATION,
  secret: Env.JWT_SECRET,
});

app.use(express.json());

app.use((req, res, next) => {
  const authToken = req.headers.authorization;
  let userId: string | undefined;

  if (authToken) {
    const decodedToken = JwtService.verify<JwtPayload>(authToken);
    userId = decodedToken?.data?.id;
  }

  const context: ServerContext = { uuid: crypto.randomUUID(), userId };
  ContextProvider.getInstance<ServerContext>().enterWith(context);

  next();
});

app.use("/user", userRoute);

app.use(parseGlobalError);

app.listen(Env.PORT, () => {
  console.log(`Server running on PORT ${Env.PORT}`);
});
