import React from "react";
import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";
import { Button } from "../ui/button";
import Link from "next/link";
import { Posts } from "@/lib/types/Posts";

const FundraisingCard = ({post}:{post?:Posts}) => {

  // let percentageAchieved = 0;
  // if(post?.goalAmount)
  //   percentageAchieved = (post?.currentAmount?? 0 / post.goalAmount?? 0) * 100 ;
  // }

  return (
  
    <Link href={`/browse-a-campaign/${post?.id}`} className="bg-zinc-50 max-w-[300px] flex flex-col flex-shrink m-4 pb-2 dark:bg-zinc-700 cursor-pointer rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-900 shadow-lg drop-shadow-lg  ">
      <div className="relative rounded-t-md overflow-hidden">
        <Image
          src={post?.image[0] as string}
          alt={post?.title as string}
          width={250}
          height={300}
          quality={90}
          className="w-full h-48 object-cover opacity-80 rounded-t-md "
        />
        <div className="absolute bottom-2 bg-red-700 text-white text-xs left-0 px-2 py-0.5 rounded-r-md">
          Health
        </div>
        <div className="absolute bottom-1 right-0 flex items-center text-xs font-medium rounded-r-md text-black bg-Secondary/30 dark:bg-zinc-400/70 px-1 py-0.5">
          <FaLocationDot size={16} />
          {post?.country}
        </div>
      </div>
      <div className="px-2 grid justify-around">
        <h1 className="mt-1 mb-0.5 font-medium  text-sm ">
          {post?.title}
        </h1>
        <div className="flex flex-col gap-4 my-0.5">
          <div className="flex gap-2 items-center">
            <Image
              src={"/sampleProfile.jpg"}
              alt="profile"
              width={32}
              height={32}
              quality={100}
              className="h-5 w-5 rounded-full object-cover"
            />
            <p className="text-xs font-light">by:&nbsp;{"Navin Lamsal"}</p>
          </div>
          <div className="mt-0.5 mb-1">
            <p className="text-xs font-light">
              <span className="text-sm font-medium">${post?.currentAmount} raised</span>
              &nbsp;of ${post?.goalAmount}
            </p>
            <div className=" relative w-full h-1 bg-zinc-700 dark:bg-zinc-50 rounded-full my-1 ">
              <div className={`absolute top-0 left-0 w-[${((post?.currentAmount ?? 0) / (post?.goalAmount ?? 1)) * 100}%] h-1 bg-Secondary group-hover:bg-white rounded-full`}></div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 justify-between px-2 pb-2 w-full  gap-2 ">
        <Link href={`/browse-a-campaign/${post?.id}`}>
        <Button
        suppressHydrationWarning
          variant="default_outline"
          className=" w-full font-bold bg-Primary text-zinc-50 hover:bg-zinc-700/5 border border-Primary hover:border-black dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-900/5   hover:text-black  dark:hover:text-white dark:border-zinc-50 dark:hover:border-zinc-50"
        >
          Donate
        </Button>
        
        </Link>
        <Link href={`/browse-a-campaign/${post?.id}`}>
        <Button
        suppressHydrationWarning
        variant="outline" className="border w-full border-zinc-900 bg-white/5 hover:border-Primary hover:bg-Primary hover:text-zinc-50 dark:border-zinc-50 dark:bg-zinc-700/0 dark:hover:bg-zinc-50 dark:hover:text-black">
          Share
        </Button>
        </Link>
      </div>
    </Link>
  );
};

export default FundraisingCard;
