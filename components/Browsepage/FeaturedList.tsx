'use client'
import React from 'react'
import FundraisingCard from '../Card/fundraisingCard'
import Pagination from '../ui/pagination'
import { getPost } from '../../lib/action/actions';
import { useQuery } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Posts } from '@/lib/types/Posts';

const FeaturedList = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const category = searchParams.get('category') || '';
  const status = searchParams.get('status') || '';
  const sortBy = searchParams.get('sortBy') || '';
  const currentPage = Number(searchParams.get('page') || '1');

  const { data, isLoading, error } = useQuery(
    {
      queryKey: ['posts', category, status, sortBy, currentPage],
      queryFn: async () => {
        return await getPost(category, status, sortBy, currentPage);
      },
      staleTime: 1000, // Use Infinity for staleTime to keep the data fresh"
    }
  );

  // const totalPages = data?.totalPages?? 1|| 1;
  const totalPages = 1;

  const handlePageChange = (pageNumber: number) => {
    const queryParams = new URLSearchParams(searchParams);
    queryParams.set('page', pageNumber.toString());
    replace(`${pathname}?${queryParams.toString()}`);
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  console.log("data",data)
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
          {data && (data as Posts[]).map((post: Posts) => (
            <FundraisingCard key={post.id} post={post} />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  )
}

export default FeaturedList;
