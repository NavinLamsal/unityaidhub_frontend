'use client'
import React, { useState } from "react";
import { Input } from "../ui/input";
import { PasswordInput } from "../ui/passwordInput";
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import * as z from "zod";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { loginvalidation } from "@/lib/Validation/LoginValidation";
import { loginAction } from "../action/loginAction";
import { AlertTriangle, CheckCheck } from "lucide-react";
import { toast } from "../ui/use-toast";
import { useSearchParams } from "next/navigation";


interface IFormInput {
  email: string;
  password: string;
}
 
const Login = () => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')?? "";
  console.log("callbackurl", callbackUrl)
  const form = useForm<z.infer<typeof loginvalidation>>({
    mode: "onBlur",
    resolver: zodResolver(loginvalidation)
  })

  const [errorMessage, setErrorMessage]= useState<String| null>(null);
  
  async function onSubmit(values:z.infer<typeof loginvalidation>) {
    const formData = new FormData()
    formData.append("email", values.email)
    formData.append("password", values.password)
    const res = await loginAction(formData, callbackUrl);
    if(res?.error) setErrorMessage(res.error);
    else{
      toast({
        variant:"sucess",
        title: `${<CheckCheck className="text-Primary"/>}Logged in Sucessfully`
      })
    }
  }

  return (

      <div className=" w-full">
        <Form {...form }>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
           {errorMessage &&  <p className="bg-red-950 text-white mx-auto px-2 py-1 flex text-sm"><AlertTriangle/>&nbsp;{errorMessage}</p>}
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
