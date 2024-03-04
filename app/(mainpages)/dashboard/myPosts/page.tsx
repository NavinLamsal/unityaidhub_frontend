import PostsCard from "@/components/Card/PostsCard";
import FundraisingCard from "@/components/Card/fundraisingCard";
import { getUser } from "@/lib/action/getUserData";
import { getUserDetail } from "@/lib/action/userDetail";
import { Posts } from "@/lib/types/Posts";
import { User } from "@/lib/types/User";
import { UserDetail } from "@/lib/types/UserDetail";

export default async function campaingPage() {

  const user: User = await getUser();
  let userDetail: UserDetail | null = null;;
  if (user) {
    const userId = user.id;
    userDetail = await getUserDetail(userId);
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Posts</h3>
        <p className="text-sm text-muted-foreground">
          Update your post.
        </p>
      </div>
      {/* <Separator /> */}
      {userDetail ? (
        <>

          {userDetail.post && userDetail.post.length > 0 ?
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ">
              {
                userDetail.post.map((post: Posts) => (
                  <PostsCard key={post.id} post={post} />
                ))
              }
            </div>
            :
            <h1>Its seems you havent created any posts yet</h1>
          }

        </>
      ) : (
        <h1>Oops, something went wrong</h1>
      )}
    </div>
  )
}