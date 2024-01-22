'use client'
import React from "react";
import { Input } from "../ui/input";
import { PasswordInput } from "../ui/passwordInput";
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import * as z from "zod";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { loginvalidation } from "@/lib/Validation/LoginValidation";
import { motion } from "framer-motion";


interface IFormInput {
  password: string;
}
 
export const PasswordValidation = z.object({
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
}).refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords does not match'
  });

  
const NewPassword = () => {
  const form = useForm<z.infer<typeof PasswordValidation>>({
    mode: "onBlur",
    resolver: zodResolver(PasswordValidation)
  })

  function onSubmit(values:z.infer<typeof PasswordValidation>) {
    console.log(values)
  }

  return (

      <div className=" w-full">
        <Form {...form }>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <motion.div
                        initial={{ x: 0, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        className=" flex flex-col gap-2"
                    >
                        <FormField
                            name="password"
                            control={form.control}

                            render={({ field }) => (
                                <>
                                    <FormItem>
                                        <FormLabel>New Password</FormLabel>
                                        <FormControl>
                                            <PasswordInput
                                                id="password"
                                                placeholder="1 Uppercase 1 charater 1 Numeric"

                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                    <FormMessage />

                                </>
                            )}
                        />
                        <FormField
                            name="confirmPassword"
                            control={form.control}

                            render={({ field }) => (
                                <>
                                    <FormItem>
                                        <FormLabel>Confirm New Password</FormLabel>
                                        <FormControl>
                                            <PasswordInput
                                                id="confirmPassword"
                                                placeholder="1 Uppercase 1 charater 1 Numeric"

                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                    <FormMessage />

                                </>
                            )}
                        />

          
          <Button variant="default_outline" type="submit" className="mt-4">Set New Password</Button>
          </motion.div>

          </form>
    

        </Form>
      </div>

  );
};

export default NewPassword;
