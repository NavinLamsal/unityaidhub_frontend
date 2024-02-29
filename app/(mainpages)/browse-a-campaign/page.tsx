import FundraisingCard from "@/components/Card/fundraisingCard";
import React from "react";

import { Metadata } from "next";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/categorypage/sidebar";

import FeaturedList from "@/components/Browsepage/FeaturedList";
import Link from "next/link";
import { getPost } from "@/components/action/actions";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

export const metadata: Metadata = {
  title: "Camapigns",
  description: "this is the page to list campaign page",
}

 export default async function Page({
  searchParams,
}: {
  searchParams?: {
    category?: string; 
    status?: string; 
    sortBy?: string;
    page?: string;
  };
}) {

 
  const category = searchParams?.category || '';
  const status = searchParams?.status || '';
  const sortBy = searchParams?.sortBy || '';
  const currentPage = Number(searchParams?.page) || 1;
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(
  {
    queryKey: ["posts", category, status, sortBy, currentPage],
    queryFn: async () => {
      return await getPost(category, status, sortBy, currentPage);
    }
  },
);


  return (
    <>
      <div className=" max-w-[1500px] mx-auto relative pt-12 pb-20 md:pt-12 md:pb-20 xl:pt-12 xl:pb-24 bg-gradient-to-r from-Secondary/[0.9] to-Secondary/[0.4]">
        <div className="container">
          <div className="absolute right-4 bottom-0 h-[130px] w-[150px] opacity-95 sm:h-[170px] sm:w-[180px] md:h-[170px] md:w-[180px] lg:h-[220px] lg:w-[220px] xl:h-[220px] xl:w-[220px]">
            <Image
              src={`/HumanitarianHelpbro.png`}
              alt="Man_In_Whiteshirt"
              className="object-cover object-center"
              fill
              sizes=""
            />
          </div>
          <div className="grid text-zinc-950 dark:text-zinc-50">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl  font-bold tracking-wider">
              Browse a Campaign
            </h1>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg  font-normal tracking-wider">
              {
                "Life is Short journey, Enjoy it by sharing and caring with each other."
              }
            </p>
          </div>
        </div>
      </div>


      <div className="container">
        <div className="block">
          <div className="">
            <div className="bg-background">
              <div className="grid lg:grid-cols-5">
             
              <Sidebar className="hidden lg:block" />
                      
                
                <div className="col-span-3 lg:col-span-4 lg:border-l border-zinc-300">
                  <div className="h-full px-4 py-6 lg:px-8">
                    <div className="h-full space-y-6">
                      <div className="space-between flex items-center">
                        <div className="flex lg:hidden">
                          category for screen below md
                        </div>
                        <div className="ml-auto mr-4 hidden sm:block">
                          <Link href={'/start-a-campaigning'}>
                          <Button>
                            Create Campaign
                          </Button>
                          
                          </Link>
                        </div>
                      </div>
                      <HydrationBoundary state={dehydrate(queryClient)}>
                      <FeaturedList/>
                      </HydrationBoundary>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
