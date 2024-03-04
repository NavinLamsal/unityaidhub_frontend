import UpdatePostForm from "@/app/(mainpages)/dashboard/myPosts/[id]/UpdatePostform";
import UpdateForm from "@/components/Form/UpdateForm";
import { getPostdetail } from "@/lib/action/actions";
import { Posts } from "@/lib/types/Posts";


export async function generateStaticParams() {
  async function getPostsIds() {
     try {
       const data:Posts[] = await fetch("http://localhost:8000/posts").then(
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
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted-foreground">
          Update your account settings. Set your preferred language and
          timezone.
        </p>
      </div>
      {/* <Separator /> */}
    <UpdatePostForm post={data}/>
    </div>
  )
}
