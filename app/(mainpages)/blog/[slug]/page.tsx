import Image from "next/image";

import { Suspense } from "react";
import data from "@/db.json"
import { formatDate } from "@/lib/reuseableFunctions/FormatDate";


export const revalidate = 600

// export async function generateStaticParams() {
//     // const posts: { slug: string; }[] = await fetch(
//     //     `*[_type =="blog"]{"slug":slug.current}`
//     // );

//     // return  posts.map((post) => ({
//     //     slug: post.slug,
//     // })

//     // )
// }



async function BlogDetail({ slug, blog }: { slug: string, blog:any }) {


    // const BlogDetails = await fetch(
    //     `*[_type =="blog" && slug.current == "${slug}"]{"id":_id,title,"slug":slug.current,"authors":author->name,publishedAt, "img_url":mainImage.asset->url,body,keywords}[0]`
    // );
    const blogs = blog.find((blog:any) => blog?.id.toString() === slug);

    return (
        <div className="max-w-5xl mx-auto">
            <div className="mb-4 md:mb-0 w-full mx-auto relative">
                <div className="px-4 lg:px-0">
                    <h2 className=" text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-semibold text-zinc-950 dark:text-zinc-50 leading-tight">
                        {blogs?.blog_title}
                    </h2>
                    
                </div>

                <Image src={blogs?.image} className="w-full h-44 object-cover lg:rounded" alt="blog" width={500} height={500} quality={100} />
            </div>

            <div className="flex flex-col lg:flex-row lg:space-x-12">
                <div className="px-4 lg:px-0 mt-12 text-zinc-800 dark:text-zinc-200 text-lg leading-relaxed w-full lg:w-3/4">
                   
                        <p className="py-3">
                            {blogs?.blogDescription}
                        </p>
                      
                </div>

                <div className="w-full lg:w-1/4 m-auto mt-12 max-w-screen-sm">
                    <div className="p-4 border-t ">
                        <div className="flex py-2 items-center">
                            <img src="https://randomuser.me/api/portraits/men/97.jpg"
                                className="h-10 w-10 rounded-full mr-2 object-cover" />
                            <div>
                                <p className="font-semibold text-zinc-700 dark:text-zinc-300 text-sm"> {blogs?.authorName} </p>
                                
                            </div>
                        </div>
                       
                        <p className="text-zinc-700 dark:text-zinc-300 "> {formatDate(blogs?.updatedAt)}</p>
                        <p
                        
                        className=" text-Primary inline-flex items-center justify-center mb-2"
                    >
                        {blogs?.category}
                    </p>
                    </div>
                </div>

            </div>
        </div>
    )
}



const Page = async ({ params }: { params: { slug: string } }) => {
    const { slug } = params;
    const {blogs}= data

    return (
            <div className="container">
                <div className="grid dark:text-white text-zinc-950">
                    <Suspense fallback={<div>Loading...</div>}>
                        <BlogDetail slug={slug} blog={blogs} />
                    </Suspense>

                </div>


            </div>
       
    );
};

export default Page;