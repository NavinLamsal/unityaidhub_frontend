import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

const PagesLoading = () => {
 
      return (
        <>
          <div className="max-w-[1500px] mb-4 md:mb-0 w-full mx-auto relative pt-12 pb-20 md:pt-12 md:pb-20 xl:pt-12 xl:pb-24 bg-gradient-to-r from-Secondary/[0.9] to-Secondary/[0.4]">
            <div className="absolute right-4 bottom-0 h-[130px] w-[150px] opacity-95 sm:h-[170px] sm:w-[180px] md:h-[170px] md:w-[180px] lg:h-[220px] lg:w-[220px] xl:h-[220px] xl:w-[220px]">
          
            </div>
            <div className="grid text-zinc-950 dark:text-zinc-50">
              <h2 className=" text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-semibold text-zinc-950 dark:text-zinc-50 leading-tight">
                <Skeleton className="w-[300] h-10 mb-4" />
              </h2>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row lg:space-x-12">
            <div className="px-4 lg:px-0 mt-12 text-zinc-800 dark:text-zinc-200 text-lg leading-relaxed w-full lg:w-3/4">
              <Skeleton className="w-full h-6 mb-4" />
              <Skeleton className="w-full h-6 mb-4" />
              <Skeleton className="w-full h-6 mb-4" />
              <Skeleton className="w-full h-6 mb-4" />
              <Skeleton className="w-full h-[300px] mb-4" />
              <Skeleton className="w-full h-6 mb-4" />
              <Skeleton className="w-full h-6 mb-4" />
            </div>
          </div>
        </>
      );
      } 

export default PagesLoading

