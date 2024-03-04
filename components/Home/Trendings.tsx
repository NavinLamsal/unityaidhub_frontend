import React, { Suspense } from 'react'
import TrendingPost from './TrendingPost'
import { getPost } from '@/lib/action/actions';
import { Posts } from '@/lib/types/Posts';

const FetchedTrendings = async () => {

  const data = await getPost()

  return (
    <div className='container mt-20'>
      <h1 className='text-xl sm:text-2xl md:text-3xl text-center font-semibold px-3 tracking-wider'>Active Campaigns</h1>
      <p className="text-base sm:text-lg p-4 text-center">some of urgents campaigns right now </p>
      <TrendingPost post={data as Posts[]} />
    </div>
  )
}

const Trendings = async () => {


  return (

    <Suspense fallback={<div>Loading...</div>}>
      <FetchedTrendings />
    </Suspense>

  );
};


export default Trendings
