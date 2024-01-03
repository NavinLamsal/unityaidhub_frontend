import React from 'react'
import TrendingPost from './TrendingPost'

const Trendings = () => {
  return (
    <div className='container mt-20'>
      <h1 className='text-xl sm:text-2xl md:text-3xl text-center font-semibold px-3 tracking-wider'>Active Campaigns</h1>
      <p className="text-base sm:text-lg p-4 text-center">some of urgents campaigns right now </p>
      <TrendingPost/>
    </div>
  )
}

export default Trendings
