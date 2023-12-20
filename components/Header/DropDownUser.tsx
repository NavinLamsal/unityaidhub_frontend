import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import Login from "../Form/Login";
// import { Register } from "../Register/register";
import { FaGoogle, FaFacebookF } from "react-icons/fa6";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Link from "next/link";

const DropDownUser = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="p-2 border-4 flex items-center border-Primary rounded-full cursor-pointer">
          <User size={32} className="text-Primary" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 flex justify-between divide-x-2">
        {/* login  */}
        <Link href='/signin'><Button variant="ghost">Login</Button></Link>

        {/* register  */}
        <Dialog open={registerOpen} onOpenChange={setRegisterOpen}>
          <DialogTrigger>
            <Button variant="ghost">Register</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg grid gap-4">
            <DialogHeader>
              <DialogTitle className="text-Primary text-xl w-full text-center">
              Create an account
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-6">
              <Button variant="outline">
              <FaFacebookF className="mr-2 h-4 w-4"/>
                
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
                <span className="bg-darkPrimary px-2 pb-2 pt-3 text-muted-foreground text-white ">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" />
            </div>
            <Button className="w-full">Create account</Button>
            <div>
              <Button
                variant="link"
                onClick={() => {
                  setLoginOpen(true);
                  setRegisterOpen(false);
                }}
              >
                click here
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDownUser;
