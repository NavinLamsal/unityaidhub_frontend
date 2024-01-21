'use client'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createPostvalidation } from "@/lib/Validation/StartacampaingValidation";
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

import { Check, ChevronsUpDown } from "lucide-react";
import CustomFileSelector from "@/components/CampaignForm/CustomFileSelector";
import Image from "next/image";
import { useState } from "react";

function CampaignForm({ countries }: { countries: string[] }) {


    const { categories } = data
    const [currentStep, setCurrentStep] = useState(1)
    const [images, setImages] = useState<File[]>([]);
    const [uploading, setUploading] = useState(false);
    const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            //convert `FileList` to `File[]`
            const _files = Array.from(e.target.files);
            setImages(_files);
        }
    };

    const form = useForm<z.infer<typeof createPostvalidation>>({
        resolver: zodResolver(createPostvalidation),
    });

    async function onSubmit(formData: z.infer<typeof createPostvalidation>) {

        console.log(formData)
    }

    async function Handlenext(fieldsToValidate: string[]) {

        fieldsToValidate.forEach(fieldName => {
            form.trigger(fieldName as keyof z.infer<typeof createPostvalidation>);
        });


        const hasErrors = fieldsToValidate.some(fieldName => form.formState.errors[fieldName as keyof z.infer<typeof createPostvalidation>] !== undefined);
        console.log(hasErrors)

        // If there are no errors, increment to the next step
        if (!hasErrors && currentStep < 4) {
            setCurrentStep(currentStep + 1);
        }
    }

    async function Handleprev() {

        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
        }

    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="h-full grid w-full">
                {currentStep === 1 &&
                    <div className="flex flex-col md:h-full md:justify-start justify-center pt-10 gap-5 items-center">
                        <ScrollArea className="px-4 md:h-[80%] md:place-self-start  max-w-lg">
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg">Select a Category</FormLabel>
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
                                        <FormDescription className="text-sm">
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
                                    <FormItem className="flex flex-col">
                                        <FormLabel className="text-lg">Country</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild className="w-full max-w-lg">
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
                                        <FormDescription className="text-sm">
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
                                    <FormItem className="flex flex-col">
                                        <FormLabel className="text-lg">Target Funding</FormLabel>
                                        <Input type="text" {...field} />
                                        <FormDescription className="text-sm">

                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <ScrollBar orientation="vertical" />
                        </ScrollArea>
                        <div className="md:pb-14 pb-2 px-4 pt-2 md:h-[20%] w-full border-t-2 border-Primary dark:border-zinc-50  bg-white dark:bg-zinc-950 rounded-t-3xl">
                            <div className="flex w-full justify-end mb-2 mt-2 md:mb-5">
                                {/* <Button variant="outline" onClick={Handleprev}>Previous</Button> */}
                                <Button variant="default_outline" onClick={() => Handlenext(['category', 'country', 'target_fund'])} >Next</Button>
                            </div>
                        </div>
                    </div>
                }
                {currentStep === 2 &&
                    <div className="flex flex-col md:h-full md:justify-start justify-center pt-10 gap-5 items-center">
                        <ScrollArea className="h-[80%] w-full px-4 md:place-self-start ">
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
                            <ScrollBar orientation="vertical" />
                        </ScrollArea>
                        <div className="md:pb-14 pb-2 px-4 pt-2 md:h-[20%] w-full border-t-2 border-Primary dark:border-zinc-50  bg-white dark:bg-zinc-950 rounded-t-3xl">
                            <div className="flex w-full justify-end mb-2 mt-2 md:mb-5">
                                <Button variant="outline" onClick={Handleprev}>Previous</Button>
                                <Button variant="default_outline" onClick={() => Handlenext(['benificiary_type'])} >Next</Button>
                            </div>
                        </div>
                    </div>
                }
                {currentStep === 3 &&
                    <div className="flex flex-col md:h-full md:justify-start justify-center pt-10 gap-5 items-center">
                        <ScrollArea className="h-[80%] w-full px-4 md:place-self-start ">

                            <FormField
                                control={form.control}
                                name="postTitle"
                                render={({ field }) => (
                                    <FormItem>
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
                                    <FormItem>
                                        <FormLabel className="text-lg">Description</FormLabel>
                                        <FormDescription className="text-sm">
                                            Describe about benificiary for your campaign
                                        </FormDescription>
                                        <RichTextEditor {...field} className="bg-white dark:bg-zinc-950 rounded-md h-40" placeholder="Explain about benificiary..." />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <ScrollBar orientation="vertical" />
                        </ScrollArea>
                        <div className="md:pb-14 pb-2 px-4 pt-2 md:h-[20%] w-full border-t-2 border-Primary dark:border-zinc-50  bg-white dark:bg-zinc-950 rounded-t-3xl">
                            <div className="flex w-full justify-end mb-2 mt-2 md:mb-5">
                                <Button variant="outline" onClick={Handleprev}>Previous</Button>
                                <Button variant="default_outline" onClick={() => Handlenext(['postTitle', 'postDescription'])} >Next</Button>
                            </div>
                        </div>
                    </div>

                }
                {currentStep === 4 &&
                    <div className="flex flex-col md:h-full md:justify-start justify-center pt-10 gap-5 items-center">
                        <ScrollArea className="h-[80%] w-full px-4 md:place-self-start ">
                            <FormField
                                control={form.control}
                                name="document"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg">Upload the Documents</FormLabel>
                                        <FormDescription className="text-sm">
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
                            <ScrollBar orientation="vertical" />
                        </ScrollArea>
                        <div className="md:pb-14 pb-2 px-4 pt-2 md:h-[20%] w-full border-t-2 border-Primary dark:border-zinc-50  bg-white dark:bg-zinc-950 rounded-t-3xl">
                            <div className="flex w-full justify-end mb-2 mt-2 md:mb-5">
                                <Button variant="outline" onClick={Handleprev}>Previous</Button>
                                <Button variant="default_outline" type="submit" >Submit</Button>
                            </div>
                        </div>
                    </div>
                }

            </form>
        </Form>
    )
}

export default CampaignForm
