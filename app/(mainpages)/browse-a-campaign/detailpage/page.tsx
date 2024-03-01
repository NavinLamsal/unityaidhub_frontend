import React from "react";
import { PiSirenFill } from "react-icons/pi";
import { IoIosInformationCircleOutline } from "react-icons/io";
import Carousel from '@/components/detailpage/Carousel'
import DonateCard from "@/components/detailpage/DonateCard";
import Tabcollections from "@/components/detailpage/Tabcollections";


import type { Metadata, ResolvingMetadata } from 'next'
 
type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
 
// export async function generateMetadata(
//   { params, searchParams }: Props,
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   // read route params
//   const id = params.id
 
//   // fetch data
//   const product = await fetch(`https://.../${id}`).then((res) => res.json())
 
//   // optionally access and extend (rather than replace) parent metadata
//   const previousImages = (await parent).openGraph?.images || []
 
//   return {
//     title: product.title,
//     openGraph: {
//       images: ['/some-specific-page-image.jpg', ...previousImages],
//     },
//   }
// }


const PostDetailPage = () => {
  return (
    <div className="container my-5 dark:bg-darkPrimary">
      <div className="flex flex-col">
        <div className="flex flex-col w-full gap-4">

          {/* // urgent  */}
          <div className="flex flex-1 mx-auto px-2 py-1 dark:bg-red text-red bg-red/20 rounded-full dark:text-white items-center">
            <PiSirenFill size={24} className="dark:text-white text-red " />
            <p className="pl-2 text-sm sm:text-lg md:text-xl">Fundraiser is in urgent need of funds</p>
          </div>

          {/* //donation charge */}
          <div className="flex flex-1 mx-auto px-2 py-1 dark:bg-Primary text-darkPrimary bg-Primary/20 rounded-full dark:text-white items-center">
            <IoIosInformationCircleOutline size={30} className="dark:text-white text-Primary " />
            <p className="px-1 text-center text-sm sm:text-lg md:text-xl">Unity Aid Hub will not charge any fee on your donation to this fundraiser.</p>
            <IoIosInformationCircleOutline size={30} className="dark:text-white text-Primary " />
          </div>

          <h1 className="sm:text-2xl text-xl text-center font-semibold leading-none tracking-tight my-5">My Little Boy Can’t Breathe, And I’m Helpless. Please Save Him For Me.</h1>
        </div>

        <div className="flex md:flex-row flex-col gap-3 mt-5">
          <div className="md:w-7/12 lg:w-8/12">
            <Carousel />
            <div className=" flex md:hidden my-4">
              <DonateCard />
            </div>
            <Tabcollections />
          </div>
          <div className="hidden md:block md:w-5/12 lg:w-4/12">
            <DonateCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;

// export async function generateMetadata({ params }: { params: { id: string } }, parent: ResolvingMetadata) {
//   // const post = await getPostById(params.id);
//   // return getMetadata(posts);
// }

const getMetadata = (post: any) => {
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: "website",
      url: `https://yourdomain.com/posts/${post.id}`,
      title: post.title,
      description: post.description,
      images: [
        {
          url: post.coverImage,
          width: 800,
          height: 600,
          alt: post.title,
        },
      ],
      locale: "en_US",
    },
    twitter: {
      cardType: "summary_large_image",
    }
  }
}