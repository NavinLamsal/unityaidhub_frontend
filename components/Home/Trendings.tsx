import React from 'react'
import TrendingPost from './TrendingPost'
import { getPost } from '@/lib/action/actions';
import { useQuery } from '@tanstack/react-query';
import { Posts } from '@/lib/types/Posts';

const Trendings = () => {

  // const { data, isLoading, error } = useQuery(
  //   {
  //     queryKey: ['posts'],
  //     queryFn: async () => {
  //       return await getPost();
  //     },
  //     staleTime: 1000, // Use Infinity for staleTime to keep the data fresh"
  //   }
  // );

  return (
    <div className='container mt-20'>
      <h1 className='text-xl sm:text-2xl md:text-3xl text-center font-semibold px-3 tracking-wider'>Active Campaigns</h1>
      <p className="text-base sm:text-lg p-4 text-center">some of urgents campaigns right now </p>
      {/* {isLoading && <>Loading...</>}
      {error && <>{error.message}</>} */}
      {/* <TrendingPost post={data as Posts[]}/> */}
      <TrendingPost/>
    </div>
  )
}

export default Trendings
