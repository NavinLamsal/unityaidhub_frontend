'use client'
import React from "react";
import { PasswordInput } from "../ui/passwordInput";
import { zodResolver } from "@hookform/resolvers/zod"
import {  useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import * as z from "zod";
import { Button } from "../ui/button";
import { motion } from "framer-motion";



 
export const PasswordResetValidation = z.object({
oldpassword: z
    .string({
        required_error: "old Password is Required",
      })
    .min(8, { message: "Password is less than 8 characters." })
    .regex(/[A-Z]/, {
      message: "Password doesn't contain uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password doesn't contain lowercase letter.",
    })
    .regex(/[0-9]/, { message: "Password doesn't contain digit." })
    .regex(/[^A-Za-z0-9]/, {
        message: "Password doesn't contain special character.",
      }),
newpassword: z
    .string({
        required_error: "New Password is Required",
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
      confirmnewPassword: z.string(),
}).refine((data) => data.newpassword === data.confirmnewPassword, {
    path: ['confirmnewPassword'],
    message: 'Passwords does not match'
  });



const PasswordReset = () => {
  const form = useForm<z.infer<typeof PasswordResetValidation>>({
    mode: "onBlur",
    resolver: zodResolver(PasswordResetValidation)
  })

  function onSubmit(values:z.infer<typeof PasswordResetValidation>) {
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
                            name="oldpassword"
                            control={form.control}

                            render={({ field }) => (
                                <>
                                    <FormItem>
                                        <FormLabel>old Password</FormLabel>
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
                            name="newpassword"
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
                            name="confirmnewPassword"
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

          
          <Button variant="default_outline" type="submit" className="mt-4">Change Password</Button>
          </motion.div>

          </form>
    

        </Form>
      </div>

  );
};

export default PasswordReset;
