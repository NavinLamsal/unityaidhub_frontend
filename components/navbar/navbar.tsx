import { usePathname } from "next/navigation";
import React, { useState } from "react";
import DropMenu from "./dropMenu";
import Link from "next/link";
import Wrapper from "../ui/wrapper";
import { Button } from "../ui/button";
import { LogIn, Menu, Moon, PenSquare, Sun, XIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useTheme } from "next-themes";

interface NavLink {
  href?: string;
  title: string;
  menulist?: string[];
  isDropDown?: boolean;
}

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { setTheme } = useTheme()

  const navLinks = [
    { href: "/", title: "Home" },
    { href: "/quizset", title: "Quiz" },
    { href: "/examset", title: "Exam" },
    { title: "Category", menulist: ["hello", "hello2"], isDropDown: true },
    { href: "/gorkhapatra", title: "Gorkhapatra" },
    { href: "/notice", title: "Notices" },
    { href: "/forum", title: "Forum" },
  ];

  const renderNavLink = (link: NavLink) => {
    if (link.isDropDown) {
      return <DropMenu title={link.title} menulist={link.menulist} />;
    }

    return (
      <Link
        href={link.href ?? "s"}
        className={`hover:text-primary ${
          pathname === link.href ? "text-primary" : "text-black"
        }`}
      >
        {link.title}
      </Link>
    );
  };

  return (
    <div className="w-full sticky top-0 bg-white text-black shadow-sm z-50">
      <Wrapper>
        <div className="flex gap-4 items-center">
          <Link href="/" className="w-max shrink-0">
            Logo
          </Link>
          

          <div className="hidden md:flex gap-4 text-base lg:text-lg font-normal items-center">
            {navLinks.map((link, index) => (
              <React.Fragment key={index}>{renderNavLink(link)}</React.Fragment>
            ))}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={()=>setTheme("dark")}>Dark</DropdownMenuItem>
              <DropdownMenuItem onClick={()=>setTheme("light")}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={()=>setTheme("system")}>System</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex w-full justify-end gap-1.5">
            {/* {session ? (
              <div className="flex gap-2">
                <Notification />
                <DropdownUser />
              </div>
            ) : ( */}
            <div className="flex gap-3 lg:text-lg">
              <Button
                // variant="default_outline"
                className="flex gap-1 items-center"
                // onClick={() => signIn()}
              >
                <LogIn className={`w-[18px] md:w-[20px] xl:w-[22px] `} />
                <span className="hidden sm:flex md:hidden lg:flex">Login</span>
              </Button>
              <Link href="/auth/register">
                <Button variant="outline" className="flex  gap-1 items-center">
                  <PenSquare className={`w-[18px] md:w-[20px] xl:w-[22px] `} />
                  <span className="hidden sm:flex md:hidden lg:flex">
                    Register
                  </span>
                </Button>
              </Link>
            </div>
            {/* )} */}
            {menuOpen ? (
              <div
                className="flex md:hidden items-center"
                onClick={() => setMenuOpen(false)}
              >
                <XIcon className="h-7 w-7" />
              </div>
            ) : (
              <div
                className="flex md:hidden items-center"
                onClick={() => setMenuOpen(true)}
              >
                <Menu className="h-7 w-7" />
              </div>
            )}
          </div>
        </div>
      </Wrapper>

      {menuOpen && (
        <div className="bg-white/95 absolute w-full pb-4">
          <div className="flex md:hidden flex-col items-center justify-center">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={"/"}
                // href={link.href}
                className={`w-full border-b-2 border-primary py-2 text-center ${
                  pathname === link.href ? "text-primary" : "text-black"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
