import React from 'react'
import { toast } from '../ui/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const ContactForm = () => {
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
        const form = useForm<z.infer<typeof FormSchema>>({
          resolver: zodResolver(FormSchema),
          defaultValues: {
            name: "John Doe",
            email: "john.doe@example.com",
            phoneNumber: "1234567890",
            message: "This is a sample message.",
          },
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
                              <Input
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
                    className="mt-5 bg-secondary lg:absolute lg:right-0"
                  >
                    Send Enquiry
                  </Button>
                </div>
              </form>
            </Form>
          </div>
  )
}

export default ContactForm
