'use client'
import React, { useState } from "react";
import { Input } from "../ui/input";
import { PasswordInput } from "../ui/passwordInput";
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import * as z from "zod";
import { Button } from "../ui/button";

import { registervalidation } from "@/lib/Validation/RegisterValidation";
import { FaFacebookF, FaGoogle } from "react-icons/fa6";
import { motion } from "framer-motion";
import { Checkbox } from "../ui/checkbox";
import Link from "next/link";
import { RegisterAction } from "../../lib/action/registerAction";


interface IFormInput {
    name: String
    phoneNumber?: string

    address?: string


    email: string;
    password: string;
    confirmPassword: string
}

const RegisterForm = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [previousStep, setPreviousStep] = useState(0)
    const form = useForm<z.infer<typeof registervalidation>>({
        mode: "onBlur",
        resolver: zodResolver(registervalidation)
    })

    async function onSubmit(values: z.infer<typeof registervalidation>) {
        const formData = new FormData()
        formData.append("name", values.name);
        formData.append("phoneNumber", values.phoneNumber);
        formData.append("address", values.address);
        formData.append("email", values.email);
        formData.append("password", values.password);
        formData.append("profilePictureUrl", "https://cdn.pixabay.com/photo/2023/11/14/11/07/sparrow-8387465_1280.jpg")
        formData.append("roles", "USER");
        formData.append("activity", "ACTIVE")


        const res = await RegisterAction(formData);
        if (res?.error) setErrorMessage(res.error);

    }

    type FieldName = keyof z.infer<typeof registervalidation>
    const handleProceed = async () => {
        console.log("i am running insde current step 0")
        const fields = ["name", "email"]
        const output = await form.trigger(fields as FieldName[], { shouldFocus: true })

        if (!output) return

        if (currentStep === 0) {
            console.log("i am running insde current step 0")
            setPreviousStep(currentStep)
            setCurrentStep(1);
        }

    }
    const handleNext = async () => {
        const fields = ["address", 'phoneNumber']
        const output = await form.trigger(fields as FieldName[], { shouldFocus: true })

        if (!output) return

        if (currentStep === 1) {

            setPreviousStep(currentStep)
            setCurrentStep(2);
        }
    }

    function handlelastPrev(): void {
        setPreviousStep(0)
        setCurrentStep(1);
    }

    function handlePrev(): void {
        setPreviousStep(0)
        setCurrentStep(0);
    }

    return (

        <div className=" w-full">
            {currentStep === 0 &&
                <motion.div
                    initial={{ x: 0, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className=" flex flex-col gap-2">
                    <div className="grid grid-cols-2 gap-6">
                        <Button variant="outline">
                            <FaFacebookF className="mr-2 h-4 w-4" />

                            Facebook
                        </Button>
                        <Button variant="outline">
                            <FaGoogle className="mr-2 h-4 w-4" />
                            Google
                        </Button>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-darkPrimary px-2 pb-2 pt-3 text-muted-foreground text-white ">
                                Or continue with
                            </span>
                        </div>
                    </div>
                </motion.div>
            }
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
                    {currentStep === 0 &&
                        <motion.div
                            initial={{ x: 0, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                            className=" flex flex-col gap-2">
                            <FormField
                                name="name"
                                control={form.control}
                                render={({ field }) => (
                                    <>
                                        <FormItem>
                                            <FormLabel>Full name</FormLabel>
                                            <FormControl>

                                                <Input
                                                    type="text"
                                                    id="name"
                                                    placeholder="John Doe"

                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                        <FormMessage />
                                    </>
                                )}
                            />
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
                            <Button variant="default_outline" onClick={() => handleProceed()}>Proceed Signup</Button>
                        </motion.div>
                    }
                    {currentStep === 1 &&
                        <motion.div
                            initial={{ x: 0, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                            className=" flex flex-col gap-2">
                            <FormField
                                name="phoneNumber"
                                control={form.control}
                                defaultValue={''}
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
                                name="address"
                                control={form.control}
                                defaultValue={''}
                                render={({ field }) => (
                                    <>
                                        <FormItem>
                                            <FormLabel>Address</FormLabel>
                                            <FormControl>

                                                <Input
                                                    type="text"
                                                    id="address"
                                                    placeholder="Country, City"

                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                        <FormMessage />
                                    </>
                                )}
                            />
                            <div className="flex flex-1 justify-between">

                                <Button variant="default_outline" onClick={() => handlePrev()}>Prev</Button>
                                <Button variant="default_outline" onClick={() => handleNext()}>Next</Button>
                            </div>
                        </motion.div>
                    }
                    {currentStep === 2 && <motion.div
                        initial={{ x: 0, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        className=" flex flex-col gap-2"
                    >
                        <FormField
                            name="password"
                            control={form.control}

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
                        <FormField
                            name="confirmPassword"
                            control={form.control}

                            render={({ field }) => (
                                <>
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <PasswordInput
                                                id="confirmPassword"
                                                placeholder="1 Uppercase 1 charater 1 Numeric"

                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                    <FormMessage />

                                </>
                            )}
                        />
                        <FormField
                            name="termsandpolicy"
                            control={form.control}
                            defaultValue={"false"}
                            render={({ field }) => (
                                <div className="flex flex-col">
                                    <FormItem className="flex flex-1 items-center gap-2">
                                        <FormControl>
                                            <input
                                                type="checkbox"
                                                {...field}
                                                id="termsandpolicy"
                                                value={"true"}
                                                onChange={(e) => field.onChange(e.target.checked ? 'true' : 'false')}
                                                checked={field.value === 'true'} // Check if the value is 'true' string
                                            />
                                        </FormControl>
                                        <FormLabel className="flex flex-1 text-xs">i agree with &nbsp;<Link href="/user-aggrement" className="p-0 m-0 text-Primary cursor-pointer">User Agreement</Link> &nbsp;and &nbsp;<Link href="/privacy-policy" className="p-0 m-0 text-Primary cursor-pointer">Privacy policy</Link></FormLabel>
                                    </FormItem>
                                    <FormMessage />


                                </div>
                            )}
                        />

                        <div className="flex flex-1 justify-between">

                            <Button variant="default_outline" onClick={() => handlelastPrev()}>Prev</Button>
                            <Button variant="default_outline" type="submit">Create an account</Button>
                        </div>



                    </motion.div>

                    }


                </form>


            </Form>
        </div>

    );
};

export default RegisterForm;
function setErrorMessage(error: string) {
    throw new Error("Function not implemented.");
}

