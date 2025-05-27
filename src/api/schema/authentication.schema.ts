import { Authentication, AuthenticationInput } from "@model";
import { type ZodType, z } from "zod";
import { emailValidator } from "./user.schema";

export const authenticationSchema = z.object({
  token: z.string(),
}) satisfies ZodType<Authentication>;

export const authenticationInputSchema = z.object({
  email: emailValidator,
  password: z.string({ message: "users.error.required-password" }),
}) satisfies ZodType<AuthenticationInput>;
