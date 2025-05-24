import type { UserUpdateInput, User, UserCreationInput } from "@model";
import { type ZodType, z } from "zod";

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\d])(?=.*\S).{8,}$/;
const PHONE_REGEX = /^\+55\d{2}\d{8,9}$/;

const isValidPassword = (password: string) => password.match(PASSWORD_REGEX);
const isValidPhone = (phone: string) => phone.match(PHONE_REGEX);

export const userSchema = z.object({
  id: z.string(),
  email: z
    .string({ message: "users.error.invalid-email" })
    .email("users.error.invalid-email"),
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string().refine(isValidPhone, "users.error.invalid-phone"),
}) satisfies ZodType<User>;

export const userCreationSchema = userSchema.omit({ id: true }).extend({
  password: z.string().refine(isValidPassword, "users.error.invalid-password"),
}) satisfies ZodType<UserCreationInput>;

export const updateUserInputSchema = userCreationSchema
  .omit({ email: true })
  .extend({ oldPassword: z.string() })
  .partial() satisfies ZodType<UserUpdateInput>;
