"use client";
import React, { useRef } from "react";
// import { Wrapper } from "../ui/Wrapper";
// import SectionHead from "../ui/SectionHead";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
export default function Carousel({
  className,
  title,
  children,
}: {
  className?: string;
  title: string;
  children: React.ReactNode;
}) {
  const settings = {
    //   dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay:true,
    autoplaySpeed: 4000,
    mobileFirst: true,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          // initialSlide: 2
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          // initialSlide: 2
        },
      },
    //   {
    //     breakpoint: 640,
    //     settings: {
    //       slidesToShow: 1,
    //       slidesToScroll: 1,
    //     },
    //   },
    ],
  };

  const sliderRef = useRef<Slider | null>(null);

  const nextSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const prevSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  return (
    <div className={`relative h-full z-10 container ${className}`} >
      <div className="flex justify-end items-center">
        {/* <SectionHead className=" mx-auto" title={title} /> */}

        <div className="flex items-center gap-2 ">
          <span
            className={`text-3xl  cursor-pointer z-10 border-2 border-Primary text-Primary bg-white block p-2 hover:bg-Primary hover:text-white transition-all duration-300 rounded-[3px]`}
            onClick={prevSlide}
          >
            <ChevronLeft />
          </span>

          <span
            className={`text-3xl cursor-pointer z-10 border-2 border-Primary text-Primary bg-white block p-2 hover:bg-Primary hover:text-white transition-all duration-300 rounded-[3px]`}
            onClick={nextSlide}
          >
            <ChevronRight />
          </span>
        </div>
      </div>
      <Slider ref={sliderRef} {...settings} className=" py-10 gap-5 m-3">
        {children}
      </Slider>
    </div>
  );
}
