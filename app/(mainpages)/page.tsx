import BlogCard from '@/components/Card/BlogCard'
import Categories from '@/components/Home/Categories'
import HeroSection from '@/components/Home/Herocomponent'
import Trendings from '@/components/Home/Trendings'
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
const { blog } = data

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



  const data: Pagedata[] = await fetch(
      `http://localhost:8000/blog`, { next: { revalidate: 3600 } }
  ).then((res) => (res.json()));
  if(data){
      const blogs = data;
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
  }else{

      return (
        <div className='container'>
        <h1 className='my-10 mx-auto text-xl sm:text-2xl md:text-3xl text-center font-semibold px-3 tracking-wider'>Some of the Blogs</h1>
        <div className="grid grid-cols-12  sm:px-5 gap-x-8 gap-y-16">
            {blog.length > 0 && blog.slice(0, 3).map((item: any) => (
                <BlogCard key={item?.id} blog={item} />
            ))
            }
  
        </div>
      </div>
      )
  }
}

