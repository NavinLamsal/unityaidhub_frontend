"use server";

import { auth } from "@/auth";

const baseUrl = process.env.NEXT_PUBLIC_URL;
let accessToken: string = "";

setInterval(async () => {
  const session = await auth();
  if (session) {
    accessToken = session?.accessToken as string;
  }
}, 60000);

export async function getPost(
  category: string = "",
  status: string = "",
  sortBy: string = "",
  page: number = 1
) {
  try {
    const data = await fetch("https://api.escuelajs.co/api/v1/products").then(
      (res) => res.json()
    );
    return data;
  } catch (error) {
    return { error: error };
  }
}

export async function getUser() {
  const session = await auth();
  let email: string = "";
  if (session) {
    email = session?.email ?? "";
  }
  if (email !=="") {
    try {
      const response = await fetch(`${baseUrl}/user/all`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      const user = data.find((u: any) => u.email === email);
      console.log("user",user);
      return user;
    } catch (error) {
      return { error: error };
    }
  }else{
    console.log("error fetching email");
    return {error: "Error fetcing email"}
  }
}
