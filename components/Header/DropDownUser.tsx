import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { User } from "lucide-react";
import { Button } from "../ui/button";


import Link from "next/link";
import { redirect } from "next/navigation";

const DropDownUser = () => {
  return (
    <div className="hidden min-[900px]:inline-block">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="p-2 border-4 flex items-center border-Primary rounded-full cursor-pointer">
          <User className="text-Primary md:h-7 md:w-7 h-5 w-5 " />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
      <DropdownMenuItem><Link href='/signin'className="w-full">Sign In</Link> </DropdownMenuItem>
      <DropdownMenuItem><Link href='/signin' className="w-full">Sign Up</Link></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    </div>
  );
};

export default DropDownUser;
