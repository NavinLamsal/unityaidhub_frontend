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


type Inputs = z.infer<typeof createPostvalidation>

const steps = [
    {
        id: '1',
        name: 'Category & Funding Details',
        fields: ['category', 'country', 'target_fund']
    },
    {
        id: '2',
        name: 'Beneficiary Information',
        fields: ['benificiary_type']
    },
    {
        id: '3',
        name: 'Campaign Details',
        fields: ['postTitle', 'postDescription', 'start_date', 'end_date']
    },
    {
        id: '4',
        name: 'Document Upload',
        fields: ['document']
    },
    { id: '5', name: 'Terms & Conditions' }
]

export default function PostForm({ countries }: { countries: string[] }) {
    const { categories } = data
    const [previousStep, setPreviousStep] = useState(0)
    const [currentStep, setCurrentStep] = useState(0)
    const [images, setImages] = useState<File[]>([]);
    const [submittedSteps, setSubmittedSteps] = useState<number[]>([]);
    const delta = currentStep - previousStep

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

    const processForm: SubmitHandler<Inputs> = data => {
        console.log(data)
        form.reset()
    }

    type FieldName = keyof Inputs

    const next = async () => {
        const fields = steps[currentStep].fields
        const output = await form.trigger(fields as FieldName[], { shouldFocus: true })

        if (!output) return

        if (currentStep < steps.length - 1) {
            if (currentStep === steps.length - 2) {
                await form.handleSubmit(processForm)()
            }
            setSubmittedSteps((prevSubmittedSteps) => [...prevSubmittedSteps, currentStep]);
            setPreviousStep(currentStep)
            setCurrentStep(step => step + 1)
        }
    }

    const prev = () => {
        if (currentStep > 0) {
            setPreviousStep(currentStep)
            setCurrentStep(step => step - 1)
        }
    }

    return (
        <section className='md:absolute inset-0 flex flex-col justify-between md:p-24 p-4'>
            {/* steps */}
            <nav aria-label='Progress'>
                <ol role='list' className='space-y-4 hidden md:flex md:space-x-8 md:space-y-0'>
                    {steps.map((step, index) => (
                        <li key={step.name} className='md:flex-1 '>
                            {currentStep > index ? (
                                <div className='group flex w-full gap-1 items-center border-Primary py-2 pl-4 transition-colors md:border-l-0 border-t-4 md:pb-0 md:pl-0 md:pt-4 '>

                                    <Check className=' h-9 w-10 border-Primary border-2 px-1.5 py-1 rounded-full text-zinc-50 bg-Primary' />


                                    <span className='text-sm font-medium'>{step.name}</span>


                                </div>
                            ) : currentStep === index ? (
                                <div
                                    className='flex w-full items-center gap-1 border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'
                                    aria-current='step'
                                >
                                    <Button variant={'outline'} className='disabled rounded-full border-Primary text-Primary dark:border-Primary hover:bg-transparent  hover:text-Primary'>
                                        {step.id}
                                    </Button>
                                    <span className='text-sm font-medium'>{step.name}</span>
                                </div>
                            ) : (
                                <div className='group flex w-full items-center gap-1 border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                                    <Button variant={'outline'} className='disabled rounded-full dark:text-zinc-50  text-zinc-950 border-zinc-950 dark:border-zinc-50 hover:bg-transparent  hover:text-Primary'>
                                        {step.id}
                                    </Button>
                                    <span className='text-sm font-medium'>{step.name}</span>
                                </div>
                            )}
                        </li>
                    ))}
                </ol>
                <div className="flex md:hidden  items-center justify-between bg-gray-200 py-4 rounded-lg">
                    {steps.map((step, index) => (
                        <div className={`${currentStep === index ? 'flex gap-2':'hidden'} w-full gap-1 items-center 
                        ${submittedSteps.includes(index)? 'border-Primary':'border-zinc-950 dark:border-zinc-50'}  py-2 pl-4 transition-colors border-b-4 pb-4 bg-zinc-800 `} key={step.id}>
                            <Button variant={'outline'} className='disabled rounded-full border-Primary text-Primary dark:border-Primary hover:bg-transparent  hover:text-Primary'>
                                {step.id} of {steps.length}
                            </Button>
                            <span className='text-sm font-medium'>{step.name}</span>
                        </div>
                    ))}
                </div>
                <hr className='md:my-8 my-2 hidden md:block' />
            </nav>

            {/* Form */}
            <Form {...form} >
                <form className='mt-5 py-4 md:py-12 max-w-lg mx-auto' onSubmit={form.handleSubmit(processForm)}>
                    {currentStep === 0 && (
                        <motion.div
                            initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            
                        >
                            <h2 className='text-base font-semibold leading-7 text-gray-900 hidden md:block'>
                                Category & Funding Details
                            </h2>
                            <p className='mt-1 text-sm leading-6 text-gray-600 hidden md:block'>
                                Choose your campaign category and other details.
                            </p>
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
                                            <SelectContent>
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
                                            <PopoverContent className="p-0 ">
                                                <ScrollArea className="h-72 ">
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
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-2 mb-3">
                                        <FormLabel >Target Funding</FormLabel>
                                        <Input type="text" {...field} />
                                        <FormDescription >
                                            How much do you expect to raise
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </motion.div>
                    )}

                    {currentStep === 1 && (
                        <motion.div
                            initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                            <h2 className='text-base font-semibold leading-7 text-gray-900 hidden md:block'>
                                Benificiary
                            </h2>
                            <p className='mt-1 text-sm leading-6 text-gray-600 hidden md:block'>
                                Please selected the correct benificiary type.
                            </p>

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


                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                        </motion.div>
                    )}
                    {currentStep === 2 && (
                        <motion.div
                            initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                            <h2 className='text-base font-semibold leading-7 text-gray-900 hidden md:block'>
                                Campaign Details
                            </h2>
                            <p className='mt-1 text-sm leading-6 text-gray-600 hidden md:block'>
                                Fill out the campaign details.
                            </p>

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
                                        <RichTextEditor {...field} className="bg-white dark:bg-zinc-950 rounded-md h-40" placeholder="Explain about benificiary..." />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                        </motion.div>
                    )}
                    {currentStep === 3 && (
                        <motion.div
                            initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                            <h2 className='text-base font-semibold leading-7 text-gray-900 hidden md:block'>
                                Documents
                            </h2>
                            <p className='mt-1 text-sm leading-6 text-gray-600 hidden md:block'>
                                Upload the Supporting documents for the campaign.
                            </p>

                            <FormField
                                control={form.control}
                                name="document"
                                render={({ field }) => (
                                    <FormItem className='flex flex-col gap-2 mb-3'>
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


                        </motion.div>
                    )}

                    {currentStep === 4 && (
                        <motion.div
                        initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        
                    >
                        <h2 className='text-base font-semibold leading-7 text-gray-900 hidden md:block'>
                            Terms and Conditions
                        </h2>
                        <p className='mt-1 text-sm leading-6 text-gray-600 hidden md:block'>
                            
                        </p>
                        <FormField
                            control={form.control}
                            name="document"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center gap-2 mb-3">
                                    <Checkbox/>
                                    <FormLabel >I hereby agrees all the terms and Conditions</FormLabel>
                                   
                                    <FormDescription >
                                       
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </motion.div>
                    )}
                    {currentStep === 4 && (
                        <>
                            <h2 className='text-base font-semibold leading-7 text-gray-900'>
                                Complete
                            </h2>
                            <p className='mt-1 text-sm leading-6 text-gray-600'>
                                Thank you for your submission.
                            </p>
                        </>
                    )}
                </form>
            </Form>

            {/* Navigation */}
            <div className='mt-8 pt-5'>
                <div className='flex justify-between'>
                    <Button
                        type='button'
                        onClick={prev}
                        disabled={currentStep === 0}

                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='h-6 w-6'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M15.75 19.5L8.25 12l7.5-7.5'
                            />
                        </svg>
                    </Button>
                    <Button
                        type='button'
                        onClick={next}
                        disabled={currentStep === steps.length - 1}

                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='h-6 w-6'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M8.25 4.5l7.5 7.5-7.5 7.5'
                            />
                        </svg>
                    </Button>
                </div>
            </div>
        </section>
    )
}