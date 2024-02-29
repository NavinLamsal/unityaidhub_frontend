import BlogCard from '@/components/Card/BlogCard'
import Categories from '@/components/Home/Categories'
import HeroSection from '@/components/Home/Herocomponent'
import Trendings from '@/components/Home/Trendings'
import data from "@/db.json"

export default function Home() {
  return (
    <main>
      <HeroSection/>
      <Categories/>
      <Trendings />
      <BlogList/>
    </main>
  )
}


async function BlogList() {

  //  const result = await fetch(`*[_type =="blog"]{"id":_id,title,"slug":slug.current,"authors":author->name,publishedAt,"img_url":mainImage.asset->url,body}[0]`);

  const { blogs } = data
  return (
    <div className='container'>
      <h1 className='my-10 mx-auto text-xl sm:text-2xl md:text-3xl text-center font-semibold px-3 tracking-wider'>Some of the Blogs</h1>
      <div className="grid grid-cols-12  sm:px-5 gap-x-8 gap-y-16">
          {blogs.length > 0 && blogs.slice(0, 3).map((item: any) => (
              <BlogCard key={item?.id} blog={item} />
          ))
          }

      </div>
    </div>
  )

}