import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Facebook, FacebookIcon } from "lucide-react";
import Link from "next/link";
import {
  FaSquareFacebook,
  FaSquareXTwitter,
  FaLinkedin,
  FaSquareInstagram,
  FaSquareYoutube,
  FaSquareWhatsapp,
} from "react-icons/fa6";

const LearnMore = [
  {
    href: "/",
    name: "How UnityAidHub Works",
  },
  {
    href: "/",
    name: "Why UnityAidHub ",
  },
  {
    href: "/",
    name: "FAQ's",
  },
  {
    href: "/",
    name: "Sucess Stories",
  },
];

const Resources = [
  {
    href: "/",
    name: "Help Center",
  },
  {
    href: "/",
    name: "Blog",
  },
  {
    href: "/",
    name: "About",
  },
  {
    href: "/",
    name: "Careeers",
  },
];

const Footer = () => {
  return (
    <footer className="bg-Secondary/30 dark:bg-zinc-700 text-darkPrimary dark:text-white">
      <div className=" container lg:hidden flex flex-col items-start ">
        <div className="grid md:grid-cols-2 gap-4 my-4 w-full">
          <div className=" flex flex-col gap-4">
            <h1 className="max-w-lg text-xl font-semibold tracking-tight">
              Follow us on.
            </h1>
            <div className="flex flex-row flex-1  gap-1">
              <Link href="#" target="_blank" className="cursor-pointer">
                <FaSquareFacebook
                  size="36px"
                  className="text-darkPrimary dark:text-white"
                />
              </Link>
              <Link href="#" target="_blank" className="cursor-pointer">
                <FaSquareXTwitter
                  size="37px"
                  className="text-darkPrimary dark:text-white"
                />
              </Link>
              <Link href="#" target="_blank" className="cursor-pointer">
                <FaLinkedin
                  size="37px"
                  className="text-darkPrimary dark:text-white"
                />
              </Link>
              <Link href="#" target="_blank" className="cursor-pointer">
                <FaSquareInstagram
                  size="37px"
                  className="text-darkPrimary dark:text-white"
                />
              </Link>
              <Link href="#" target="_blank" className="cursor-pointer">
                <FaSquareYoutube
                  size="37px"
                  className="text-darkPrimary dark:text-white"
                />
              </Link>
              <Link href="#" target="_blank" className="cursor-pointer">
                <FaSquareWhatsapp
                  size="37px"
                  className="text-darkPrimary dark:text-white"
                />
              </Link>
            </div>
          </div>
          <div className=" flex flex-col gap-4">
            <h1 className="sm:max-w-lg text-xl font-semibold tracking-tight">
              Subscribe our newsletter.
            </h1>
            <div className="flex sm:flex-row flex-col gap-4 max-w-md">
              <Input id="email" type="email" placeholder="Email Address" />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-Secondary/70 dark:bg-zinc-900">
        <div className="container lg:hidden py-4">
          <div className="block md:hidden border-b-2 border-darkPrimary/30 dark:border-white/30 pb-4 mb-2">
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
          </div>
          <div className="flex flex-col-reverse md:grid md:grid-cols-5">
            <div className="flex flex-col items-start gap-4 md:col-span-2">
              <div className="hidden md:block">
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
              </div>

              <div className="flex flex-row flex-1  gap-1">
                <Link href="#" target="_blank" className="cursor-pointer">
                  <FaSquareFacebook
                    size="36px"
                    className="text-darkPrimary dark:text-white"
                  />
                </Link>
                <Link href="#" target="_blank" className="cursor-pointer">
                  <FaSquareXTwitter
                    size="37px"
                    className="text-darkPrimary dark:text-white"
                  />
                </Link>
                payment
              </div>
            </div>
            <div className="grid sm:grid-cols-2 md:col-span-3">
              <div className="flex flex-col items-start">
                <h1 className="font-bold text-xs md:text-sm tracking-wide  py-1.5">
                  Learn more
                </h1>
                {LearnMore.map((items) => (
                  <Link
                    key={items.name}
                    href={items.href}
                    className="flex font-light text-xs  md:text-sm tracking-wide  py-1.5"
                  >
                    {items.name}
                  </Link>
                ))}
              </div>
              <div className="flex flex-col items-start">
                <h1 className="font-bold text-xs md:text-sm tracking-wide  py-1.5">
                  Learn more
                </h1>
                {LearnMore.map((items) => (
                  <Link
                    key={items.name}
                    href={items.href}
                    className="flex font-light text-xs  md:text-sm tracking-wide  py-1.5"
                  >
                    {items.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* large screen display of footer  */}
        <div className="container hidden lg:block py-4">
          <div className="grid grid-cols-6">
            <div className="col-span-2 flex flex-col items-start gap-4">
              <Image
                src={`/Logo/landscape.png`}
                alt="logo"
                width={750}
                height={750}
                quality={100}
                className="h-20 w-auto"
              />
              <div className=" flex flex-col gap-4">
                <h1 className="sm:max-w-lg text-xl font-semibold tracking-tight">
                  Subscribe our newsletter.
                </h1>
                <div className="flex sm:flex-row flex-col gap-4 max-w-md">
                  <Input id="email" type="email" placeholder="Email Address" />
                  <Button>Subscribe</Button>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start">
              <h1 className="font-bold text-xs md:text-sm tracking-wide  py-1.5">
                Learn more
              </h1>
              {LearnMore.map((items) => (
                <Link
                  key={items.name}
                  href={items.href}
                  className="flex font-light text-xs  md:text-sm tracking-wide  py-1.5"
                >
                  {items.name}
                </Link>
              ))}
            </div>
            <div className="flex flex-col items-start">
              <h1 className="font-bold text-xs md:text-sm tracking-wide  py-1.5">
                Learn more
              </h1>
              {LearnMore.map((items) => (
                <Link
                  key={items.name}
                  href={items.href}
                  className="flex font-light text-xs  md:text-sm tracking-wide  py-1.5"
                >
                  {items.name}
                </Link>
              ))}
            </div>
            <div className="col-span-2 flex flex-col items-end gap-2">
              {/* large screen icons  */}
              <div className=" flex flex-col gap-4 items-end">
                <h1 className="max-w-lg text-xl font-semibold tracking-tight">
                  Follow us on.
                </h1>
                <div className="flex flex-row flex-1  gap-1">
                  <Link href="#" target="_blank" className="cursor-pointer">
                    <FaSquareFacebook
                      size="36px"
                      className="text-darkPrimary dark:text-white"
                    />
                  </Link>
                  <Link href="#" target="_blank" className="cursor-pointer">
                    <FaSquareXTwitter
                      size="37px"
                      className="text-darkPrimary dark:text-white"
                    />
                  </Link>
                  <Link href="#" target="_blank" className="cursor-pointer">
                    <FaLinkedin
                      size="37px"
                      className="text-darkPrimary dark:text-white"
                    />
                  </Link>
                  <Link href="#" target="_blank" className="cursor-pointer">
                    <FaSquareInstagram
                      size="37px"
                      className="text-darkPrimary dark:text-white"
                    />
                  </Link>
                  <Link href="#" target="_blank" className="cursor-pointer">
                    <FaSquareYoutube
                      size="37px"
                      className="text-darkPrimary dark:text-white"
                    />
                  </Link>
                  <Link href="#" target="_blank" className="cursor-pointer">
                    <FaSquareWhatsapp
                      size="37px"
                      className="text-darkPrimary dark:text-white"
                    />
                  </Link>
                </div>
              </div>
              {/* large screen payments  */}
              <div className="flex flex-row flex-1  gap-1 items-end">
                <Link href="#" target="_blank" className="cursor-pointer">
                  <FaSquareFacebook
                    size="36px"
                    className="text-darkPrimary dark:text-white"
                  />
                </Link>
                <Link href="#" target="_blank" className="cursor-pointer">
                  <FaSquareXTwitter
                    size="37px"
                    className="text-darkPrimary dark:text-white"
                  />
                </Link>
                payment
              </div>

            </div>
          </div>
        </div>
      </div>
      <div className=" border-t-2 border-darkPrimary/30 dark:border-white/30 flex items-center p-4 w-full">
         <p className=" w-full text-center">Copyright &copy; 2023 Unity Aid Hub</p>
      </div>
    </footer>
  );
};

export default Footer;
