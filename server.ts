import { Env } from "@src/env";
import express, { Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World")
});

app.listen(Env.PORT, () => {
  console.log(`Server running on PORT ${Env.PORT}`)
});
