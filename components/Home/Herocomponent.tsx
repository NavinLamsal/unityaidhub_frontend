import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Search } from "lucide-react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Input } from "../ui/input";

function HeroSection() {
  return (
    <div className="relative bg-Secondary/25">
      <div className="container m-auto px-6 pt-32 md:px-12 lg:pt-5 lg:px-7">
        <div className="flex items-center flex-wrap px-2 md:px-0">
          <div className="relative lg:w-6/12 lg:py-24 xl:py-28">
            <h1 className="font-bold text-4xl text-yellow-900 md:text-5xl lg:w-10/12">
              Beyond Borders: Healing Hands, Shared Dreams
            </h1>
            <form action="" className="w-full mt-12">
              <div className="relative flex  rounded-full bg-white border border-yellow-200 shadow-md  ">
                <button
                  className="p-3 rounded-l-full bg-Primary dark:bg-darkPrimary block md:p-4"
                  name="search"
                >
                  <div>
                    <FaMagnifyingGlass />
                  </div>
                </button>
                <input
                  placeholder="Search for Change, Donate for Hope"
                  className="w-full h-full p-4 rounded-r-full   border border-zinc-200 bg-white  placeholder:text-zinc-500 focus-visible:outline-none  focus-visible:ring-zinc-950 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950  dark:placeholder:text-zinc-400 dark:focus-visible:ring-border-zinc-800"
                  type="text"
                />
              </div>
            </form>
            <p className="mt-8 text-gray-700 lg:w-10/12">
              Unite hearts, transform lives where compassion meets meaningful
              impact. every donation and every act of kindness is a catalyst for
              change.
            </p>
            <Link href="/" >
            <Button className="rounded-full my-5 text-2xl px-8 py-8"> Start a Campaing</Button>
            </Link>
            
          </div>
          <div className=" -mb-24 lg:-mb-56 lg:w-6/12 mx-auto">
            <Image
              src="/HumanitarianHelpbro.png"
              className="relative lg:w-full"
              alt="Help illustration"
              loading="lazy"
              width="500"
              height="500"
              quality={100}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
