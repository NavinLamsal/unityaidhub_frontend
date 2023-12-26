import React from "react";
import { PiSirenFill } from "react-icons/pi";
import { IoIosInformationCircleOutline } from "react-icons/io";
import Carousel from '@/components/detailpage/Carousel'


const PostDetailPage = () => {
  return (
    <div className="container my-5 dark:bg-darkPrimary">
      <div className="flex flex-col">
        <div className="flex flex-col w-full gap-4">
        <div className="flex flex-1 mx-auto px-2 py-1 dark:bg-red text-red bg-red/20 rounded-full dark:text-white items-center">
          <PiSirenFill size={24} className="dark:text-white text-red " />
          <p className="pl-2 text-sm sm:text-lg md:text-xl">Fundraiser is in urgent need of funds</p>
        </div>
        <div className="flex flex-1 mx-auto px-2 py-1 dark:bg-Primary text-darkPrimary bg-Primary/20 rounded-full dark:text-white items-center">
          <IoIosInformationCircleOutline size={30} className="dark:text-white text-Primary " />
          <p className="px-1 text-center text-sm sm:text-lg md:text-xl">Unity Aid Hub will not charge any fee on your donation to this fundraiser.</p>
          <IoIosInformationCircleOutline size={30} className="dark:text-white text-Primary " />
        </div>
        </div>
        <div className="flex lg:flex-row flex-col">
        <div className=" lg:w-8/12">
            <Carousel />
        </div>
        <div className="lg:w-4/12">
        hello
        </div>

        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;
