'use client'
import React from 'react'
import FundraisingCard from '../Card/fundraisingCard'
import Pagination from '../ui/pagination'
import { getPost } from '../action/actions';
import { useQuery } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const FeaturedList = () => {
    // const {data, error , isFetched} = useQuery({
    //   queryKey:["posts"],
    //   queryFn: getPost,
    // })

    const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

    const handlePageChange = (pageNumber: number) => {
      const queryParams = new URLSearchParams(searchParams);
        queryParams.set('page', pageNumber.toString() );
        replace(`${pathname}?${queryParams.toString()}`);
    };
    // if(error) <h2>{error.message}</h2>
    // if(data){
    //   console.log(data.data)
    // }
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
                    currentPage={parseInt(searchParams.get("page")?? '1')}
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
