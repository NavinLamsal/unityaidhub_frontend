import Login from "@/components/Form/Login";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogOverlay, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { FaFacebookF, FaGoogle } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import ForgetPassword from "@/components/Form/ForgetPassword";
import NewPassword from "@/components/Form/NewPassword";

const Page = () => {
  return (
    <>
      <div className="w-full h-screen overflow-hidden">
        <Image src={`/humanitiarian.jpg`} alt={'hands'} width={1024} height={1024} quality={100} className="h-full w-full object-cover" />

      </div>
      <Dialog open={true} >

        <DialogContent className="sm:max-w-md grid gap-4">
          <DialogHeader>
            <DialogTitle className="text-Primary text-xl w-full text-center">
              <Link href={'/'}>
                <Image src={`/Logo/portrait.png`} alt={"unity aid hub logo"} width={100} height={100} quality={100} className="h-16 w-16 mx-auto block dark:hidden" />
                <Image src={`/Logo/portraitwhite.png`} alt={"unity aid hub logo"} width={100} height={100} quality={100} className="h-16 w-16 mx-auto hidden dark:block" />

              </Link>
              Set New Password
            </DialogTitle>
          </DialogHeader>
         
         
         <NewPassword/>
      
          {/* <div className="flex w-full flex-col text-sm">
            <div className="justify-center mx-auto">
              <p>Don&apos;t have an Account ? <Link href={'/signup'}><Button variant="link" className="p-0 m-0 text-Primary">Sign up</Button></Link></p>
            </div>
            <div className="justify-center mx-auto">
              <p>Remember  Password ? <Link href={'/signin'}><Button variant="link" className="p-0 m-0 text-Primary">Click here</Button></Link></p>
            </div>

          </div> */}

        </DialogContent>


      </Dialog>

    </>


  );
};

export default Page;
