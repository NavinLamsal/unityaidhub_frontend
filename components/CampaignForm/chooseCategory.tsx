'use client'
import React from "react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod"
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import data from "@/db.json"

const formSchema = z.object({
    category: z.string({
      required_error: "Please select an email to display.",
    })
  })

const ChooseCategory = () => {
    const {categories}= data


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          category: "",
        },
      })

      function onSubmit(values: z.infer<typeof formSchema>) {
     
        console.log(values)
      }

  return (
    <div className="w-full max-w-lg">
          <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-2xl">Select a Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Choose Category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                {categories.map((cat)=>(
                    <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                ))}

                </SelectContent>
              </Select>
              <FormDescription className="text-base">
                Choose a suitable category for your campaign
              </FormDescription>
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

export default ChooseCategory;
