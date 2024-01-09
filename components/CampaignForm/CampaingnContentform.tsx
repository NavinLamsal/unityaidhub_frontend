"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import RichTextEditor from "../RichTextEditor/Richtexteditor";


const formSchema = z.object({
 postTitle: z.string({
  required_error: "Invalid Fund.",
}),
postDescription:z.string({
  required_error: "Invalid Fund.",
})
 
});

const CampaingnContentform = () => {


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

 

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
   
  }
  return (
    <div className="max-w-lg ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="postTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Title for The Campaing</FormLabel>
                <Input type="text" {...field}/>
                <FormDescription className="text-sm">
                  Choose a suitable Title for your campaign
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="postDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Description</FormLabel>
                <FormDescription className="text-sm">
                  Describe about benificiary for your campaign
                </FormDescription>
                <RichTextEditor {...field} className="bg-white dark:bg-zinc-950 rounded-md h-40" placeholder="Explain about benificiary..."/>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default CampaingnContentform;
