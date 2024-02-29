'use client'
import React, { useState } from "react";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import * as z from "zod";
import { Button } from "../ui/button";


export const emailValidation = z.object({
    email: z
      .string({
          required_error: "Email is Required",
        })
      .email({ message: "Invalid email format" }),
    });

const ForgetPassword = () => {
    const [emailSend, setEmailSend]= useState(false);
    const [emailAddress, setEmailAddress]= useState<string>('')
  const form = useForm<z.infer<typeof emailValidation>>({
    mode: "onBlur",
    resolver: zodResolver(emailValidation)
  })

  function onSubmit(values:z.infer<typeof emailValidation>) {
    setEmailSend(true);
    setEmailAddress(values.email)
    console.log(values)
  }

    function emailChange(): void {
        form.reset();
        setEmailSend(false);
        setEmailAddress('');
    }
  return (
      <div className=" w-full">
       {!emailSend && <Form {...form }>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <FormField
            name="email"
            control={form.control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address",
              },
            }}
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>

                <Input
                  type="email"
                  id="email"
                  placeholder="Email Address"
                 
                  {...field}
                />
                  </FormControl>
                </FormItem>
                <FormMessage />
              </>
            )}
          />         
          <Button variant="default_outline" type="submit">Reset Password</Button>
          </form>
    

        </Form>
}
        {emailSend && <div className="w-full flex flex-col gap-6">
            <p className="text-lg font-thin text-center">
                Check your inbox at <br/><span className="font-normal cursor-pointer text-Secondary">&apos;{emailAddress}&apos;</span><br/> for the Reset Link
            </p>
            <Button variant="default_outline" onClick={()=>emailChange()}>Change Email</Button>
            </div>}
      </div>

  );
};

export default ForgetPassword;
