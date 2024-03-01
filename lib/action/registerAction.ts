"use server"

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { loginAction } from "./loginAction";

export async function RegisterAction(formData:FormData){
    console.log("registering credentials",formData)
    const jsonBody = Object.fromEntries(Array.from(formData.entries()));
    try{
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
            method: "POST",
            body: JSON.stringify(jsonBody),
            headers: { "Content-Type": "application/json" },
          }).then(async (res)=>
          {if(res.status === 201){
            await loginAction(formData)
            // await signIn("credentials",{
            //     email:formData.get("email"),
            //     password:formData.get("password"),
            //     redirectTo:"/"
            // })
          }else{
            return
          }
        });

          
       
    }catch(error:unknown){
        if(error instanceof AuthError)
        {
            switch(error.type){
                case "CredentialsSignin":
                    return{error:"Invalid Credentials"};
                default:
                    return {error:"unknown Error Found"};    
            }
        }
        throw error;
    }
}