
import { formatDate } from '@/lib/reuseableFunctions/FormatDate'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Pagedata {

  "id":number;
  "title": string,
  "description": string,
  "imageUrl": string[],
  "author": string,
  "categoryId": number,
  "updatedAt": string,
  "createdAt": string
}

const BlogCard = ({blog}:{blog:Pagedata}) => {
  return (

    <Link  href={`/blog/${blog.id}`} className="flex flex-col items-start col-span-12 space-y-3 sm:col-span-6 md:col-span-4 xl:col-span-4 text-zinc-950 dark:text-zinc-50 rounded-lg">
    <Image
        src={blog.imageUrl[0] as string} alt="image" width={300} height={300} quality={100} className="object-cover w-full mb-2 overflow-hidden rounded-t-lg  shadow-sm max-h-56 btn-"/>
        <div className='px-2 pb-2 flex flex-col gap-1'>

    <p className="bg-Primary flex items-center leading-none text-sm font-medium text-gray-50 pt-1.5 pr-3 pb-1.5 pl-3 rounded-full uppercase w-fit ">{blog?.categoryId}</p>
    <a className="text-sm font-bold sm:text-lg md:text-xl leading-6">{blog?.title}</a>
    <p className="text-sm line-clamp-3">
    {/* <PortableText
              value={blog.body}
            /> */}
            {blog?.description}
            </p>
    <div className="pt-2 pr-0 pb-0 pl-0">
      <a className="inline text-xs font-medium mt-0 mr-1 mb-0 ml-0 underline">{blog?.author}</a>
      <p className="inline text-xs font-medium mt-0 mr-1 mb-0 ml-1">{formatDate(blog?.updatedAt)}</p>
    </div>
        </div>
  </Link>
    
  )
}

export default BlogCard
