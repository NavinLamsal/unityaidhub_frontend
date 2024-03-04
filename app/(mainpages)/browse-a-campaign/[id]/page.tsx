import React, { Suspense } from "react";
import { PiSirenFill } from "react-icons/pi";
import { IoIosInformationCircleOutline } from "react-icons/io";
import Carousel from '@/components/detailpage/Carousel'
import DonateCard from "@/components/detailpage/DonateCard";
import Tabcollections from "@/components/detailpage/Tabcollections";


import type { Metadata, ResolvingMetadata } from 'next'
import { getPostdetail } from "@/lib/action/actions";
import { Posts } from "@/lib/types/Posts";
import { getUser } from "@/lib/action/getUserData";
import { User } from "@/lib/types/User";

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

export async function generateStaticParams() {
 async function getPostsIds() {
    try {
      const data:Posts[] = await fetch("http://localhost:8000/posts").then(
        (res) => res.json()
      );
      const postIds = data.map((post: Posts) => post.id.toString())
      return postIds as string[];
    } catch (error) {
      console.log(error)
      return [] as string[];
    }
  }


  const post:string[] = await getPostsIds();

  return post.map((page) => ({
      id: page,
  })
  )
}


const PostDetail = async ({ id }: { id: string  }) => {

  const data:Posts = await getPostdetail(id);
  const user:User = await getUser()

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

          <h1 className="sm:text-2xl text-xl text-center font-semibold leading-none tracking-tight my-5">{data.title}</h1>
        </div>

        <div className="flex md:flex-row flex-col gap-3 mt-5">
          <div className="md:w-7/12 lg:w-8/12">
            <Carousel images={data.image}/>
            <div className=" flex md:hidden my-4">
              <DonateCard post={data} userId ={user.id}/>
            </div>
            <Tabcollections post={data}/>
          </div>
          <div className="hidden md:block md:w-5/12 lg:w-4/12">
            <DonateCard post={data} userId ={user.id}/>
          </div>
        </div>
      </div>
    </div>
  );
};

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
      <div className="grid dark:text-white text-zinc-950">
          <Suspense fallback={<div>Loading...</div>}>
              <PostDetail id={id} />
          </Suspense>
      </div>
  );
};
export default Page;

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