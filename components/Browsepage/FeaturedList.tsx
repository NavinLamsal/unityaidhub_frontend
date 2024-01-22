'use client'
import React from 'react'
import FundraisingCard from '../Card/fundraisingCard'
import Pagination from '../ui/pagination'
import router from 'next/router';

const FeaturedList = () => {
    const handlePageChange = (pageNumber: number) => {

        router.push({
            // pathname: router.pathname,
            query: { ...router.query, page: pageNumber },
        });

    };
    return (
        <div>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ">
                    <FundraisingCard />
                    <FundraisingCard />
                    <FundraisingCard />
                    <FundraisingCard />
                    <FundraisingCard />
                    <FundraisingCard />
                    <FundraisingCard />
                    <FundraisingCard />
                </div>
                <Pagination
                    currentPage={1}
                    totalPages={4}
                    onPageChange={handlePageChange}
                />
                {/* <div className="mt-6 space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            Picked for You
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Always help people in need.
                          </p>
                        </div> */}

                {/* <div className="relative"> */}
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
                {/* </div> */}
            </div>
        </div>
    )
}

export default FeaturedList
