"use server";

import { auth } from "@/auth";

export async function CreatePostAction(formData: FormData) {
  const session = await auth();

  try {

    const jsonBody = Object.fromEntries(Array.from(formData.entries()));
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
      method: "POST",
      body: JSON.stringify(jsonBody),
      headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        "Content-Type": "application/json",
      },
    });
    console.log("post createion ", res);
  } catch (error: unknown) {
    throw error;
  }
}
