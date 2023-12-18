import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

function HeroSection() {
  return (
    <div className=" ">
      <div className="relative h-[91vh]">
        <div
          className="absolute w-full h-full"
          style={{
            backgroundImage: 'url("sampleimage.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center flex-col text-white">
          <div className="text-3xl md:text-4xl lg:text-5xl font-semibold md:tracking-widest mb-6 lg:mb-12">
            <h1 className="text-center">
              Reliable Matchmaking & Matrimony Services
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:flex items-center justify-center text-sm md:text-base gap-1 md:gap-3 lg:gap-12 text-black py-4 lg:py-8 bg-black/30 w-full px-5">
            <div className="">
              <span className="text-white ">I am Looking For</span>{" "}
              {/* <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Female" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select> */}
            </div>
            <div className="">
              <span className="text-white">Age</span>{" "}
              <div className="flex">
                {/* <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="20" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 10 }, (_, index) => (
                      <SelectItem key={index} value={String(20 + index)}>
                        {20 + index}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>{" "} */}
                <span className="text-white items-center justify-center flex mx-3 lg:mx-5">
                  {" "}
                  to
                </span>
                {/* <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="29" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 10 }, (_, index) => (
                      <SelectItem key={index} value={String(20 + index)}>
                        {21 + index}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>{" "} */}
              </div>
            </div>
            <div className="">
              <span className="text-white ">Religion</span>{" "}
              {/* <Select>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Hinduism">Hinduism</SelectItem>
                  <SelectItem value="Buddhism">Buddhism</SelectItem>
                  <SelectItem value="Christianity">Christianity</SelectItem>
                  <SelectItem value="Islam">Islam</SelectItem>
                  <SelectItem value="Sikhism">Sikhism</SelectItem>
                  <SelectItem value="Judaism">Judaism</SelectItem>
                  <SelectItem value="Others">Others</SelectItem>
                </SelectContent>
              </Select> */}
            </div>
            <div className="">
              <span className="text-white ">Living in</span>{" "}
              {/* <Select>
                <SelectTrigger className="min-w-[140px]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bagmati">Bagmati Province</SelectItem>
                  <SelectItem value="Gandaki">Gandaki Province</SelectItem>
                  <SelectItem value="Madhesh">Madhesh Province</SelectItem>
                  <SelectItem value="Lumbini">Lumbini Province</SelectItem>
                  <SelectItem value="Karnali">Karnali Pradesh</SelectItem>
                  <SelectItem value="Koshi">Koshi Province</SelectItem>
                  <SelectItem value="Sudurpashchim">
                    Sudurpashchim Province
                  </SelectItem>
                </SelectContent>
              </Select> */}
            </div>

            <Button className=" bg-secondary mt-6 border-2 border-secondary hover:text-secondary hover:bg-white transition-all duration-300 text-base">
              Let&apos;s Begin
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;

