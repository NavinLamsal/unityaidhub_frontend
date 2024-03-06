"use server";

import { auth } from "@/auth";
import { createPostvalidation } from "../Validation/StartacampaingValidation";
import { z } from "zod";
import { UpdatePostvalidation } from "../Validation/UpdatePostValidation";

// export async function CreatePostAction(formData: FormData) {
    interface linksarr {
   
        url: string;
    }

export async function UpdatePost(data: z.infer<typeof UpdatePostvalidation>, imageLinks:linksarr[], documentLinks:linksarr[] ) {
  const session = await auth();
  console.log("i amd inside the function calla")
  console.log("session accesstoken", session?.accessToken);

  try {
   
    console.log("imageLinks", imageLinks);
    console.log("documentLinks", documentLinks);
    const image: string[] = imageLinks.map(link => link.url);
    const documents: string[] = documentLinks.map(link => link.url);

    const body={
      "title": data.postTitle,
      "description": data.postDescription,
      "goalAmount": data.target_fund,
      "country": data.country,     
      "status": "NOTVERIFIED",
      "postType": data.post_type,
      "categoryId": parseInt(data.category),
      "image": image,
      "documents": documents,
      "userId": data.userId,
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${data.postId}`, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
        "Content-Type": "application/json",
      },
    });
    console.log("post creation response", res);
    
  } catch (error: unknown) {
    console.log("i amd inside the catch ");
    console.log("error", error);
    throw error;
  }
}
