// get user
"use server"
import { auth } from "@/auth";

export async function getUser() {
    const session = await auth();
    let email: string = "";
    if (session && session.email && session.accessToken) {
      email = session?.email ?? "";
      if (email !== "") {
        try {
          const response = await fetch(`http://localhost:3001/user/all`, {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          });
          console.log("userdata response status", response.status)
          console.log("userdata response message ", response.statusText)
          const data = await response.json();
          const user = data.find((u: any) => u.email === email);
          return user;
        } catch (error) {
          return { error: error };
        }
      } else {
        return { error: "Error fetcing email" };
      }
    } else {
      return { error: "user is not logged in" };
    }
  }
  