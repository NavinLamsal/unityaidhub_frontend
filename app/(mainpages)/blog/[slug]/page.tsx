import Image from "next/image";

import { Suspense } from "react";
import data from "@/db.json"
import { formatDate } from "@/lib/reuseableFunctions/FormatDate";

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


export async function generateStaticParams() {
    const blog: { id: number; }[] = await fetch(
        `http://localhost:8000/blog`, { next: { revalidate: 600 } }
    ).then((res) => (res.json()));

    return blog.map((blog) => ({
        slug: blog.id.toString(),
    })
    )
}


async function BlogDetail({ slug, blog}: { slug: string, blog:Pagedata[]}) {
        const data: Pagedata[] = await fetch(
            `http://localhost:8000/blog`, { next: { revalidate: 3600 } }
        ).then((res) => (res.json()));
 
        if(data){
            const blogs = data.find((data: Pagedata) => data.id === parseInt(slug));
            return (
                <div className="max-w-5xl mx-auto">
                    <div className="mb-4 md:mb-0 w-full mx-auto relative">
                        <div className="px-4 lg:px-0">
                            <h2 className=" text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-semibold text-zinc-950 dark:text-zinc-50 leading-tight">
                                {blogs?.title}
                            </h2>
                            
                        </div>
        
                        <Image src={blogs?.imageUrl[0] as string} className="w-full h-44 object-cover lg:rounded" alt="blog" width={500} height={500} quality={100} />
                    </div>
        
                    <div className="flex flex-col lg:flex-row lg:space-x-12">
                        <div className="px-4 lg:px-0 mt-12 text-zinc-800 dark:text-zinc-200 text-lg leading-relaxed w-full lg:w-3/4">
                           
                                <p className="py-3">
                                    {blogs?.description}
                                </p>
                              
                        </div>
        
                        <div className="w-full lg:w-1/4 m-auto mt-12 max-w-screen-sm">
                            <div className="p-4 border-t ">
                                <div className="flex py-2 items-center">
                                    <img src="https://randomuser.me/api/portraits/men/97.jpg"
                                        className="h-10 w-10 rounded-full mr-2 object-cover" />
                                    <div>
                                        <p className="font-semibold text-zinc-700 dark:text-zinc-300 text-sm"> {blogs?.author} </p>
                                        
                                    </div>
                                </div>
                               
                                <p className="text-zinc-700 dark:text-zinc-300 "> {formatDate(blogs?.updatedAt as string)}</p>
                                <p
                                
                                className=" text-Primary inline-flex items-center justify-center mb-2"
                            >
                                {blogs?.categoryId}
                            </p>
                            </div>
                        </div>
        
                    </div>
                </div>
            )
        }
        else{
            const blogs = blog.find((data: Pagedata) => data.id === parseInt(slug));
            return (
                <div className="max-w-5xl mx-auto">
                    <div className="mb-4 md:mb-0 w-full mx-auto relative">
                        <div className="px-4 lg:px-0">
                            <h2 className=" text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-semibold text-zinc-950 dark:text-zinc-50 leading-tight">
                                {blogs?.title}
                            </h2>
                            
                        </div>
        
                        <Image src={blogs?.imageUrl[0] as string} className="w-full h-44 object-cover lg:rounded" alt="blog" width={500} height={500} quality={100} />
                    </div>
        
                    <div className="flex flex-col lg:flex-row lg:space-x-12">
                        <div className="px-4 lg:px-0 mt-12 text-zinc-800 dark:text-zinc-200 text-lg leading-relaxed w-full lg:w-3/4">
                           
                                <p className="py-3">
                                    {blogs?.description}
                                </p>
                              
                        </div>
        
                        <div className="w-full lg:w-1/4 m-auto mt-12 max-w-screen-sm">
                            <div className="p-4 border-t ">
                                <div className="flex py-2 items-center">
                                    <img src="https://randomuser.me/api/portraits/men/97.jpg"
                                        className="h-10 w-10 rounded-full mr-2 object-cover" />
                                    <div>
                                        <p className="font-semibold text-zinc-700 dark:text-zinc-300 text-sm"> {blogs?.author} </p>
                                        
                                    </div>
                                </div>
                               
                                <p className="text-zinc-700 dark:text-zinc-300 "> {formatDate(blogs?.updatedAt as string)}</p>
                                <p
                                
                                className=" text-Primary inline-flex items-center justify-center mb-2"
                            >
                                {blogs?.categoryId}
                            </p>
                            </div>
                        </div>
        
                    </div>
                </div>
            )
        }
        
   
}



const Page = async ({ params }: { params: { slug: string } }) => {
    const { slug } = params;
    const {blog}= data

    return (
            <div className="container">
                <div className="grid dark:text-white text-zinc-950 py-10">
                    <Suspense fallback={<div>Loading...</div>}>
                        <BlogDetail slug={slug} blog={blog} />
                    </Suspense>

                </div>


            </div>
       
    );
};

export default Page;