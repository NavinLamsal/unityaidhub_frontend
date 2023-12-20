import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { FaGoogle, FaFacebookF } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Login from "@/components/Form/Login";

const Page = () => {
  return (

      <div className="w-full h-full relative">
          <Card className="container absolute bg-white dark:bg-darkPrimary px-4 max-w-md z-50 m-auto top-0 bottom-0 right-0 left-0">
            <CardHeader>
              <CardTitle className="text-Primary text-xl w-full text-center">
                Sign in to Unity Aid Hub
              </CardTitle>
              <CardDescription className="text-center">
                Welcome back
              </CardDescription>
            </CardHeader>
            <div className="grid grid-cols-2 gap-6">
              <Button variant="outline">
                <FaFacebookF className="mr-2 h-4 w-4" />
                Facebook
              </Button>
              <Button variant="outline">
                <FaGoogle className="mr-2 h-4 w-4" />
                Google
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-darkPrimary dark:bg-white dark:text-darkPrimary px-2 pb-2 pt-3 text-muted-foreground text-white ">
                  Or continue with
                </span>
              </div>
            </div>
            <Login/>
            <div className="my-5 flex flex-col w-full justify-center">
              <Button
                variant="link"
                className="text-Primary dark:text-white "
                // onClick={() => {
                // //   setLoginOpen(true);
                // //   setRegisterOpen(false);
                // }}
              >
                Forget Password ?
              </Button>
              <div className="flex w-full justify-center items-center">
                Don&apos;t have an account ?{" "}
                <Button
                  variant="link"
                  className="text-Primary dark:text-white "
                  // onClick={() => {
                  // //   setLoginOpen(true);
                  // //   setRegisterOpen(false);
                  // }}
                >
                  signup
                </Button>
              </div>
            </div>
          </Card>
        <div className="grid items-center justify-items-center">
        </div>
      <Image
        src={"/wave.png"}
        alt="wave"
        width={1080}
        height={2080}
        quality={100}
        className="h-screen w-full rotate-180 -z-50 "
      />
      </div>

  );
};

export default Page;
