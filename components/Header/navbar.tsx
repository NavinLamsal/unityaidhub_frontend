'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Menu from "./Menu";
import Image from "next/image";
import MenuMobile from "./MenuMobile";
import { LucideMenu, Moon, Sun, X } from "lucide-react";
import DropDownUser from "./DropDownUser";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useTheme } from "next-themes";


const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showCatMenu, setShowCatMenu] = useState(false);
  const [show, setShow] = useState("translate-y-0");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [categories,setCategories] =useState(null);
  const { setTheme } = useTheme()

//   const {cartItems}= useSelector((state => state.cart))

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("-translate-y-[80px]");
      } else {
        setShow("shadow-sm");
      }
    } else {
      setShow("translate-y-0");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  return (
    
    <nav
      className={`w-full h-12 md:h-20 bg-white dark:bg-darkPrimary flex items-center z-20 sticky top-0 transition-transform duration-300 ${show}`}
    >
      <div className=" container h-16 w-full flex justify-between items-center">
        <Link href="/">
          <Image
              src={`/Logo/landscape.png`}
              alt="logo"
              width={750}
              height={750}
              quality={100}
              className="h-16 w-auto dark:hidden"
            />
            <Image
              src={`/Logo/landscapewhite.png`}
              alt="logo"
              width={750}
              height={750}
              quality={100}
              className="h-16 w-auto hidden dark:block"
            />
        </Link>
        <Menu showCatMenu={showCatMenu} setShowCatMenu={setShowCatMenu} categories={categories} />
        <div className="flex gap-4 items-center">
        <DropdownMenu>
            <DropdownMenuTrigger className="p-2 bg-zinc-100 dark:bg-zinc-950/90 drop-shadow-sm hover:bg-zinc-200 dark:hover:bg-zinc-950 rounded-sm flex ">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-0 transition-all dark:-rotate-90 dark:scale-100" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-270 scale-100 transition-all dark:rotate-0 dark:scale-0" />
              <span className="sr-only">Toggle theme</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={()=>setTheme("dark")}>Dark</DropdownMenuItem>
              <DropdownMenuItem onClick={()=>setTheme("light")}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={()=>setTheme("system")}>System</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        <DropDownUser/>

        </div>
          {/* hamburger menu  */}
          <div
            className="w-8 md:w-12 h-8 md:h-12 rounded-xs flex md:hidden justify-center items-center hover:bg-lime-400 cursor-pointer relative
            "
          >
            {mobileMenu ? (
                <X onClick={() => {
                    setMobileMenu(false);
                  }}/>
              
            ) : (
                <LucideMenu onClick={() => {
                    setMobileMenu(true);
                  }}/>
            )}
          </div>
        
      </div>
    </nav>
    
  );
};

export default Navbar;

// {mobileMenu && (
//   <MenuMobile
//     showCatMenu={showCatMenu}
//     setShowCatMenu={setShowCatMenu}
//     setMobileMenu={setMobileMenu}
//     categories={categories}
//   />
// )}