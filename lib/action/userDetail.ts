import { auth } from "@/auth";


export async function getUserDetail(Id:number) {
    const session = await auth();

    if (session && session.accessToken) {
        console.log("userId",Id)
        if(Id){
            try {
              const response = await fetch(`http://localhost:3001/user/${Id}`, {
                headers: {
                  Authorization: `Bearer ${session.accessToken}`,
                },
              });
              console.log("userDetai response status", response.status)
              console.log("userDetail response message ", response.statusText)
              const data = await response.json();
              return data;
            } catch (error) {
              return { error: error };
            }
        }else{
            return { error: "User Id isnot received" };
        }
    } else {
      return { error: "user is not logged in" };
    }
  }