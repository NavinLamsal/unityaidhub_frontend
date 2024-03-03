"use server";

import { auth } from "@/auth";
import { Posts } from "../types/Posts";

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
    const data = await fetch("http://localhost:8000/posts").then(
      (res) => res.json()
    );

    let filteredData:Posts[] = data;
    if(category !== ""){
      const categoryIds = category.split(',').map(id => parseInt(id.trim()));
      filteredData = filteredData.filter((post: Posts) => categoryIds.includes(post.categoryId));
    }
    if(status !==""){
      filteredData = filteredData.filter((post: Posts) => post.status === status);
    }
    if(sortBy !==""){
      if(sortBy === "latest"){
        filteredData.sort((a: Posts, b: Posts) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      } else if (sortBy === "publishedDate") {
        filteredData.sort((a: Posts, b: Posts) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
      }
    }
    return filteredData as Posts[];
  } catch (error) {
    return { error: error };
  }
}

export async function getPostdetail(
  id: string
) {
  try {
    const data = await fetch("http://localhost:8000/posts", { next: { revalidate: 3600 }}).then(
      (res) => res.json()
    );
    const detail = data.find((u: Posts) => u.id === parseInt(id));
    if(detail) return detail;
    else throw new Error("Post seems to be expired");
  } catch (error) {
    return { error: error };
  }
}

export async function getCategory() {
  try {
    const data = await fetch(`http://localhost:3001/category` ).then(
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
      // console.log("user",user);
      return user;
    } catch (error) {
      return { error: error };
    }
  }else{
    console.log("error fetching email");
    return {error: "Error fetcing email"}
  }
}
