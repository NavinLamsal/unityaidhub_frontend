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
    <div className="hidden min-[900px]:inline-block">
    <DropdownMenu >
      <DropdownMenuTrigger asChild>
        <div className="p-2 border-4 flex items-center border-Primary rounded-full cursor-pointer">
          <User className="text-Primary md:h-7 md:w-7 h-5 w-5 " />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 flex justify-between divide-x-2">
        {/* login  */}
        <Link href='/signin'><Button variant="ghost">Login</Button></Link>

        {/* register  */}
        
      </DropdownMenuContent>
    </DropdownMenu>

    </div>
  );
};

export default DropDownUser;
