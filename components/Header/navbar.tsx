'use client'
import React, { useState, useEffect } from "react";
// import Wrapper from "./Wrapper";
import Link from "next/link";
import Menu from "./Menu";
import Image from "next/image";
// import { Icon } from "@iconify/react";
import MenuMobile from "./MenuMobile";
import { LucideMenu, X } from "lucide-react";
import DropDownUser from "./DropDownUser";
// import { fetchDataFromApi } from "@/utils/api";
// import { useSelector } from "react-redux";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showCatMenu, setShowCatMenu] = useState(false);
  const [show, setShow] = useState("translate-y-0");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [categories,setCategories] =useState(null);

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
    <>
    <header
      className={`w-full h-12 md:h-20 bg-white dark:bg-darkPrimary flex items-center z-20 sticky top-0 transition-transform duration-300 ${show}`}
    >
      <div className="h-16 w-full flex justify-between items-center">
        <Link href="/">
          <Image
            src="/Logo/landscape.png"
            alt="logo"
            width={500}
            height={300}
            className="w-36 md:w-52"
          />
        </Link>
        <Menu showCatMenu={showCatMenu} setShowCatMenu={setShowCatMenu} categories={categories} />
        {mobileMenu && (
          <MenuMobile
            showCatMenu={showCatMenu}
            setShowCatMenu={setShowCatMenu}
            setMobileMenu={setMobileMenu}
            categories={categories}
          />
        )}
        <DropDownUser/>
        <div className="flex items-center gap-2 text-black dark:text-white">
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
      </div>
    </header>
    </>
  );
};

export default Navbar;