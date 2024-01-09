"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
import { Button } from "../ui/button";
import RichTextEditor from "../RichTextEditor/Richtexteditor";
import CustomFileSelector from "./CustomFileSelector";
import Image from "next/image";

const formSchema = z.object({
  document: z.any()

});

const CampaingnContentform = () => {

  const [images, setImages] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      //convert `FileList` to `File[]`
      const _files = Array.from(e.target.files);
      setImages(_files);
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const fileUpload = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    images.forEach((image) => {
      formData.append(image.name, image)
    })
    setUploading(true);
    await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    console.log(formData.getAll);

  }
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fileUpload(e);
  }

  // function onSubmit(values: z.infer<typeof formSchema>) {
  //   console.log(values);

  // }
  return (
    <div className="max-w-lg ">
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-8">
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

          <Button type="submit">Next</Button>
        </form>
      </Form>
    </div>
  );
};

export default CampaingnContentform;
