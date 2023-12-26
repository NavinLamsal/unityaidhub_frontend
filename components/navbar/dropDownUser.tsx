import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
  import { UserCircleIcon, LogOut, LayoutDashboard } from "lucide-react";
  import Link from "next/link";
  import React, { useContext } from "react";

  import Image from "next/image";

  
  
  const DropdownUser = () => {
    // const { userData } = useContext(userContext);
    // const image: boolean = userData?.image;
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div>
        {/* {image ? (
                <Image
                  src={userData.image}
                  alt="user"
                  width={100}
                  height={100}
                  className="grid h-8 w-8  justify-items-center rounded-full border  object-cover "
                />
              ) : ( */}
                <Image
                  src="/images/user.png"
                  alt="user"
                  width={100}
                  height={100}
                  className="grid h-8 w-8  justify-items-center rounded-full border"
                />
              {/* )} */}
              </div>
          {/* <UserCircleIcon className="mr-1 mt-1 h-7 w-7" /> */}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link className="w-full" href="/user/dashboard">
              <div className="flex w-full ">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </div>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div
              // onClick={() => signOut({ callbackUrl: "/" })}
              className="cursor-pointer flex w-full "
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };
  
  export default DropdownUser;