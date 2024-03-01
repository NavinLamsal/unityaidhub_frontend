import Image from "next/image";
import { Suspense } from "react";
import data from "@/db.json"
import Loading from "./Loading";

interface Pagedata {

    "id": string;
    "title": string;
    "slug": string;
    "imageUrl": string[],
    "content": string;
}

export const revalidate = 600

export async function generateStaticParams() {
    const pages: { slug: string; }[] = await fetch(
        `http://localhost:8000/pages`, { next: { revalidate: 600 } }
    ).then((res) => (res.json()));

    return pages.map((page) => ({
        slug: page.slug,
    })
    )
}

async function PageDetail({ slug  }: { slug: string }) {
    const data: Pagedata[] = await fetch(
        `http://localhost:8000/pages`, { next: { revalidate: 3600 } }
    ).then((res) => (res.json()));
    const detail = data.find((data: Pagedata) => data.slug === slug);
    if (detail) {
        return (
            <>
                <div className="max-w-[1500px] mb-4 md:mb-0 w-full mx-auto relative pt-12 pb-20 md:pt-12 md:pb-20 xl:pt-12 xl:pb-24 bg-gradient-to-r from-Secondary/[0.9] to-Secondary/[0.4]">
                    <div className="absolute right-4 bottom-0 h-[130px] w-[150px] opacity-95 sm:h-[170px] sm:w-[180px] md:h-[170px] md:w-[180px] lg:h-[220px] lg:w-[220px] xl:h-[220px] xl:w-[220px]">
                        <Image
                            src={`/HumanitarianHelpbro.png`}
                            alt="Man_In_Whiteshirt"
                            className="object-cover object-center"
                            fill
                            sizes=""
                        />
                    </div>
                    <div className="grid text-zinc-950 dark:text-zinc-50">
                        <h2 className=" text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-semibold text-zinc-950 dark:text-zinc-50 leading-tight">
                            {detail?.title}
                        </h2>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row lg:space-x-12">
                    <div className="px-4 lg:px-0 mt-12 text-zinc-800 dark:text-zinc-200 text-lg leading-relaxed w-full lg:w-3/4">
                        <p className="py-3">
                            <div dangerouslySetInnerHTML={{ __html: detail.content }} />
                        </p>
                    </div>
                </div>
            </>
        )
    }
}

const Page = async ({ params }: { params: { slug: string } }) => {
    const { slug } = params;
    
  

    return (
        <div className="grid dark:text-white text-zinc-950">
            <Suspense fallback={<div><Loading /></div>}>
                <PageDetail slug={slug}  />
            </Suspense>
        </div>
    );
};

export default Page;