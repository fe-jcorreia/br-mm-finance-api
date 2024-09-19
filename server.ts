import express, { Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World")
});

app.listen(3003, () => {
  console.log('Server starting... Running on PORT 3003.')
});
