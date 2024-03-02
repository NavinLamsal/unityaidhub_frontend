import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import data from "@/db.json"


const Categories = async() => {

  const {categories}= data
  
  return (
    <div className='mt-24 container '>
      <h1 className='text-xl sm:text-2xl md:text-3xl text-center font-semibold px-3 tracking-wider'>Causes you can raise funds for</h1>
      <p className=' text-base sm:text-lg p-4 text-center'>Be it for a personal need, social cause or a creative idea - you can count on us for the project that you want to raise funds for.</p>
      <div className='grid grid-cols-2 sm:grid-cols-3  md:grid-cols-4 lg:grid-cols-5 gap-3  px-4 my-4 '>
      {categories.map((cat)=>(
      <Link key={cat.id} href={{pathname:'/browse-a-campaign' , query:{category : `${cat.name}`}}}>
     <div className='group flex-col flex flex-1 items-center justify-center border-2 border-Primary dark:border-Secondary/30 dark:hover:border-white hover:border-Primary hover:text-Primary bg-Primary hover:bg-white dark:hover:bg-zinc-950 dark:bg-Secondary/30 rounded-sm py-8 duration-300 ease-in-out dark:hover:text-white'>
      <Image
        src={cat.blackicons}
        alt={cat.name}
        width={250}
        height={250}
        quality={100}
        className='h-24 w-24 text-white block dark:hidden group-hover:hidden'
      />
      <Image
        src={cat.whiteicons}
        alt={cat.name}
        width={250}
        height={250}
        quality={100}
        className='h-24 w-24 text-white hidden dark:block'
      />
      <Image
        src={cat.primaryicons}
        alt={cat.name}
        width={250}
        height={250}
        quality={100}
        className='h-24 w-24 text-white hidden dark:hidden group-hover:block dark:group-hover:hidden'
      />
      
      <h4 className='text-sm sm:text-base md:text-lg font-medium mt-1'>{cat.name}</h4>
     </div>
      </Link>
      ))}

      </div>
    </div>
  )
}

export default Categories
