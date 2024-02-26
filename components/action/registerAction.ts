"use server"

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function RegisterAction(formData:FormData){
    console.log("registering credentials",formData)
    try{
        // await signIn("credentials",{
        //     email:formData.get("email"),
        //     password:formData.get("password"),
        //     redirectTo:"/"
        // })
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