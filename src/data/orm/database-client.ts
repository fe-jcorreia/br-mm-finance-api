import { PrismaClient } from "@prisma/client";

import { Env } from "@env";

export const dbClient = new PrismaClient({
  log: Env.NODE_ENV === "development" ? ["query", "info"] : [],
});
