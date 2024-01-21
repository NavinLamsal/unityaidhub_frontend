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


interface IFormInput {
  email: string;
  password: string;
}
 
const Login = () => {
  const form = useForm<z.infer<typeof loginvalidation>>({
    mode: "onBlur",
    resolver: zodResolver(loginvalidation)
  })

  function onSubmit(values:z.infer<typeof loginvalidation>) {
    console.log(values)
  }

  return (

      <div className=" w-full">
        <Form {...form }>
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
          <FormField
            name="password"
            control={form.control}
            rules={{
              required: "Email is required",
            }}
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>Password</FormLabel>
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
          
          <Button variant="default_outline" type="submit">Sign In</Button>

          </form>
    

        </Form>
      </div>

  );
};

export default Login;
