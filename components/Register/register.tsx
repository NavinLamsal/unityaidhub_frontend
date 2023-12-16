"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import districtsOfProvince from "@/districtsProvince";

const zodiacSigns = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
];

const nakshatras = ["Ashwini", "Bharani", "Krittika"];

const ganas = ["Deva Gana", "Manushya Gana", "Rakshasa Gana"];

const mangalDoshas = [
  "Mars in 1st House",
  "Mars in 2nd House",
  "Mars in 3rd House",
];

const FormSchema = z.object({
  firstName: z
    .string()
    .min(2, {
      message: "First Name must be at least 2 characters.",
    })
    .refine((value) => /^\s*[A-Za-z\s]+\s*$/.test(value), {
      message: "First Name must contain only alphabetic characters.",
    }),
  lastName: z
    .string()
    .min(2, {
      message: "Last Name must be at least 2 characters.",
    })
    .refine((value) => /^\s*[A-Za-z\s]+\s*$/.test(value), {
      message: "Last Name must contain only alphabetic characters.",
    }),
  gender: z
    .string()
    .refine((value) => ["male", "female", "others"].includes(value), {
      message: "Please Select at least one.",
    }),
  date: z
    .object({
      day: z.string(),
      month: z.string(),
      year: z.string(),
    })
    .refine((date) => date.day && date.month && date.year, {
      message: "Please select a date",
    }),
  religion: z
    .string()
    .refine(
      (value) =>
        [
          "Hinduism",
          "Buddhism",
          "Christianity",
          "Islam",
          "Sikhism",
          "Judaism",
          "Others",
        ].includes(value),
      {
        message: "Please Select at least one.",
      }
    ),
  caste: z
    .string()
    .min(2, {
      message: "Caste is required",
    })
    .refine((value) => /^\s*[A-Za-z\s]+\s*$/.test(value), {
      message: "Caste must contain only alphabetic characters.",
    }),
  maritalStatus: z
    .string()
    .refine((value) => ["single", "married", "divorced"].includes(value), {
      message: "Please Select at least one.",
    }),
  number: z.string().refine((value) => /^\d{10}$/.test(value), {
    message: "Number must be exactly ten digits.",
  }),
  country: z
    .string()
    .refine(
      (value) =>
        ["Nepal", "India", "Bangladesh", "Bhutan", "others"].includes(value),
      {
        message: "Please Select at least one.",
      }
    ),
  province: z
    .string()
    .refine(
      (value) =>
        [
          "Bagmati",
          "Gandaki",
          "Madhesh",
          "Lumbini",
          "Karnali",
          "Koshi",
          "Sudurpashchim",
        ].includes(value),
      {
        message: "Please Select at least one.",
      }
    ),
  district: z.string().min(1, {
    message: "District is required.",
  }),

  town: z.string().min(1, {
    message: "Town is required.",
  }),
  ward: z.string(),
  tole: z.string(),
  education: z
    .string()
    .refine(
      (value) =>
        ["Ph.D.", "Master", "Bachelor", "Diploma", "S.L.C", "S.E.E"].includes(
          value
        ),
      {
        message: "Please Select at least one.",
      }
    ),
  university: z
    .string()
    .min(2, {
      message: "University Name must be at least 2 characters.",
    })
    .refine((value) => /^\s*[A-Za-z\s]+\s*$/.test(value), {
      message: "University Name must contain only alphabetic characters.",
    }),
  field: z
    .string()
    .min(2, {
      message: "Field must be at least 2 characters.",
    })
    .refine((value) => /^\s*[A-Za-z\s]+\s*$/.test(value), {
      message: "Field must contain only alphabetic characters.",
    }),
  occupation: z.string().refine((value) => /^\s*[A-Za-z\s]+\s*$/.test(value), {
    message: "Occupation must contain only alphabetic characters.",
  }),
  location: z.string().refine((value) => /^[A-Za-z0-9\s]+$/i.test(value), {
    message:
      "Location must contain alphabetic characters, numbers, and spaces.",
  }),
  income: z
    .string()
    .refine(
      (value) =>
        ["<50k", "50k-100k", "100k-150k", "150k-250k", ">250k"].includes(value),
      {
        message: "Please Select at least one.",
      }
    ),
  birthPlace: z
    .string()
    .min(2, {
      message: "Birth Place must be at least 2 characters.",
    })
    .refine((value) => /^\s*[A-Za-z\s]+\s*$/.test(value), {
      message: "Birth Place must contain only alphabetic characters.",
    }),
  birthTimeSchema: z
    .string()
    .refine((value) => /^\d{1,2}:\d{2}\s?[apAP]\.m\.$/.test(value), {
      message: "Time of birth must be in the format 'hh:mm a.m./p.m.'",
    }),
  zodiacSignSchema: z.string().refine((value) => zodiacSigns.includes(value), {
    message: "Please select a valid zodiac sign.",
  }),
  nakshatraSchema: z.string().refine((value) => nakshatras.includes(value), {
    message: "Please select a valid Nakshatra.",
  }),
  ganaSchema: z.string().refine((value) => ganas.includes(value), {
    message: "Please select a valid Gana.",
  }),
  mangalDoshaSchema: z
    .string()
    .refine((value) => mangalDoshas.includes(value), {
      message: "Please select a valid Mangal Dosha placement.",
    }),
  religion1: z
    .string()
    .refine(
      (value) =>
        [
          "Hinduism",
          "Buddhism",
          "Christianity",
          "Islam",
          "Sikhism",
          "Judaism",
          "Others",
        ].includes(value),
      {
        message: "Please Select at least one.",
      }
    ),
  community: z
    .string()
    .min(2, {
      message: "Caste is required",
    })
    .refine((value) => /^\s*[A-Za-z\s]+\s*$/.test(value), {
      message: "Caste must contain only alphabetic characters.",
    }),
  education1: z
    .string()
    .refine(
      (value) =>
        ["Ph.D.", "Master", "Bachelor", "Diploma", "S.L.C", "S.E.E"].includes(
          value
        ),
      {
        message: "Please Select at least one.",
      }
    ),
  maritalStatus1: z
    .string()
    .refine((value) => ["single", "married", "divorced"].includes(value), {
      message: "Please Select at least one.",
    }),
  age: z.string(),
  // minAge: z.string().refine((value) => /^\d+$/.test(value), {
  //   message: "Please enter a valid minimum age.",
  // }),

  // maxAge: z.string().refine((value) => /^\d+$/.test(value), {
  //   message: "Please enter a valid maximum age.",
  // }),
  height: z.string(),
});

