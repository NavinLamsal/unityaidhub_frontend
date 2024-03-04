"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { User } from "@/lib/types/User"
import { isValidPhoneNumber } from "@/lib/Validation/RegisterValidation"
import { useState } from "react"

import bcrypt from "bcrypt";

export function ProfileForm({ userData }: { userData: User }) {
  const [confirmUpdate, setConfirmUpdate] = useState(false)

  const profileFormSchema = z.object({
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
      return value.trim() === "" || typeof value === "string";
    }, { message: "Address must be in text form" }),
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
      })
  })
  // .refine((value) => {
  //     if (!value) {
  //       return true; // password is optional
  //     }
  //     return bcrypt.compareSync(value.password, userData.password);
  //   }, {
  //     message: "Password is incorrect",
  //     path: ["password"],
  //   })

  type ProfileFormValues = z.infer<typeof profileFormSchema>



  const defaultValues: Partial<ProfileFormValues> = {

    name: userData.name,
    phoneNumber: userData.phoneNumber,
    address: userData.address,
    email: userData.email
  }

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })



  function onSubmit(data: ProfileFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }
  if(userData){
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 lg:max-w-2xl">
          {!confirmUpdate ? <>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormDescription>
                    This email is used for login and contact with you.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="phoneNumber"
              control={form.control}
              render={({ field }) => (
                <>
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
  
                      <Input
                        type="text"
                        id="phoneNumber"
                        placeholder="+111 1111111111"
  
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                  <FormMessage />
                </>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your address.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="button" onClick={() => setConfirmUpdate(true)}>Confirm Update</Button>
          </>
            :
            <>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormDescription>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="reset" variant={"outline"} onClick={() => { form.reset(); setConfirmUpdate(false); }}>Cancel</Button>
              <Button type="submit">Update</Button>
            </>
          }
        </form>
      </Form>
    )
  }else{
    return(
      <h1 className="text-center text-sm">oops something went wrong</h1>
    )
  }
}