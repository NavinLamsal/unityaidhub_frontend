import UpdatePostForm from "@/app/(mainpages)/dashboard/myPosts/[id]/UpdatePostform";
import UpdateForm from "@/components/Form/UpdateForm";
import { getCategory, getPostdetail } from "@/lib/action/actions";
import { Category } from "@/lib/types/Category";
import { Posts } from "@/lib/types/Posts";


export async function generateStaticParams() {
  async function getPostsIds() {
     try {
       const data:Posts[] = await fetch("http://localhost:8000//posts/notverified",{ next: { revalidate: 600 } }).then(
         (res) => res.json()
       );
       const postIds = data.map((post: Posts) => post.id.toString())
       return postIds as string[];
     } catch (error) {
       console.log(error)
       return [] as string[];
     }
   }
 
 
   const post:string[] = await getPostsIds();
 
   return post.map((page) => ({
       id: page,
   })
   )
 }
 
export default async function UpdateCampaignPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const postId = parseInt(id);
  const data:Posts = await getPostdetail(id);

  const category = await getCategory();
  // console.log("category", category);
  let categories=[]
  if(category)
    categories=category
  else{
    categories = [] as Category[]
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Post Update</h3>
        <p className="text-sm text-muted-foreground">
          Update your Post Documents and Images.
        </p>
      </div>
      {/* <Separator /> */}
    <UpdatePostForm post={data} category={categories}/>
    </div>
  )
}
