"use server";

import { auth } from "@/auth";

export async function CreatePostAction(formData: FormData) {
  const session = await auth();

  try {
    console.log("Post data", formData);
    const jsonBody = Object.fromEntries(Array.from(formData.entries()));
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
      method: "POST",
      body: JSON.stringify(jsonBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
      },
    });
    console.log("post createion ", res);
    // const body = {
    //     "title": "string",
    //     "description": "string",
    //     "startDate": "2024-02-28T10:37:17.950Z",
    //     "endDate": "2024-02-28T10:37:17.950Z",
    //     "goalAmount": 0,
    //     "currentAmount": 0,
    //     "image": [
    //       "string"
    //     ],
    //     "view": 0,
    //     "status": "NOTVERIFIED",
    //     "postType": "BASIC",
    //     "postUpdates": "string",
    //     "categoryId": 0,
    //     "userId": 0
    //   }
  } catch (error: unknown) {
    throw error;
  }
}
