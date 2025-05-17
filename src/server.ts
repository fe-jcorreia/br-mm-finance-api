import { Env } from "@src/env";
import express from "express";
import { authRoute } from "./api/auth.route";

const app = express();

app.use(authRoute)


app.listen(Env.PORT, () => {
  console.log(`Server running on PORT ${Env.PORT}`);
});
