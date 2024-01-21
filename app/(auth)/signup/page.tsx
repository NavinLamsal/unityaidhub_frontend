import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogOverlay, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import React from "react";
import { FaFacebookF, FaGoogle } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import RegisterForm from "@/components/Form/RegisterForm";

const Page = () => {
  return (
    <>
    <div className="w-full h-screen overflow-hidden">
     <Image src={`/hands.jpg`} alt={'hands'} width={1024} height={1024} quality={100} className="h-full w-full object-cover"/> 

    </div>
    <Dialog open={true} > 
          <DialogContent className="sm:max-w-sm grid gap-4">
            <DialogHeader>
              <DialogTitle className="text-Primary text-xl w-full text-center">
              <Link href={'/'}>
                <Image src={`/Logo/portrait.png`} alt={"unity aid hub logo"} width={100} height={100} quality={100} className="h-16 w-16 mx-auto block dark:hidden"/>
                <Image src={`/Logo/portraitwhite.png`} alt={"unity aid hub logo"} width={100} height={100} quality={100} className="h-16 w-16 mx-auto hidden dark:block"/>
               
               </Link>
              Create an account
              </DialogTitle>
            </DialogHeader>
            

            <RegisterForm/>
            <div className="justify-center mx-auto">
              <p>Already have an Account ? <Link href={'/signin'}><Button variant="link" className="px-0 m-0 text-Primary">Sign in</Button></Link></p>
             
            </div>
          </DialogContent>

         
    </Dialog>
    
    </>



  );
};

export default Page;
