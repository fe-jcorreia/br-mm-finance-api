import 'reflect-metadata';
import express from "express";
import { Env } from "@src/env";
import { authRoute } from "./api/auth.route";

const app = express();

app.use(express.json());

app.use("/auth", authRoute)


app.listen(Env.PORT, () => {
  console.log(`Server running on PORT ${Env.PORT}`);
});
