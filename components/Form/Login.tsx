'use client'
import React from "react";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import * as z from "zod";


interface IFormInput {
  email: string;
  password: string;
}

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})
 
const Login = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  function onSubmit(values:z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div className="container max-w-xs">
      <div className="flex flex-col">
        <Form {...form }>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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
                  // aria-invalid={errors.email ? "true" : "false"}
                  {...field}
                />
                  </FormControl>
                </FormItem>
                <FormMessage />
                {/* {errors.email && (
                  <span role="alert" style={{ color: "red" }}>
                    {errors.email.message}
                  </span>
                )} */}
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                <Input
                  type="password"
                  id="password"
                  placeholder="1 Uppercase 1 charater 1 Numeric"
                  // aria-invalid={errors.email ? "true" : "false"}
                  {...field}
                />
                  </FormControl>
                </FormItem>
                <FormMessage />
                {/* {errors.email && (
                  <span role="alert" style={{ color: "red" }}>
                    {errors.email.message}
                  </span>
                )} */}
              </>
            )}
          />

          </form>
    

        </Form>
      </div>
    </div>
  );
};

export default Login;
