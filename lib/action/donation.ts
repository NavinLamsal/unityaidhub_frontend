// 'use server'

// import { auth } from "@/auth";
// import { getUser } from "./actions";


// export async function DonationAction(formData: FormData) {
//     const session = await auth();
//     console.log("function is called")

//     if(session?.accessToken){
//         const user = await getUser();
//         console.log("user data from donation" , user)
        
//         if(user){
//             console.log("form values from formdata", formData)
//             const jsonBody = Object.fromEntries(Array.from(formData.entries()));
//             const body={
//                     "amount": 10,
//                     "remarks": "string",
//                     "postId": 10,
//                     "userId": 9,
//                     "payment": "esewa"
//                   }
//             try {
//                 console.log("i am inside try")
//               const data = await fetch(`http://localhost:3001/donations`,
//               {
//                 method: "POST",
//                 body: JSON.stringify(body),
//                 headers: {
//                     Authorization: `Bearer ${session?.accessToken}`,
//                   "Content-Type": "application/json",
//                 },
//               });
              
//               return data;
//             } catch (error) {
//               return { error: error };
//             }

//         }

//     }
//   }


"use server";

import { auth } from "@/auth";
import { z } from "zod";
import { Donationvalidation } from "../Validation/donation";

async function extractNumberAndCurrencyFromString(inputString:string) {
  const numberRegex = /[\d,.]+/;
  const currencyRegex = /[A-Z]+/;

  const numberMatch = inputString.match(numberRegex);
  const currencyMatch = inputString.match(currencyRegex);

  const number = numberMatch ? parseInt(numberMatch[0]) : null;
  const currency = currencyMatch ? currencyMatch[0] : null;

  return { number, currency };
}

export async function DonationAction(data: z.infer<typeof Donationvalidation>, postId:number, userId:number) {
  const session = await auth();
  console.log("i amd inside the function calla")
  console.log("session accesstoken", session?.accessToken);

  try {
    console.log("donation props",data);
    const donateamount = await extractNumberAndCurrencyFromString(data.Donation_amount)
    console.log("donation amount ",donateamount)
    console.log("user Id ",userId)
    console.log("post Id ",postId)

 
    const body={
      "amount": donateamount.number,
      "remarks": donateamount.currency,
      "postId": postId,
      "userId": userId,
      "payment": data.paymentMethod
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/donations`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
        "Content-Type": "application/json",
      },
    });
    console.log("request status", res.status);
    console.log("response message", res.statusText);
  } catch (error: unknown) {
    console.log("i amd inside the catch ");
    console.log("error", error);
    throw error;
  }
}
