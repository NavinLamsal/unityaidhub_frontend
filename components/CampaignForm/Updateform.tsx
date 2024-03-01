'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from "next/image";

import { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { createPostvalidation } from '@/lib/Validation/StartacampaingValidation'


import data from "@/db.json"

import { cn } from "@/lib/utils"

import RichTextEditor from "@/components/RichTextEditor/Richtexteditor";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { RadioGroup, RadioGroupItem } from "@/components/ui/card-radio-group";

import { Check, CheckCircle2, CheckIcon, ChevronsUpDown } from "lucide-react";
import CustomFileSelector from "@/components/CampaignForm/CustomFileSelector";
import { Checkbox } from '../ui/checkbox';
import { CurrencyInput } from '../ui/currencyInput';
import { CreatePostAction } from '../../lib/action/createPostAction';
import { useSession } from 'next-auth/react';
import { Textarea } from '../ui/textarea';


type Inputs = z.infer<typeof createPostvalidation>



export default function PostForm({ countries, ngos }: { countries: string[], ngos: { id: string; name: string; }[] }) {
    const { categories } = data
    const [previousStep, setPreviousStep] = useState(0)
    const [currentStep, setCurrentStep] = useState(0)
    const [images, setImages] = useState<File[]>([]);
    const [submittedSteps, setSubmittedSteps] = useState<number[]>([]);
    const delta = currentStep - previousStep
    const { data: session } = useSession();

    const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            //convert `FileList` to `File[]`
            const _files = Array.from(e.target.files);
            setImages(_files);
        }
    };

    const form = useForm<Inputs>({
        resolver: zodResolver(createPostvalidation),
    });

    const processForm: SubmitHandler<Inputs> = async (data) => {
        const startDate = new Date();
        const formData = new FormData();
        formData.append("title", data.postTitle)
        formData.append("description", data.postDescription)
        formData.append("startDate", startDate.toISOString())
        formData.append("endDate", startDate.toISOString())
        formData.append("goalAmount", data.target_fund)
        formData.append("status", "NOTVERIFIED")
        formData.append("postType", data.post_type)
        formData.append("categoryId", data.category)
        formData.append("userId", parseInt("9").toString())
        { data.benificiary_type === "Someone Else" && data.benificiaryEmail && formData.append("userid", data.benificiaryEmail) }
        { data.benificiary_type === "NGO" && data.benificiaryNGO && formData.append("userid", data.benificiaryNGO) }
        {
            data.benificiary_type === "myself" ?? formData.append("userid", data.benificiary_type)
        }
        formData.append("country", data.country)
        { data.document && formData.append("image", data.document) }
        // await CreatePostAction(formData)

        const body = {
            "title": formData.get("title"),
            "description": formData.get("description"),
            "startDate": "2024-02-29T01:52:26.882Z",
            "endDate": "2024-02-29T01:52:26.882Z",
            "goalAmount": 78939,
            "currentAmount": 0,
            // "image": [
            //   "string"
            // ],
            // "view": 0,
            "status": "NOTVERIFIED",
            "postType": "BASIC",
            // "postUpdates": "",
            "categoryId": 1,
            "userId": 1
        }

        const jsonBody = Object.fromEntries(Array.from(formData.entries()));
        if (session?.accessToken) {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post`, {
                    method: "POST",
                    body: JSON.stringify(body),
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${session.accessToken}`
                    },
                })
                console.log("post createion ", res)
            } catch (error) {
                console.log(error)
            }

        } else {
            console.log("error trying posting")
        }


        form.reset()
    }
    return (
        <section className='inset-0 flex flex-col md:p-24 md:px-4'>
            {/* Form */}
            <Form {...form} >
                <form className=' px-4 mt-5 py-4 md:py-0 md:mt-0  md:mx-auto' onSubmit={form.handleSubmit(processForm)}>
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem className='flex flex-col gap-2 mb-3'>
                                    <FormLabel>Select a Category</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Choose Category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent side='bottom' className='max-h-48'>
                                            {categories.map((cat) => (
                                                <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                                            ))}

                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Choose a suitable category for your campaign
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="country"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2 mb-3">
                                    <FormLabel >Country</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild className="w-full ">
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className={cn(
                                                        "justify-between w-full border-zinc-950 dark:border-zinc-50",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value
                                                        ? countries?.find(
                                                            (co: any) => co === field.value
                                                        )
                                                        : "Select Country"}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent align='end' className="p-1 w-full max-h-60">
                                            <ScrollArea className=" max-h-56 ">
                                                <Command >
                                                    <CommandInput placeholder="Select Country" />
                                                    <CommandEmpty>Country not found.</CommandEmpty>
                                                    <CommandGroup>
                                                        {countries?.map((co: any) => (
                                                            <CommandItem
                                                                value={co}
                                                                key={co}
                                                                onSelect={() => {
                                                                    form.setValue("country", co)
                                                                }}
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        co === field.value
                                                                            ? "opacity-100"
                                                                            : "opacity-0"
                                                                    )}
                                                                />
                                                                {co}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </Command>

                                            </ScrollArea>
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription >
                                        This country will be used to dispaly where benificiary belongs to
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="target_fund"
                            defaultValue={'0'}
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2 mb-3">
                                    <FormLabel >Target Funding</FormLabel>

                                    <CurrencyInput
                                        {...field}
                                        currencyCode="NPR"
                                        onInputChange={(value) => form.setValue('target_fund', value)}
                                    />

                                    {/* <Input type="text" {...field} /> */}
                                    <FormDescription >
                                        How much do you expect to raise
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="post_type"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2 mb-3">
                                    <FormLabel >Post Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Post Type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent side='bottom' className='max-h-48'>
                                            <SelectItem value={"BASIC"}>Basic</SelectItem>
                                            <SelectItem value={"URGENT"}>Urgent</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormDescription >
                                        Determine the type for your Campaign
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    <FormField
                        control={form.control}
                        name="benificiary_type"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel className=''>Benificiary</FormLabel>
                                <FormDescription className=''>
                                    Choose a benificiary for your campaign
                                </FormDescription>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-col space-y-1"
                                    >
                                        <div className={`flex items-center space-x-4 rounded-md dark:bg-zinc-900 bg-zinc-200  p-4 cursor-pointer relative ${form.watch("benificiary_type") === "myself" ? 'border-0' : 'border'} `}>
                                            <FormItem className=" flex flex-1 space-x-3 space-y-1 ">
                                                <div className="flex-1 space-y-1 items-center">
                                                    <div>
                                                        <FormLabel className="text-sm font-medium leading-none">
                                                            {"Myself"}
                                                        </FormLabel>
                                                        <FormControl>
                                                            <RadioGroupItem value="myself" id="option-one" className=" absolute top-0 left-0 w-full h-full rounded-md" />
                                                        </FormControl>
                                                    </div>
                                                    <FormDescription className="text-xs">
                                                        You will be receviving funds to your Bank account
                                                        from the campaign
                                                    </FormDescription>
                                                </div>
                                            </FormItem>
                                        </div>
                                        <div className={`flex items-center space-x-4 rounded-md dark:bg-zinc-900 bg-zinc-200  p-4 cursor-pointer relative ${form.watch("benificiary_type") === "Someone Else" ? 'border-0' : 'border'} `}>
                                            <FormItem className=" flex flex-1 space-x-3 space-y-1 ">
                                                <div className="flex-1 space-y-1 items-center">
                                                    <div>
                                                        <FormLabel className="text-sm font-medium leading-none">
                                                            {"Someone Else"}
                                                        </FormLabel>
                                                        <FormControl>
                                                            <RadioGroupItem value="Someone Else" id="option-two" className=" absolute top-0 left-0 w-full h-full rounded-md" />
                                                        </FormControl>
                                                    </div>
                                                    <FormDescription className="text-xs">
                                                        Benificiary will be receviving funds to their Bank account
                                                        from the campaign
                                                    </FormDescription>
                                                </div>
                                            </FormItem>
                                        </div>
                                        {form.watch("benificiary_type") === "Someone Else" &&
                                            <FormField
                                                control={form.control}
                                                name="benificiaryEmail"
                                                render={({ field }) => (
                                                    <FormItem className='flex flex-col gap-2 mb-3'>
                                                        <FormLabel className="text-lg">Benificiary Email</FormLabel>
                                                        <Input type="email" {...field} />
                                                        <FormDescription className="text-sm">
                                                            Provide the benificiary valid email.
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        }
                                        <div className={`flex items-center space-x-4 rounded-md dark:bg-zinc-900 bg-zinc-200  p-4 cursor-pointer relative ${form.watch("benificiary_type") === "NGO" ? 'border-0' : 'border'} `}>
                                            <FormItem className=" flex flex-1 space-x-3 space-y-1 ">
                                                <div className="flex-1 space-y-1 items-center">
                                                    <div>
                                                        <FormLabel className="text-sm font-medium leading-none">
                                                            {"Registered Non Profit Organizations"}
                                                        </FormLabel>
                                                        <FormControl>
                                                            <RadioGroupItem value="NGO" id="option-two" className=" absolute top-0 left-0 w-full h-full rounded-md" />
                                                        </FormControl>
                                                    </div>
                                                    <FormDescription className="text-xs">
                                                        Organizations will be receviving funds to their Bank account
                                                        from the campaign
                                                    </FormDescription>
                                                </div>
                                            </FormItem>
                                        </div>
                                        {form.watch("benificiary_type") === "NGO" &&
                                            <FormField
                                                control={form.control}
                                                name="benificiaryNGO"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-col gap-2 mb-3">
                                                        <FormLabel >Select your NGOS</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select NGO" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent side='bottom' className='max-h-48'>
                                                                {ngos?.map((co: any) => (
                                                                    <SelectItem
                                                                        value={co.id}
                                                                        key={co.name}
                                                                    >
                                                                        {co.name}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                        <FormDescription >
                                                            Funds will be transfered directly to NGO
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        }
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="postTitle"
                        render={({ field }) => (
                            <FormItem className='flex flex-col gap-2 mb-3'>
                                <FormLabel className="text-lg">Title for The Campaing</FormLabel>
                                <Input type="text" {...field} />
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
                            <FormItem className='flex flex-col gap-2 mb-3'>
                                <FormLabel className="text-lg">Description</FormLabel>
                                <FormDescription className="text-sm">
                                    Describe about benificiary for your campaign
                                </FormDescription>
                                <Textarea
                                    cols={25}
                                    {...field} className="bg-white dark:bg-zinc-950 rounded-md w-96 " placeholder="Explain about benificiary..."
                                />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="document"
                        render={({ field }) => (
                            <FormItem className='flex flex-col gap-2 mb-3 '>
                                <FormLabel className="">Upload the Documents</FormLabel>
                                <FormDescription className="">
                                    Choose a suitable Title for your campaign
                                </FormDescription>
                                <CustomFileSelector accept="image/png, image/jpeg" onChange={handleFileSelected} />
                                <Button type="submit" >Upload</Button>
                                <FormMessage />
                                <div className="grid grid-cols-12 gap-2 my-2">
                                    {images.map((image) => {
                                        const src = URL.createObjectURL(image);
                                        return (
                                            <div className="relative aspect-video md:col-span-6 col-span-12" key={image.name}>
                                                <Image src={src} alt={image.name} className="object-fit h-60 w-auto mx-auto" height={500} width={500} quality={100} />
                                            </div>
                                        );
                                    })}
                                </div>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="document"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center gap-2 mb-3">
                                <Checkbox />
                                <FormLabel >I hereby agrees all the terms and Conditions</FormLabel>
                                <FormDescription >
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type='submit'>Submit</Button> 
                </form>
            </Form>
        </section>
    )
}