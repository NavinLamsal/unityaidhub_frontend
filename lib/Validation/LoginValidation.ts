import { z } from "zod";

export const loginvalidation = z.object({
  email: z
    .string({
        required_error: "Email is Required",
      })
    .email({ message: "Invalid email format" }),

  password: z
    .string({
        required_error: "Password is Required",
      })
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one digit" })
    .regex(/[^A-Za-z0-9]/, {
        message: "Password must contain at least one special character",
      }),
});
