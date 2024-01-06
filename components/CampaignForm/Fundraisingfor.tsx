"use client";
import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "../ui/card-radio-group";


const formSchema = z.object({
  benificiary_type: z.string({
    required_error: "Please select a benificiary.",
  }),
  // country: z.string({
  //   required_error: "Please select a country.",
  // }),
});

const Fundraisingfor = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // defaultValues: {
    //   benificiary_type: "",
    // },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="w-full max-w-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="benificiary_type"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-2xl">Benificiary</FormLabel>
                <FormDescription className="text-base">
                  Choose a benificiary for your campaign
                </FormDescription>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <div className={`flex items-center space-x-4 rounded-md dark:bg-zinc-900 bg-zinc-200  p-4 cursor-pointer relative ${form.watch("benificiary_type") === "myself"?'border-0':'border' } `}>
                      <FormItem className=" flex flex-1 space-x-3 space-y-1 ">
                        <div className="flex-1 space-y-1 items-center">
                          <div>
                            <FormLabel className="text-sm font-medium leading-none">
                              {"Myself"}
                            </FormLabel>
                            <FormControl>
                             <RadioGroupItem value="myself" id="option-one" className=" absolute top-0 left-0 w-full h-full rounded-md"/>   
                            </FormControl>
                          </div>
                          <FormDescription className="text-xs">
                            You will be receviving funds to your Bank account
                            from the campaign
                          </FormDescription>
                        </div>
                      </FormItem>
                    </div>
                    <div className={`flex items-center space-x-4 rounded-md dark:bg-zinc-900 bg-zinc-200  p-4 cursor-pointer relative ${form.watch("benificiary_type") === "Someone Else"?'border-0':'border' } `}>
                      <FormItem className=" flex flex-1 space-x-3 space-y-1 ">
                        <div className="flex-1 space-y-1 items-center">
                          <div>
                            <FormLabel className="text-sm font-medium leading-none">
                              {"Someone Else"}
                            </FormLabel>
                            <FormControl>
                             <RadioGroupItem value="Someone Else" id="option-two" className=" absolute top-0 left-0 w-full h-full rounded-md"/>   
                            </FormControl>
                          </div>
                          <FormDescription className="text-xs">
                            Benificiary will be receviving funds to their Bank account
                            from the campaign
                          </FormDescription>
                        </div>
                      </FormItem>
                    </div>
                    <div className={`flex items-center space-x-4 rounded-md dark:bg-zinc-900 bg-zinc-200  p-4 cursor-pointer relative ${form.watch("benificiary_type") === "NGO"?'border-0':'border' } `}>
                      <FormItem className=" flex flex-1 space-x-3 space-y-1 ">
                        <div className="flex-1 space-y-1 items-center">
                          <div>
                            <FormLabel className="text-sm font-medium leading-none">
                              {"Registered Non Profit Organizations"}
                            </FormLabel>
                            <FormControl>
                             <RadioGroupItem value="NGO" id="option-two" className=" absolute top-0 left-0 w-full h-full rounded-md"/>   
                            </FormControl>
                          </div>
                          <FormDescription className="text-xs">
                            Organizations will be receviving funds to their Bank account
                            from the campaign
                          </FormDescription>
                        </div>
                      </FormItem>
                    </div>

                  
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Next</Button>
        </form>
      </Form>
    </div>
  );
};

export default Fundraisingfor;
