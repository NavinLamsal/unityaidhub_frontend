import React from "react";
import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";
import { Button } from "../ui/button";
import Link from "next/link";
import { Posts } from "@/lib/types/Posts";

const PostsCard = ({ post }: { post?: Posts }) => {



  const percentagecalualate = 10;

  return (
    <Link href={`/dashboard/myPosts/${post?.id}`} className="bg-zinc-50 max-w-[300px] flex flex-col flex-shrink m-4 pb-2 dark:bg-zinc-700 cursor-pointer rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-900 shadow-lg drop-shadow-lg  ">
      <div className="relative rounded-t-md overflow-hidden">
        {post?.image && post.image.length > 0 ?
          <Image
            src={post?.image[0] as string}
            alt={post?.title as string}
            width={250}
            height={300}
            quality={90}
            className="w-full h-48 object-cover opacity-80 rounded-t-md "
          />
          :
         <>
          <Image
          src={'/defaultimage/dummyposter.png'}
          alt={post?.title as string}
          width={250}
          height={300}
          quality={90}
          className="w-full h-48 object-cover opacity-80 rounded-t-md block dark:hidden "
        />
         <Image
          src={'/defaultimage/dummyposterdark.png'}
          alt={post?.title as string}
          width={250}
          height={300}
          quality={90}
          className="w-full h-48 object-cover opacity-80 rounded-t-md hidden dark:block"
        />
         </>

        }
        <div className="absolute bottom-2 bg-red-700 text-white text-xs left-0 px-2 py-0.5 rounded-r-md">
          {/* {category ? category.name : ""} */}
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
          
          <div className="mt-0.5 mb-1">
            <p className="text-xs font-light">
              <span className="text-sm font-medium">${post?.currentAmount == null ? '0' : post?.currentAmount} raised</span>
              &nbsp;of {post?.goalAmount}
            </p>
            <div className=" relative w-full h-1 bg-zinc-500 dark:bg-zinc-50 rounded-full my-1 ">
              <div className={`absolute top-0 left-0 w-[${percentagecalualate}%] h-1 bg-Secondary group-hover:bg-white rounded-full`}></div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostsCard;
