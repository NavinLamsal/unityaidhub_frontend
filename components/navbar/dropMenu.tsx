
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuList,
    NavigationMenuContent,
  } from "@/components/ui/navigation-menu";
  import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
  import Link from "next/link";
  import React, { useContext } from "react";
 
  
  interface SubServiceType{
    id:string,
    title:string,
    image:string| null,
    sewaService_id:string,
    status:string,
  }
  export interface sewaServiceType{
    id:string, 
    title:string,
    image:string | null,
    subServices:SubServiceType[] | []
  }
  
  
  const DropMenu = ({ title, menulist }: { title: string; menulist?: string[] }) => {
  
  
  
  
  
  
    return (
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="hover:text-primary px-0 hover:bg-transparent">
              <div className="flex font-normal items-center cursor-pointer group hover:text-primary">
                <div className="text-base lg:text-lg">{title}</div>
              </div>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="flex flex-col w-60 gap-2 px-4 py-2">
                {menulist?.map((item, index) => (
                  <Link href={`/${item}`} className="flex flex-col gap-2 px-2 py-1 rounded-sm hover:bg-primary hover:text-white" key={index} >
                    <DropdownMenuLabel className="font-medium text-base lg:text-lg ">
                      {item}
                    </DropdownMenuLabel>
                  </Link>
                ))}
              </div>
            </NavigationMenuContent>
         
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
  };
  
  export default DropMenu;