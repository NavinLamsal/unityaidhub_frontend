// 'use client'
// import React, { useEffect, useState } from "react";
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
// import { Input } from "../ui/input";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod"
// import { Button } from "../ui/button";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
// import data from "@/db.json"
// import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
// import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../ui/command";
// import { Check, ChevronsUpDown } from "lucide-react";
// import { cn } from "@/lib/utils"
// import { ScrollArea } from "../ui/scroll-area";

// const formSchema = z.object({
//     category: z.string({
//       required_error: "Please select a category.",
//     }),
//     country: z.string({
//       required_error: "Please select a country.",
//     }),
//     target_fund: z.string({
//       required_error: "Invalid Fund.",
//     })
//   })

// const ChooseCategory = () => {
//     const {categories}= data
//     const [countries , setCountries]= useState<string[]| []>()



//     const fetchCountries = async () => {
//       try {
//         const response = await fetch("https://restcountries.com/v3.1/all?fields=name", {
//           method: 'GET',
//           redirect: 'follow'
//         });
    
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
    
//         const result = await response.json();
    
//         return result.map((country:any) => country?.name?.common);
//       } catch (error) {
//         console.error('Error fetching countries:', error);
//         return [];
//       }
//     };
    
//     useEffect(() => {
//       const getCountries = async () => {
//         const countrylist = await fetchCountries();
//         setCountries(countrylist)
//         console.log("Countries:", countrylist);
//       };
    
//       getCountries();
//     }, []);
    


//     const form = useForm<z.infer<typeof formSchema>>({
//         resolver: zodResolver(formSchema),
//       })

//       function onSubmit(values: z.infer<typeof formSchema>) {
     
//         console.log(values)
//       }

//   return (
//     <div className="w-full max-w-lg">
//           <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//       <FormField
//           control={form.control}
//           name="category"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel className="text-lg">Select a Category</FormLabel>
//               <Select onValueChange={field.onChange} defaultValue={field.value}>
//                 <FormControl>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Choose Category" />
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent>
//                 {categories.map((cat)=>(
//                     <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
//                 ))}

//                 </SelectContent>
//               </Select>
//               <FormDescription className="text-sm">
//                 Choose a suitable category for your campaign
//               </FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//       <FormField
//           control={form.control}
//           name="country"
//           render={({ field }) => (
//             <FormItem className="flex flex-col">
//               <FormLabel className="text-lg">Country</FormLabel>
//               <Popover>
//                 <PopoverTrigger asChild className="w-full max-w-lg">
//                   <FormControl>
//                     <Button
//                       variant="outline"
//                       role="combobox"
//                       className={cn(
//                         "justify-between w-full",
//                         !field.value && "text-muted-foreground"
//                       )}
//                     >
//                       {field.value
//                         ? countries?.find(
//                             (co:any) => co === field.value
//                           )
//                         : "Select Country"}
//                       <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//                     </Button>
//                   </FormControl>
//                 </PopoverTrigger>
//                 <PopoverContent className="p-0 ">
//                   <ScrollArea className="h-72 ">
//                   <Command >
//                     <CommandInput placeholder="Select Country"  />
//                     <CommandEmpty>Country not found.</CommandEmpty>
//                     <CommandGroup>
//                       {countries?.map((co:any) => (
//                         <CommandItem
//                           value={co}
//                           key={co}
//                           onSelect={() => {
//                             form.setValue("country", co)
//                           }}
//                         >
//                           <Check
//                             className={cn(
//                               "mr-2 h-4 w-4",
//                               co === field.value
//                                 ? "opacity-100"
//                                 : "opacity-0"
//                             )}
//                           />
//                           {co}
//                         </CommandItem>
//                       ))}
//                     </CommandGroup>
//                   </Command>

//                   </ScrollArea>
//                 </PopoverContent>
//               </Popover>
//               <FormDescription className="text-sm">
//                 This country will be used to dispaly where benificiary belongs to
//               </FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//       <FormField
//           control={form.control}
//           name="target_fund"
//           render={({ field }) => (
//             <FormItem className="flex flex-col">
//               <FormLabel className="text-lg">Target Funding</FormLabel>
//               <Input type="text" {...field}/>
//               <FormDescription className="text-sm">
                
//               </FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//       </form>
//     </Form>
//     </div>
//   );
// };

// export default ChooseCategory;