export default function RegistrationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [townOptions, setTownOptions] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: "",
      date: { day: "", month: "", year: "" },
      religion: "",
      caste: "",
      maritalStatus: "",
      number: "",
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

    console.log(data);
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleProvinceChange = (value: React.SetStateAction<string>) => {
    setSelectedProvince(value);
    setValue("province", value);
  };
  const handleDistrictChange = (value: React.SetStateAction<string>) => {
    setSelectedDistrict(value);
    setValue("district", value);
  };

  useEffect(() => {
    if (selectedDistrict) {
      fetchTownOptions(selectedDistrict);
    }
  }, [selectedDistrict]);

  const fetchTownOptions = async (district: string) => {
    try {
      const response = await fetch(
        `https://neapl-provience-district.onrender.com/municilapity/${district}`
      );
      const data = await response.json();
      setTownOptions(data.result[district] || []);
    } catch (error) {
      console.error("Error fetching town options:", error);
      setTownOptions([]);
    }
  };
  return (
    <div className="flex items-center justify-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Register</Button>
        </DialogTrigger>
        <DialogContent className="max-w-[85%] md:max-w-[75%] lg:max-w-[50%]">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">
              Registration
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="">
                {/* Personal Info */}
                {currentStep === 1 && (
                  <div className="">
                    <h1 className=" text-xl font-semibold">
                      Personal Information
                    </h1>{" "}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* First Name */}
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <>
                            <div className="">
                              <FormItem className="flex items-center">
                                <FormLabel className="min-w-[30%] pr-5 ">
                                  First Name
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter Your First Name"
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
                      {/* Last Name */}
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <>
                            <div className="">
                              <FormItem className="flex items-center">
                                <FormLabel className="min-w-[30%] pr-5  ">
                                  Last Name
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter Your Last Name"
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
                      {/* Gender */}
                      <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                          <>
                            <div className="">
                              <FormItem className="flex items-center">
                                <FormLabel className="min-w-[30%] md:pr-5 ">
                                  Gender
                                </FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select Your Gender" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">
                                      Female
                                    </SelectItem>
                                    <SelectItem value="others">
                                      Others
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormItem>
                              <div>
                                <FormMessage className="mt-2 flex justify-center" />
                              </div>
                            </div>
                          </>
                        )}
                      />
                      {/* Date */}
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <div>
                            <FormItem className="flex items-center">
                              <FormLabel className="min-w-[30%] md:pr-5 ">
                                D.O.B. (B.S.)
                              </FormLabel>
                              <FormControl>
                                <Controller
                                  name="date.day"
                                  control={form.control}
                                  render={({ field }) => (
                                    <Input
                                      placeholder="dd"
                                      {...field}
                                      type="number"
                                      min={1}
                                      max={32}
                                    />
                                  )}
                                />
                              </FormControl>
                              <FormControl>
                                <Controller
                                  name="date.month"
                                  control={form.control}
                                  render={({ field }) => (
                                    <Input
                                      placeholder="mm"
                                      {...field}
                                      type="number"
                                      min={1}
                                      max={12}
                                    />
                                  )}
                                />
                              </FormControl>
                              <FormControl>
                                <Controller
                                  name="date.year"
                                  control={form.control}
                                  render={({ field }) => (
                                    <Input
                                      placeholder="yyyy"
                                      {...field}
                                      type="number"
                                      min={2010}
                                    />
                                  )}
                                />
                              </FormControl>
                            </FormItem>
                            <div>
                              <FormMessage className="mt-2 flex justify-center" />
                            </div>
                          </div>
                        )}
                      />
                      {/* Religion */}
                      <FormField
                        control={form.control}
                        name="religion"
                        render={({ field }) => (
                          <>
                            <div className="">
                              <FormItem className="flex items-center">
                                <FormLabel className="min-w-[30%] md:pr-5 ">
                                  Religion
                                </FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select Your Religion" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="Hinduism">
                                      Hinduism
                                    </SelectItem>
                                    <SelectItem value="Buddhism">
                                      Buddhism
                                    </SelectItem>
                                    <SelectItem value="Christianity">
                                      Christianity
                                    </SelectItem>
                                    <SelectItem value="Islam">Islam</SelectItem>
                                    <SelectItem value="Sikhism">
                                      Sikhism
                                    </SelectItem>
                                    <SelectItem value="Judaism">
                                      Judaism
                                    </SelectItem>
                                    <SelectItem value="Others">
                                      Others
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormItem>
                              <div>
                                <FormMessage className="mt-2 flex justify-center" />
                              </div>
                            </div>
                          </>
                        )}
                      />
                      {/* Caste */}
                      <FormField
                        control={form.control}
                        name="caste"
                        render={({ field }) => (
                          <>
                            <div className="">
                              <FormItem className="flex items-center">
                                <FormLabel className="min-w-[30%] md:pr-5 ">
                                  {" "}
                                  Caste
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter Your Caste"
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
                      {/* Martial Status */}
                      <FormField
                        control={form.control}
                        name="maritalStatus"
                        render={({ field }) => (
                          <>
                            <div className="">
                              <FormItem className="flex items-center">
                                <FormLabel className="min-w-[30%] md:pr-5 ">
                                  Marital Status
                                </FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select Status" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="single">
                                      Single
                                    </SelectItem>
                                    <SelectItem value="married">
                                      Married
                                    </SelectItem>
                                    <SelectItem value="divorced">
                                      Divorced
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormItem>
                              <div>
                                <FormMessage className="mt-2 flex justify-center" />
                              </div>
                            </div>
                          </>
                        )}
                      />
                      {/* Number */}
                      <FormField
                        control={form.control}
                        name="number"
                        render={({ field }) => (
                          <>
                            <div className="">
                              <FormItem className="flex items-center">
                                <FormLabel className="min-w-[30%] md:pr-5 ">
                                  {" "}
                                  Phone Number
                                </FormLabel>
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
                    </div>
                    <div className="flex justify-end mt-4 space-x-4">
                      <Button type="button" onClick={handleNext}>
                        Next
                      </Button>
                    </div>
                  </div>
                )}

                {/* Contact Details */}
                {currentStep === 2 && (
                  <div className="">
                    <h1 className=" text-xl font-semibold">Contact Details</h1>{" "}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Country */}
                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <>
                            <div className="">
                              <FormItem className="flex items-center">
                                <FormLabel className="min-w-[30%] md:pr-5 ">
                                  Country
                                </FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select Your Country" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="Nepal">Nepal</SelectItem>
                                    <SelectItem value="India">India</SelectItem>
                                    <SelectItem value="Bangladesh">
                                      Bangladesh
                                    </SelectItem>
                                    <SelectItem value="Bhutan">
                                      Bhutan
                                    </SelectItem>
                                    <SelectItem value="others">
                                      Others
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormItem>
                              <div>
                                <FormMessage className="mt-2 flex justify-center" />
                              </div>
                            </div>
                          </>
                        )}
                      />
                      {/* Province */}
                      <FormField
                        control={form.control}
                        name="province"
                        render={({ field }) => (
                          <>
                            <div className="">
                              <FormItem className="flex items-center">
                                <FormLabel className="min-w-[30%] md:pr-5 ">
                                  Province
                                </FormLabel>
                                <Select
                                  onValueChange={(value) => {
                                    field.onChange(value);
                                    handleProvinceChange(value);
                                  }}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select Your Province" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="Bagmati">
                                      Bagmati Province
                                    </SelectItem>
                                    <SelectItem value="Gandaki">
                                      Gandaki Province
                                    </SelectItem>
                                    <SelectItem value="Madhesh">
                                      Madhesh Province
                                    </SelectItem>
                                    <SelectItem value="Lumbini">
                                      Lumbini Province
                                    </SelectItem>
                                    <SelectItem value="Karnali">
                                      Karnali Pradesh
                                    </SelectItem>
                                    <SelectItem value="Koshi">
                                      Koshi Province
                                    </SelectItem>
                                    <SelectItem value="Sudurpashchim">
                                      Sudurpashchim Province
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormItem>
                              <div>
                                <FormMessage className="mt-2 flex justify-center" />
                              </div>
                            </div>
                          </>
                        )}
                      />

                      {/* District */}
                      <FormField
                        control={form.control}
                        name="district"
                        render={({ field }) => (
                          <>
                            <div className="">
                              <FormItem className="flex items-center">
                                <FormLabel className="min-w-[30%] md:pr-5 ">
                                  District
                                </FormLabel>
                                <Select
                                  onValueChange={(value) => {
                                    field.onChange(value);
                                    handleDistrictChange(value);
                                  }}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select Your District" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="">
                                    {selectedProvince &&
                                      districtsOfProvince[selectedProvince].map(
                                        (district) => (
                                          <SelectItem
                                            key={district}
                                            value={district}
                                          >
                                            {district}
                                          </SelectItem>
                                        )
                                      )}
                                  </SelectContent>
                                </Select>
                              </FormItem>
                              <div>
                                <FormMessage className="mt-2 flex justify-center" />
                              </div>
                            </div>
                          </>
                        )}
                      />

                      {/* Town */}
                      {/* <FormField
                        control={form.control}
                        name="town"
                        render={({ field }) => (
                          <>
                            <div className="">
                              <FormItem className="flex items-center">
                                <FormLabel className="min-w-[30%] md:pr-5">
                                  Town
                                </FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select Your Town" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="">
                                    {townOptions.map((town) => (
                                      <SelectItem key={town} value={town}>
                                        {town}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </FormItem>
                              <div>
                                <FormMessage className="mt-2 flex justify-center" />
                              </div>
                            </div>
                          </>
                        )}
                      /> */}

                      {/* Town */}
                      <FormField
                        control={form.control}
                        name="town"
                        render={({ field }) => (
                          <>
                            <div className="">
                              <FormItem className="flex items-center">
                                <FormLabel className="min-w-[30%] pr-5 ">
                                  City/Village
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter Your City/Village"
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

                      {/* Tole */}
                      <FormField
                        control={form.control}
                        name="tole"
                        render={({ field }) => (
                          <>
                            <div className="">
                              <FormItem className="flex items-center">
                                <FormLabel className="min-w-[30%] pr-5 ">
                                  Tole
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter Your Tole"
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

                      {/* Ward */}
                      <FormField
                        control={form.control}
                        name="ward"
                        render={({ field }) => (
                          <>
                            <div className="">
                              <FormItem className="flex items-center">
                                <FormLabel className="min-w-[30%] pr-5 ">
                                  Ward
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter Your Ward No."
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
                    <div className="flex items-center justify-end mt-4 space-x-4">
                      <Button type="button" onClick={handleBack}>
                        Back
                      </Button>
                      <Button type="button" onClick={handleNext}>
                        Next
                      </Button>
                    </div>
                  </div>
                )}

                {/* Education */}
                {currentStep === 3 && (
                  <div className="">
                    <h1 className=" text-xl font-semibold">
                      Education & Career
                    </h1>{" "}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* education level */}
                      <FormField
                        control={form.control}
                        name="education"
                        render={({ field }) => (
                          <>
                            <div className="">
                              <FormItem className="flex items-center">
                                <FormLabel className="min-w-[30%] md:pr-5 ">
                                  Education Level
                                </FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select Your Level" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="Ph.D.">Ph.D.</SelectItem>
                                    <SelectItem value="Master">
                                      Master
                                    </SelectItem>
                                    <SelectItem value="Bachelor">
                                      Bachelor
                                    </SelectItem>
                                    <SelectItem value="Diploma">
                                      Diploma
                                    </SelectItem>
                                    <SelectItem value="S.L.C">
                                      S.L.C.
                                    </SelectItem>
                                    <SelectItem value="S.E.E">
                                      S.E.E.
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormItem>
                              <div>
                                <FormMessage className="mt-2 flex justify-center" />
                              </div>
                            </div>
                          </>
                        )}
                      />

                      {/* university */}
                      <FormField
                        control={form.control}
                        name="university"
                        render={({ field }) => (
                          <>
                            <div className="">
                              <FormItem className="flex items-center">
                                <FormLabel className="min-w-[30%] pr-5 ">
                                  University
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter Your University"
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

                      {/* Field */}
                      <FormField
                        control={form.control}
                        name="field"
                        render={({ field }) => (
                          <>
                            <div className="">
                              <FormItem className="flex items-center">
                                <FormLabel className="min-w-[32%] pr-5 ">
                                  Field of Study
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter Your Field"
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

                      {/* Occupation */}
                      <FormField
                        control={form.control}
                        name="occupation"
                        render={({ field }) => (
                          <>
                            <div className="">
                              <FormItem className="flex items-center">
                                <FormLabel className="min-w-[30%] pr-5 ">
                                  Occupation
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter Your Occupation"
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

                      {/* location */}
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <>
                            <div className="">
                              <FormItem className="flex items-center">
                                <FormLabel className="min-w-[30%] pr-5 ">
                                  Current Location
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter Your Work Location"
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

                      {/* Income */}
                      <FormField
                        control={form.control}
                        name="income"
                        render={({ field }) => (
                          <>
                            <div className="">
                              <FormItem className="flex items-center">
                                <FormLabel className="min-w-[30%] md:pr-5 ">
                                  Annual Income
                                </FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select Your Annual Income" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="<50k">
                                      Under Rs.50,000
                                    </SelectItem>
                                    <SelectItem value="50k-100k">
                                      Between Rs.50,000 to Rs.1,00,000
                                    </SelectItem>
                                    <SelectItem value="100k-150k">
                                      Between Rs.1,00,000 to Rs.1,50,000
                                    </SelectItem>
                                    <SelectItem value="150k-250k">
                                      Between Rs.1,50,000 to Rs.2,50,000
                                    </SelectItem>
                                    <SelectItem value=">250k">
                                      More than Rs.2,50,000
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormItem>
                              <div>
                                <FormMessage className="mt-2 flex justify-center" />
                              </div>
                            </div>
                          </>
                        )}
                      />
                    </div>
                    <div className="flex items-center justify-end mt-4 space-x-4">
                      <Button type="button" onClick={handleBack}>
                        Back
                      </Button>
                      <Button type="button" onClick={handleNext}>
                        Next
                      </Button>
                    </div>
                  </div>
                )}

                {/* Horoscope */}
                {currentStep === 4 && (
                  <div className="">
                    <h1 className=" text-xl font-semibold">
                      Horoscope Details
                    </h1>{" "}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Place of birth */}
                      <FormField
                        control={form.control}
                        name="birthPlace"
                        render={({ field }) => (
                          <>
                            <div className="">
                              <FormItem className="flex items-center">
                                <FormLabel className="min-w-[30%] md:pr-5 ">
                                  Place of Birth
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter Your Birth Town"
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
                      {/* time of birth */}
                      <FormField
                        control={form.control}
                        name="birthTimeSchema"
                        render={({ field }) => (
                          <>
                            <div className="">
                              <FormItem className="flex items-center">
                                <FormLabel className="min-w-[30%] pr-5 ">
                                  Time of Birth
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter Your time of birth"
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
                      {/* Zodiac Sign */}
                      <FormField
                        control={form.control}
                        name="zodiacSignSchema"
                        render={({ field }) => (
                          <>
                            <div className="">
                              <FormItem className="flex items-center">
                                <FormLabel className="min-w-[30%] md:pr-5 ">
                                  Zodiac Sign
                                </FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select Your Zodiac Sign" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {zodiacSigns.map((sign) => (
                                      <SelectItem key={sign} value={sign}>
                                        {sign}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </FormItem>
                              <div>
                                <FormMessage className="mt-2 flex justify-center" />
                              </div>
                            </div>
                          </>
                        )}
                      />
                      {/* Nakshatra */}
                      <FormField
                        control={form.control}
                        name="nakshatraSchema"
                        render={({ field }) => (
                          <>
                            <div className="">
                              <FormItem className="flex items-center">
                                <FormLabel className="min-w-[30%] md:pr-5 ">
                                  Nakshatra
                                </FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select Your Nakshatra" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {nakshatras.map((nakshatra) => (
                                      <SelectItem
                                        key={nakshatra}
                                        value={nakshatra}
                                      >
                                        {nakshatra}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </FormItem>
                              <div>
                                <FormMessage className="mt-2 flex justify-center" />
                              </div>
                            </div>
                          </>
                        )}
                      />
                      {/* Gana */}
                      <FormField
                        control={form.control}
                        name="ganaSchema"
                        render={({ field }) => (
                          <>
                            <div className="">
                              <FormItem className="flex items-center">
                                <FormLabel className="min-w-[30%] md:pr-5 ">
                                  Gana
                                </FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select Your Gana" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {ganas.map((gana) => (
                                      <SelectItem key={gana} value={gana}>
                                        {gana}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </FormItem>
                              <div>
                                <FormMessage className="mt-2 flex justify-center" />
                              </div>
                            </div>
                          </>
                        )}
                      />
                      {/* Mangal Dosha */}
                      <FormField
                        control={form.control}
                        name="mangalDoshaSchema"
                        render={({ field }) => (
                          <>
                            <div className="">
                              <FormItem className="flex items-center">
                                <FormLabel className="min-w-[30%] md:pr-5 ">
                                  Mangal Dosha
                                </FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select Mars Placement" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {mangalDoshas.map((dosha) => (
                                      <SelectItem key={dosha} value={dosha}>
                                        {dosha}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </FormItem>
                              <div>
                                <FormMessage className="mt-2 flex justify-center" />
                              </div>
                            </div>
                          </>
                        )}
                      />
                    </div>
                    <div className="flex items-center justify-end mt-4 space-x-4">
                      <Button type="button" onClick={handleBack}>
                        Back
                      </Button>
                      <Button type="button" onClick={handleNext}>
                        Next
                      </Button>
                      {/* <Button type="submit">Submit</Button> */}
                    </div>
                  </div>
                )}

                {/* Partner Preferences */}
                {currentStep === 5 && (
                  <div className="">
                    <h1 className=" text-xl font-semibold">
                      Partner Preferences
                    </h1>{" "}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Age*/}
                      <FormField
                        control={form.control}
                        name="age"
                        render={({ field }) => (
                          <>
                            <div className="">
                              <FormItem className="flex items-center">
                                <FormLabel className="min-w-[30%] md:pr-5 ">
                                  Age
                                </FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="20" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {Array.from({ length: 10 }, (_, index) => (
                                      <SelectItem
                                        key={index}
                                        value={String(20 + index)}
                                      >
                                        {20 + index}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <span className="mx-2">to</span>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="21" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {Array.from({ length: 10 }, (_, index) => (
                                      <SelectItem
                                        key={index}
                                        value={String(21 + index)}
                                      >
                                        {21 + index}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </FormItem>
                              <div>
                                <FormMessage className="mt-2 flex justify-center" />
                              </div>
                            </div>
                          </>
                        )}
                      />
                      {/* Height*/}
                      <FormField
                        control={form.control}
                        name="height"
                        render={({ field }) => (
                          <>
                            <div className="">
                              <FormItem className="flex items-center">
                                <FormLabel className="min-w-[30%] md:pr-5 ">
                                  Height
                                </FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="5'0''" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {Array.from({ length: 13 }, (_, index) => (
                                      <SelectItem
                                        key={index}
                                        value={String(`5'${index}`)}
                                      >
                                        {`5'${index}`}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <span className="mx-2">to</span>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="6'8''" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {Array.from({ length: 9 }, (_, index) => (
                                      <SelectItem
                                        key={index}
                                        value={String(`6'${index}`)}
                                      >
                                        {`6'${index}''`}
                                      </SelectItem>
                                    ))}
                                    <SelectItem value="6'8''">6'8''</SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormItem>
                              <div>
                                <FormMessage className="mt-2 flex justify-center" />
                              </div>
                            </div>
                          </>
                        )}
                      />
                      {/* Religion */}
                      <FormField
                        control={form.control}
                        name="religion1"
                        render={({ field }) => (
                          <>
                            <div className="">
                              <FormItem className="flex items-center">
                                <FormLabel className="min-w-[30%] md:pr-5 ">
                                  Religion
                                </FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select Partner Religion" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="Hinduism">
                                      Hinduism
                                    </SelectItem>
                                    <SelectItem value="Buddhism">
                                      Buddhism
                                    </SelectItem>
                                    <SelectItem value="Christianity">
                                      Christianity
                                    </SelectItem>
                                    <SelectItem value="Islam">Islam</SelectItem>
                                    <SelectItem value="Sikhism">
                                      Sikhism
                                    </SelectItem>
                                    <SelectItem value="Judaism">
                                      Judaism
                                    </SelectItem>
                                    <SelectItem value="Others">
                                      Others
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormItem>
                              <div>
                                <FormMessage className="mt-2 flex justify-center" />
                              </div>
                            </div>
                          </>
                        )}
                      />
                      {/* Caste */}
                      <FormField
                        control={form.control}
                        name="community"
                        render={({ field }) => (
                          <>
                            <div className="">
                              <FormItem className="flex items-center">
                                <FormLabel className="min-w-[30%] md:pr-5 ">
                                  {" "}
                                  Caste
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter Partner Caste"
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
                      {/* education level */}
                      <FormField
                        control={form.control}
                        name="education1"
                        render={({ field }) => (
                          <>
                            <div className="">
                              <FormItem className="flex items-center">
                                <FormLabel className="min-w-[30%] md:pr-5 ">
                                  Education Level
                                </FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select Minimum Level" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="Ph.D.">Ph.D.</SelectItem>
                                    <SelectItem value="Master">
                                      Master
                                    </SelectItem>
                                    <SelectItem value="Bachelor">
                                      Bachelor
                                    </SelectItem>
                                    <SelectItem value="Diploma">
                                      Diploma
                                    </SelectItem>
                                    <SelectItem value="S.L.C">
                                      S.L.C.
                                    </SelectItem>
                                    <SelectItem value="S.E.E">
                                      S.E.E.
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormItem>
                              <div>
                                <FormMessage className="mt-2 flex justify-center" />
                              </div>
                            </div>
                          </>
                        )}
                      />
                      {/* Martial Status */}
                      <FormField
                        control={form.control}
                        name="maritalStatus1"
                        render={({ field }) => (
                          <>
                            <div className="">
                              <FormItem className="flex items-center">
                                <FormLabel className="min-w-[30%] md:pr-5 ">
                                  Marital Status
                                </FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select Status" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="single">
                                      Single
                                    </SelectItem>
                                    <SelectItem value="married">
                                      Married
                                    </SelectItem>
                                    <SelectItem value="divorced">
                                      Divorced
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormItem>
                              <div>
                                <FormMessage className="mt-2 flex justify-center" />
                              </div>
                            </div>
                          </>
                        )}
                      />
                    </div>
                    <div className="flex items-center justify-end mt-4 space-x-4">
                      <Button type="button" onClick={handleBack}>
                        Back
                      </Button>
                      {/* <Button type="button" onClick={handleNext}>
                        Next
                      </Button> */}
                      <Button type="submit">Submit</Button>
                    </div>
                  </div>
                )}
              </form>
            </Form>
          </div>
          <DialogFooter>
            {/* <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
              Submit
            </Button> */}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}