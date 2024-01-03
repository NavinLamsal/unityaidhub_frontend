import FundraisingCard from "@/components/Card/fundraisingCard";
import React from "react";

import { Metadata } from "next";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sidebar } from "@/components/categorypage/sidebar";

// export const metadata: Metadata = {
//   title: "Music App",
//   description: "Example music app using the components.",
// }

export default function Page() {
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
          <div className="grid text-zinc-950">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl  font-bold tracking-wider">
              Browse a Campaign
            </h1>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg  font-normal tracking-wider">
              {
                "Life is Short journey, Enjoy it by shareing and carig with each other."
              }
            </p>
          </div>
        </div>
      </div>
    
    <div className="container">
      {/* {* <Image
        //   src="/examples/music-light.png"
        //   width={1280}
        //   height={1114}
        //   alt="Music"
        //   className="block dark:hidden"
        // />
        // <Image
        //   src="/examples/music-dark.png"
        //   width={1280}
        //   height={1114}
        //   alt="Music"
        //   className="hidden dark:block"
        // /> *} */}

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
                        <Button>
                          {/* <PlusCircledIcon className="mr-2 h-4 w-4" /> */}
                          Create Campaign
                        </Button>
                      </div>
                    </div>
                    <div className="border-none p-0 outline-none">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            Donate Now
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Need help urgently.
                          </p>
                        </div>
                      </div>
                      <div className="relative">
                        {/* <ScrollArea>
                          <div className="flex space-x-4 pb-4">
                            {listenNowAlbums.map((album) => (
                              <AlbumArtwork
                                key={album.name}
                                album={album}
                                className="w-[250px]"
                                aspectRatio="portrait"
                                width={250}
                                height={330}
                              />
                            ))}
                          </div>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea> */}
                      </div>
                      <div className="mt-6 space-y-1">
                        <h2 className="text-2xl font-semibold tracking-tight">
                          Picked for You
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          Always help people in need.
                        </p>
                      </div>

                      <div className="relative">
                        {/* <ScrollArea>
                          <div className="flex space-x-4 pb-4">
                            {madeForYouAlbums.map((album) => (
                              <AlbumArtwork
                                key={album.name}
                                album={album}
                                className="w-[150px]"
                                aspectRatio="square"
                                width={150}
                                height={150}
                              />
                            ))}
                          </div>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea> */}
                      </div>
                    </div>
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
