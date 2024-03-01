
import BlogCard from '@/components/Card/BlogCard';
import { formatDate } from '@/lib/reuseableFunctions/FormatDate';
import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import data from "@/db.json"

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

export const revalidate = 600


async function LatestBlog({ blog }: { blog: Pagedata }) {
    const data: Pagedata[] = await fetch(
        `http://localhost:8000/blog`, { next: { revalidate: 3600 } }
    ).then((res) => (res.json()));
    if(data){
        const blogs = data[0];
        return (
                <div className="flex flex-col-reverse items-center sm:px-5 md:flex-row text-zinc-950 dark:text-zinc-50">
                    <div className="flex flex-col items-start justify-center w-full h-full pt-6 pr-0 pb-6 pl-0 mb-6 md:mb-0 md:w-1/2">
                        <div className="flex flex-col items-start justify-center h-full space-y-3 transform md:pr-10 lg:pr-16 md:space-y-5">
                            <div className="bg-green-500 flex items-center leading-none rounded-full text-gray-50 pt-1.5 pr-3 pb-1.5 pl-2 uppercase ">
                                <p className="inline-flex items-center gap-0.5">
                                    <Star size={12} />
                                </p>
                                <p className="inline text-xs font-medium">New</p>
                            </div>
                            <Link href={`/blog/${blogs?.id.toString()}`} className="text-xl font-bold leading-none lg:text-2xl xl:text-3xl ">{blogs?.title}</Link>
                            <div className="pt-2 pr-0 pb-0 pl-0">
                                <p className="text-sm font-medium inline">author:</p>
                                <a className="inline text-sm font-medium mt-0 mr-1 mb-0 ml-1 underline">{blogs?.author}</a>
                                <p className="inline text-sm font-medium mt-0 mr-1 mb-0 ml-1">· {formatDate(blogs?.updatedAt)} ·</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2">
                        <div className="block">
                            <Image
                                src={blogs.imageUrl[0] as string} width={500} height={500} quality={100} alt='bigimage' className="object-cover rounded-lg max-h-64 sm:max-h-96 btn- w-full h-full" />
                        </div>
                    </div>
                </div>
            )
        
    }else{
        return (
            <div className="flex flex-col-reverse items-center sm:px-5 md:flex-row text-zinc-950 dark:text-zinc-50">
                <div className="flex flex-col items-start justify-center w-full h-full pt-6 pr-0 pb-6 pl-0 mb-6 md:mb-0 md:w-1/2">
                    <div className="flex flex-col items-start justify-center h-full space-y-3 transform md:pr-10 lg:pr-16 md:space-y-5">
                        <div className="bg-green-500 flex items-center leading-none rounded-full text-gray-50 pt-1.5 pr-3 pb-1.5 pl-2 uppercase ">
                            <p className="inline-flex items-center gap-0.5">
                                <Star size={12} />
                            </p>
                            <p className="inline text-xs font-medium">New</p>
                        </div>
                        <Link href={`/blog/${blog?.id}`} className="text-xl font-bold leading-none lg:text-2xl xl:text-3xl ">{blog?.title}</Link>
                        <div className="pt-2 pr-0 pb-0 pl-0">
                            <p className="text-sm font-medium inline">author:</p>
                            <a className="inline text-sm font-medium mt-0 mr-1 mb-0 ml-1 underline">{blog?.author}</a>
                            <p className="inline text-sm font-medium mt-0 mr-1 mb-0 ml-1">· {formatDate(blog?.updatedAt)} ·</p>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2">
                    <div className="block">
                        <Image
                            src={blog.imageUrl[0] as string} width={500} height={500} quality={100} alt='bigimage' className="object-cover rounded-lg max-h-64 sm:max-h-96 btn- w-full h-full" />
                    </div>
                </div>
            </div>
        )
    }
}

async function BlogList({ blog }: { blog: Pagedata[] }) {
    const data: Pagedata[] = await fetch(
        `http://localhost:8000/blog`, { next: { revalidate: 3600 } }
    ).then((res) => (res.json()));
    if(data){
        const blogs = data;
        return (
            <div className="grid grid-cols-12 grid-rows-1 sm:px-5 gap-x-8 gap-y-16">
                {blogs.length > 1 && blogs.slice(1, blog.length).map((item: any) => (
                    <BlogCard key={item?.id} blog={item} />
                ))
                }
            </div>
        )
    }else{
        return (
            <div className="grid grid-cols-12 grid-rows-1 sm:px-5 gap-x-8 gap-y-16">
                {blog.length > 1 && blog.slice(1, blog.length).map((item: any) => (
                    <BlogCard key={item?.id} blog={item} />
                ))
                }
            </div>
        )
    }
}


const Page = async () => {
    const { blog } = data

    return (
        <div className="text-gray-900 pt-12 pr-0 pb-14 pl-0 bg-gradient">
            <div className="w-full pt-4 pr-5 pb-6 pl-5 mt-0 mr-auto mb-0 ml-auto space-y-5 sm:py-8 md:py-12 sm:space-y-8 md:space-y-16 max-w-7xl">
                {blog.length > 0 && <LatestBlog blog={blog[0]} />}
                {blog.length > 0 && <BlogList blog={blog} />}
            </div>
        </div>
    )
}

export default Page
