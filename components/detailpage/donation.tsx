'use client'
import React from 'react'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { CurrencyInput } from '../ui/currencyInput'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Donationvalidation } from '@/lib/Validation/donation'
import { z } from 'zod'
import { Button } from '../ui/button'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'

const Donation = () => {
    const form = useForm<z.infer<typeof Donationvalidation>>({
        mode: "onBlur",
        resolver: zodResolver(Donationvalidation)
    })

    async function onSubmit(values: z.infer<typeof Donationvalidation>) {
        console.log(values)
    }

    return (
        <div className='mt-10 w-3/5 place-self-center '>
            <h1> You are Supporting Title</h1>
            <p>Your donation will benefit benificiary name </p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
                    <FormField
                        control={form.control}
                        name="Donation_amount"
                        defaultValue={'0'}
                        render={({ field }) => (
                            <FormItem className="flex flex-col gap-2 mb-3">
                                <FormLabel >Enter your donation Amount</FormLabel>

                                <CurrencyInput
                                    {...field}
                                    currencyCode="NPR"
                                    onInputChange={(value) => form.setValue("Donation_amount", value)}
                                />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="Tips_amount"
                        defaultValue={'0'}
                        render={({ field }) => (
                            <FormItem className="flex flex-col gap-2 mb-3">
                                <FormLabel >Tips for Unity Aid HUb</FormLabel>

                                <CurrencyInput
                                    {...field}
                                    currencyCode="NPR"
                                    onInputChange={(value) => form.setValue("Tips_amount", value)}
                                />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="paymentMethod"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel className=''>Payment Methods</FormLabel>
                                <FormDescription className=''>
                                    Choose a Payment method for your Donation
                                </FormDescription>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-col space-y-1"
                                    >
                                        <div className=' flex flex-row justify-evenly'>

                                       
                                        <div className={`flex items-center space-x-4 rounded-md dark:bg-zinc-900 bg-zinc-200  p-4 cursor-pointer relative ${form.watch("paymentMethod") === "myself" ? 'border-0' : 'border'} `}>
                                            <FormItem className=" flex flex-1 space-x-3 space-y-1 ">
                                                <div className="flex-1 space-y-1 items-center">
                                                    <div>
                                                        <FormLabel className="text-sm font-medium leading-none">
                                                            Esewa
                                                        </FormLabel>
                                                        <FormControl>
                                                            <RadioGroupItem value="myself" id="option-one" className=" absolute top-0 left-0 w-full h-full rounded-md" />
                                                        </FormControl>
                                                    </div>
                                                    <FormDescription className="text-xs">
                                                        Esewa
                                                    </FormDescription>
                                                </div>
                                            </FormItem>
                                        </div>
                                        <div className={`flex items-center space-x-4 rounded-md dark:bg-zinc-900 bg-zinc-200  p-4 cursor-pointer relative ${form.watch("paymentMethod") === "Someone Else" ? 'border-0' : 'border'} `}>
                                            <FormItem className=" flex flex-1 space-x-3 space-y-1 ">
                                                <div className="flex-1 space-y-1 items-center">
                                                    <div>
                                                        <FormLabel className="text-sm font-medium leading-none">
                                                          Khalti
                                                        </FormLabel>
                                                        <FormControl>
                                                            <RadioGroupItem value="Someone Else" id="option-two" className=" absolute top-0 left-0 w-full h-full rounded-md" />
                                                        </FormControl>
                                                    </div>
                                                    <FormDescription className="text-xs">
                                                        Khalti
                                                    </FormDescription>
                                                </div>
                                            </FormItem>
                                        </div>
                                        <div className={`flex items-center space-x-4 rounded-md dark:bg-zinc-900 bg-zinc-200  p-4 cursor-pointer relative ${form.watch("paymentMethod") === "NGO" ? 'border-0' : 'border'} `}>
                                            <FormItem className=" flex flex-1 space-x-3 space-y-1 ">
                                                <div className="flex-1 space-y-1 items-center">
                                                    <div>
                                                        <FormLabel className="text-sm font-medium leading-none">
                                                            Card
                                                        </FormLabel>
                                                        <FormControl>
                                                            <RadioGroupItem value="NGO" id="option-two" className=" absolute top-0 left-0 w-full h-full rounded-md" />
                                                        </FormControl>
                                                    </div>
                                                    <FormDescription className="text-xs">
                                                        Card
                                                    </FormDescription>
                                                </div>
                                            </FormItem>
                                        </div>
                                        </div>


                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button variant="default_outline" type="submit">Proceed</Button>

                </form>


            </Form>


        </div>
    )
}

export default Donation
