import { ZodEffects, z } from "zod";

const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

export const isValidPhoneNumber = (phoneNumber:string) => {
  try {
    const parsedPhoneNumber = phoneUtil.parseAndKeepRawInput(phoneNumber);
    return phoneUtil.isValidNumber(parsedPhoneNumber);
  } catch (error) {
    return false; 
  }
};


export const registervalidation = z.object({
    name: z.string({
        required_error: "Full name is Required",
    }),
    phoneNumber: z
    .string()
    .refine((value) => {
      return value.trim() === "" || isValidPhoneNumber(value);
    }, {
      message: "Invalid phone number format or country code",
    }),

    address: z.string().refine((value) => {
        return value.trim() === ""|| typeof value === "string" ;
      },{message:"Address must be in text form"}),
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
      confirmPassword: z.string(),
      termsandpolicy: z.string().refine(value => value === "true", {
        message: "Terms and policy must be true",
      }),
}).refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords does not match'
  });
