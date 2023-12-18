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
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";

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
        <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
          <DialogTrigger>
            <Button variant="ghost">Login</Button>
          </DialogTrigger>
          <DialogPortal>  
            <DialogContent className="sm:max-w-[425px] border-white">
              <DialogHeader>
                <DialogTitle className="text-Primary text-xl w-full text-center">
                  Login
                </DialogTitle>
              </DialogHeader>
              <div>
                <h1>Login Form</h1>
                <Button
                  variant="link"
                  onClick={() => {
                    setRegisterOpen(true);
                    setLoginOpen(false);
                  }}
                >
                  Register
                </Button>
              </div>
            </DialogContent>
          </DialogPortal>
        </Dialog>
        <Dialog open={registerOpen} onOpenChange={setRegisterOpen}>
          <DialogTrigger>
            <Button variant="ghost">Register</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-Primary text-xl w-full text-center">
                Register
              </DialogTitle>
            </DialogHeader>
            <div>
              <h1>Register Form</h1>
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
