"use server";

import { auth } from "@/auth";
import { createPostvalidation } from "../Validation/StartacampaingValidation";
import { z } from "zod";

// export async function CreatePostAction(formData: FormData) {
export async function CreatePostAction(data: z.infer<typeof createPostvalidation>, userId:number) {
  const session = await auth();
  console.log("i amd inside the function calla")
  console.log("session accesstoken", session?.accessToken);

  try {
   
    const body={
      "title": data.postTitle,
      "description": data.postDescription,
      "goalAmount": data.target_fund,
      "country": data.country,     
      "status": "NOTVERIFIED",
      "postType": data.post_type,
      "categoryId": parseInt(data.category),
      "userId": userId
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
      method: "POST",
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
