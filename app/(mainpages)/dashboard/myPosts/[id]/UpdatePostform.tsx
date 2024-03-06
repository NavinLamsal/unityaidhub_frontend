'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from "next/image";

import { set, z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { createPostvalidation } from '@/lib/Validation/StartacampaingValidation'


import data from "@/db.json"

import { cn } from "@/lib/utils"

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
import { Checkbox } from '../../../../../components/ui/checkbox';
import { CurrencyInput } from '../../../../../components/ui/currencyInput';
import { useSession } from 'next-auth/react';
import { Textarea } from '../../../../../components/ui/textarea';
import { Posts } from '@/lib/types/Posts';
import { UpdatePostvalidation } from '@/lib/Validation/UpdatePostValidation';
import { Category } from '@/lib/types/Category';
import { UpdatePost } from '@/lib/action/UpdatePost';
// import { uploadCloudinary } from '@/lib/action/CloudinaryUpload';


type Inputs = z.infer<typeof UpdatePostvalidation>

const fetchCountries = async (): Promise<string[]> => {
    try {
        const response = await fetch("https://restcountries.com/v3.1/all?fields=name", {
            method: 'GET',
            redirect: 'follow'
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();

        return result.map((country: any) => country?.name?.common);
    } catch (error) {
        console.error('Error fetching countries:', error);
        return [] as string[];
    }
};

const ngos = [
    {
        id: "1",
        name: "NGO 1"
    },
    {
        id: "2",
        name: "NGO 2"
    }, {
        id: "3",
        name: "NGO 3"
    }, {
        id: "4",
        name: "NGO 4"
    }, {
        id: "5",
        name: "NGO 5"
    }, {
        id: "6",
        name: "NGO 6"
    }, {
        id: "7",
        name: "NGO 7"
    },

]

interface linksarr {
   
    url: string;
}

// export default function UpdatePostForm({ countries, ngos }: { countries: string[], ngos: { id: string; name: string; }[] }) {
export default function UpdatePostForm({ post, category }: { post: Posts, category:Category[] }) {
    
    const [images, setImages] = useState<File[]>([]);
    const [documents, setdocuments] = useState<File[]>([]);
    const [imageLinks, setImageLinks] = useState<linksarr[]>([]);
    const [documentsLinks, setdocumentsLinks] = useState<linksarr[]>([]);
    const { data: session } = useSession();
    const [countries, setCountries] = useState<string[]>([])

    const defaultValues: Partial<Inputs> = {
        userId:post.User.id,
        postId:post.id,
        category: post.categoryId.toString(),
        country: post.country,
        target_fund: post.goalAmount,
        post_type: post.postType,
        //   benificiary_type:post.
        postTitle: post.title,
        postDescription: post.description,
        document: post.documents,
        Image: post.image
    }

    const uploadCloudinary = async (
        file: File
      ): Promise<{url: string }> => {
          console.log("inside uploading function")
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "avelf4lq");
        const response:any = await fetch(
          "https://api.cloudinary.com/v1_1/dsrapcvkq/image/upload",
          { method: "POST", body: formData }
        );
        
        const data = await response.json();
        const imgUrl = await data.secure_url;
        console.log("img url: ", imgUrl);
        return {url: data?.secure_url };
    };
      


    

    // imagess 
    const handleImageFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            //convert `FileList` to `File[]`
            const _files = Array.from(e.target.files);
            console.log("files from images", _files)
            setImages(_files);
        }
    };
     // images 
     const handleImageUploading = async () => {
        console.log("handling images")
        try {
            console.log("handling images try")
            let arr = []
            for (let i = 0; i < images.length; i++) {
                
                console.log("type of images", typeof images[i]);
                
                const data = await uploadCloudinary(images[i])
                arr.push(data)
            }
           setImageLinks(arr);
        } catch (error) {
            console.log(error);
        }
    }



    const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            //convert `FileList` to `File[]`
            const _files = Array.from(e.target.files);
            setdocuments(_files);
        }
    };

    const handleDocumentUploading = async () => {
        console.log("handling documents")
        try {
            console.log("inside try")
            let arr = []
            for (let i = 0; i < documents.length; i++) {
                const data = await uploadCloudinary(documents[i])
                arr.push(data)
            }
            setdocumentsLinks(arr)
        } catch (error) {
            console.log(error);
        }
    }
   

    const form = useForm<Inputs>({
        resolver: zodResolver(UpdatePostvalidation),
        defaultValues
    });

    const processForm: SubmitHandler<Inputs> = async (data) => {

        await UpdatePost(data, imageLinks, documentsLinks)

        form.reset()
    }

    useEffect(() => {
         handleImageUploading();
        
      }, [images]);

    useEffect(() => {
         handleDocumentUploading();
      }, [documents]);

    useEffect(() => {
        const fetchcountry = async () => {
            try {
                const countries: string[] = await fetchCountries();
                setCountries(countries); // You can use the fetched countries here

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchcountry();
        // console.log("user Id", userId)
    }, []);




    return (
        <Form {...form} >
            <form className='max-w-2xl' onSubmit={form.handleSubmit(processForm)}>
            <input type="hidden" {...form.register('userId')} value={post.User.id} />
            <input type="hidden" {...form.register('postId')} value={post.id} />
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
                                {...field} className="bg-white dark:bg-zinc-950 rounded-md w-full " placeholder="Explain about benificiary..."
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className='grid md:grid-cols-2 gap-4'>
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
                                        {category.map((cat) => (
                                            <SelectItem key={cat.id} value={cat.id.toString()}>{cat.name}</SelectItem>
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
                </div>
                <div className='grid md:grid-cols-2 gap-4'>
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
                </div>

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
                                    className="grid md:grid-cols-3 gap-2 space-y-1"
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

                {form.watch("benificiary_type") === "Someone Else" &&
                    <FormField
                        control={form.control}
                        name="benificiaryEmail"
                        render={({ field }) => (
                            <FormItem className='flex flex-col gap-2 mb-3 mt-6'>
                                <FormLabel className="text-sm">Benificiary Email</FormLabel>
                                <Input type="email" {...field} />
                                <FormDescription className="text-sm">
                                    Provide the benificiary valid email.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                }
                {form.watch("benificiary_type") === "NGO" &&
                    <FormField
                        control={form.control}
                        name="benificiaryNGO"
                        render={({ field }) => (
                            <FormItem className="flex flex-col gap-2 mb-3 my-5">
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
                <div className='grid md:grid-cols-2 gap-5 mt-10'>
                    <FormField
                        control={form.control}
                        name="Image"
                        render={({ field }) => (
                            <FormItem className='flex flex-col gap-2 mb-3 '>
                                <FormLabel className="">Upload the Images</FormLabel>
                                <FormDescription className="">
                                    Upload the supporting Images for the Post
                                </FormDescription>
                                <div className="flex flex-1 justify-between">
                                    <CustomFileSelector accept="image/png, image/jpeg" onChange={handleImageFileSelected} />
                                    <Button type="button" onClick={() => handleImageUploading()} >Upload</Button>
                                </div>
                                <FormMessage />
                                <div className="grid grid-cols-12 gap-2 my-2 md:hidden">
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
                            <FormItem className='flex flex-col gap-2 mb-3 '>
                                <FormLabel className="">Upload the Documents</FormLabel>
                                <FormDescription className="">
                                    Upload the supporting documents images for the Post
                                </FormDescription>
                                <div className='flex flex-1 justify-between'>
                                    <CustomFileSelector accept="image/png, image/jpeg" onChange={handleFileSelected} />
                                    <Button type="button" onClick={() => handleDocumentUploading()} >Upload</Button>
                                </div>
                                <FormMessage />
                                <div className="grid grid-cols-12 gap-2 my-2">
                                    {documents.map((image) => {
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
                    <div>
                        <div className="md:grid-cols-12 gap-2 my-2 hidden md:grid">
                            {images.map((image) => {
                                const src = URL.createObjectURL(image);
                                return (
                                    <div className="relative aspect-video md:col-span-6 col-span-12" key={image.name}>
                                        <Image src={src} alt={image.name} className="object-fit h-60 w-auto mx-auto" height={500} width={500} quality={100} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>


                </div>

                
                <Button type='submit'>Update</Button>
            </form>
        </Form>

    )
}