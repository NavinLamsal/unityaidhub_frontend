"use client";

import { Phone, Mail, MapPin } from "lucide-react";
import React from "react";
import Image from "next/image";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const FormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .refine((value) => /^\s*[A-Za-z\s]+\s*$/.test(value), {
      message: "Name must contain only alphabetic characters.",
    }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  phoneNumber: z.string().refine((value) => /^\d{10}$/i.test(value), {
    message: "Invalid phone number. It must be 10 digits.",
  }),

  message: z
    .string()
    .min(10, {
      message: "Message must be at least 10 characters.",
    })
    .max(500, {
      message: "Message must not exceed 500 characters.",
    }),
});

const Contact = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    // defaultValues: {
    //   name: "John Doe",
    //   email: "john.doe@example.com",
    //   phoneNumber: "1234567890",
    //   message: "Thi",
    // },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div className="pb-7">
      <div className="flex flex-col items-center justify-center bg-Secondary/70  text-white h-72 gap-y-5  z-20">
        <p className="uppercase text-2xl font-semibold">
          We are here to assist you
        </p>
        <p className="uppercase text-3xl font-bold">Contact Us</p>
        <p className="text-xl text-center">
          Most Trusted Crowdfunding Platform based on Nepal
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 mt-5 md:z-20 mx-10 md:mx-32 gap-8 md:mt-[-50px]  pb-10">
        <div className="bg-white dark:bg-zinc-600 px-6 py-16 rounded-md shadow-md">
          <h1 className="text-secondary text-2xl font-semibold pb-3">
            Our Office
          </h1>
          <p className="pb-3">
          Most Trusted Crowdfunding Platform based on Nepal
          </p>
          <p className="flex pb-3 gap-3">
            {" "}
            <span className="text-secondary">
              <Phone />
            </span>
            +977 9811111111
          </p>
          <p className="flex pb-3 gap-3">
            {" "}
            <span className="text-secondary">
              <Mail />
            </span>
            help@gmail.com
          </p>
          <p className="flex gap-3">
            {" "}
            <span className="text-secondary">
              <MapPin />
            </span>
            Pokhara-1, Bagar
          </p>
        </div>
        <div className=" bg-white dark:bg-zinc-600 flex items-center justify-center flex-col rounded-md shadow-md">
          <div className="">
            <Image
              src="/crm.png"
              alt="Customer Relation"
              width={700}
              height={700}
              className=" w-40 h-40 object-cover "
            />
          </div>
          <h1
            className="uppercase text-xl font-medium text-center
          "
          >
            Customer Relation
          </h1>
          <p
            className="text-base px-10 py-3 text-center
          "
          >
            Most Trusted Crowdfunding Platform based on Nepal
          </p>
          <Button className="text-black border-2 border-black bg-white mb-3 hover:text-white hover:bg-Primary hover:border-Primary">
            Get Support
          </Button>
        </div>
        <div className=" bg-white dark:bg-zinc-600 flex items-center justify-center flex-col rounded-md shadow-md">
          <div className="">
            <Image
              src="/whatsapp-logo.png"
              alt="Customer Relation"
              width={1000}
              height={1000}
              quality={100}
              className=" w-32 h-40 py-5 object-cover "
            />
          </div>
          <h1
            className="uppercase text-xl font-medium text-center
          "
          >
            Whats App Support
          </h1>
          <p
            className="text-base px-10 py-3 text-center
          "
          >
           Most Trusted Crowdfunding Platform based on Nepal
          </p>
          <Button className="text-black border-2 border-black bg-white mb-3 hover:text-white hover:bg-Primary hover:border-Primary">
            Talk to Support
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:mx-32 mx-10 bg-white dark:bg-zinc-800 rounded-md shadow-lg">
        <div className="bg-Secondary dark:bg-zinc-600 md:w-[40%] flex flex-col px-16 py-10">
          <div className="mb-6">
            <h1 className=" text-3xl font-semibold tracking-widest">
              Contact Us
            </h1>
            <p className="text-2xl mt-4 font-medium">Now</p>
            <p className="text-xl my-4">Easy & Fast </p>
          </div>
          <div className="">
            <Image
              src="/contact/contact.jpg"
              alt="Customer Relation"
              width={900}
              height={900}
              className=" w-full border-2 border-black object-cover rounded-full"
            />
          </div>
        </div>
        <div className="md:w-[60%] px-10 py-8">
          <div className="opacity-50 dark:opacity-100">
            <h1 className="uppercase text-3xl ">Let&apos;s Talk</h1>
            <p className="pb-2 text-lg mt-2"> Send Your Enquiry Now</p>
            <div className="mb-2 border border-black dark:border-zinc-50 w-1/4"></div>
          </div>
          <div className="">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="">
                <div className=" grid grid-cols-1">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <>
                        <div className="">
                          <FormItem className="flex my-5 flex-col">
                            <FormLabel className="pr-5"> Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter Your Full Name"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                          <div>
                            <FormMessage className="mt-1 flex justify-center" />
                          </div>
                        </div>
                      </>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <>
                        <div className="">
                          <FormItem className="flex my-5 flex-col">
                            <FormLabel className="pr-5"> Email</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter Your Email"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                          <div>
                            <FormMessage className="mt-2 flex justify-center" />
                          </div>
                        </div>
                      </>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <>
                        <div className="">
                          <FormItem className="flex my-5 flex-col">
                            <FormLabel className="pr-5"> Phone</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter Your Phone Number"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                          <div>
                            <FormMessage className="mt-2 flex justify-center" />
                          </div>
                        </div>
                      </>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <>
                        <div className="">
                          <FormItem className="flex my-5 flex-col">
                            <FormLabel className="pr-5"> Message</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Enter Your Message"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                          <div>
                            <FormMessage className="mt-2 flex justify-center" />
                          </div>
                        </div>
                      </>
                    )}
                  />
                </div>
                <div className="lg:relative">
                  <Button
                    type="submit"
                    variant={"default_outline"}
                    
                  >
                    Send Enquiry
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
