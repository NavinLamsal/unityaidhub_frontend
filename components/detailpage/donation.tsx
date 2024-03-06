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
import Image from 'next/image'
import { DonationAction } from '@/lib/action/donation'
import { signIn, useSession } from 'next-auth/react'
import { Posts } from '@/lib/types/Posts'

const Donation = ({ post, userId }: { post: Posts, userId: number }) => {
    const { data: session } = useSession()
    const form = useForm<z.infer<typeof Donationvalidation>>({
        mode: "onBlur",
        resolver: zodResolver(Donationvalidation)
    })

    async function onSubmit(values: z.infer<typeof Donationvalidation>) {
        const postid= post.id;
        await DonationAction(values, postid, userId);
    }
    
    
    if (!session) {

        return (
            <div className="grid items-center justify-center">
      <div className="">
                {/* <h1> You are Supporting {post.title}</h1> */}
                <p>Your donation will benefit benificiary name </p>

        <p className="mb-4 text-lg md:text-xl lg:text-2xl">You need to logged in to Donate.</p>
        <form action={async () => {
                await signIn();
              }} className='grid justify-center'>
                <Button type="submit" >Sign In</Button>
        </form>
      </div>
    </div>
        )
    } else {

        return (
            <div className='mt-10 w-3/5 place-self-center '>
                <div className='grid gap-5 my-4'>
                <h1> You are Supporting {post.title}</h1>
                <p>Your donation will benefit benificiary {post.User.name} </p>
                </div>
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
                                        currencyCode="USD"
                                        onInputChange={(value) => form.setValue("Donation_amount", value)}
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
                                            <div className=' flex flex-row justify-start'>


                                                {/* <div className={`flex items-center space-x-4 rounded-md dark:bg-zinc-900 bg-zinc-200  p-4 cursor-pointer relative ${form.watch("paymentMethod") === "esewa" ? 'border' : 'border-0'} `}>
                                                    <FormItem className=" flex flex-1 space-x-3 space-y-1 ">
                                                        <div className="flex-1 space-y-1 items-center">
                                                            <div>
                                                                <FormLabel className="text-sm font-medium leading-none">
                                                                    <Image src={'/payment/esewa.png'} alt='ESEWA' width={200} height={150} className='h-12' />
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <RadioGroupItem value="ESEWA" id="option-one" className=" absolute top-0 left-0 w-full h-full rounded-md" />
                                                                </FormControl>
                                                            </div>

                                                        </div>
                                                    </FormItem>
                                                </div>
                                                <div className={`flex items-center space-x-4 rounded-md dark:bg-zinc-900 bg-zinc-200  p-4 cursor-pointer relative ${form.watch("paymentMethod") === "KHALTI" ? 'border' : 'border-0'} `}>
                                                    <FormItem className=" flex flex-1 space-x-3 space-y-1 ">
                                                        <div className="flex-1 space-y-1 items-center">
                                                            <div>
                                                                <FormLabel className="text-sm font-medium leading-none">
                                                                    <Image src={'/payment/khalti.png'} alt='khalti' width={200} height={150} className='h-12' />
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <RadioGroupItem value="KHALTI" id="option-two" className=" absolute top-0 left-0 w-full h-full rounded-md" />
                                                                </FormControl>
                                                            </div>

                                                        </div>
                                                    </FormItem>
                                                </div> */}
                                                <div className={`flex items-center space-x-4 rounded-md dark:bg-zinc-900 bg-zinc-200  p-4 cursor-pointer relative ${form.watch("paymentMethod") === "STRIPE" ? 'border' : 'border-0'} `}>
                                                    <FormItem className=" flex flex-1 space-x-3 space-y-1 ">
                                                        <div className="flex-1 space-y-1 items-center">
                                                            <div>
                                                                <FormLabel className="text-sm font-medium leading-none">
                                                                    <Image src={'/payment/stripe.png'} alt='Stripe' width={200} height={150} className='h-12' />
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <RadioGroupItem value="STRIPE" id="option-two" className=" absolute top-0 left-0 w-full h-full rounded-md" />
                                                                </FormControl>
                                                            </div>

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
}

export default Donation
