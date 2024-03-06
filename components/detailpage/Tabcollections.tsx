'use client'
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import Comments from "./Comment";
import CommentBox from "./CommentBox";
import { useState } from "react";
import Comment from "@/lib/types/Comment";
import { comments as cmt } from "@/db.json";
import Update from "./update";
import { Posts } from "@/lib/types/Posts";


const DonateCard = ({ post }: { post: Posts }) => {

  const [comments, setComments] = useState<Comment[]>(cmt);

  const addComment = (content: string) => {
    // Add your logic to update the comments state
    // This is just a placeholder for demonstration purposes
    setComments([
      ...comments,
      {
        id: Date.now().toString(),
        content,
        creator_name: "John Doe",
        image: null,
        creator_profile: null,
        userId: "someUserId",
        postId: "somePostId",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        reactions: [],
        replies: [],
      }
    ]);
  };

  return (
    <Tabs defaultValue="about" className="w-full my-4 shadow-lg drop-shadow-xl shadow-black/30 rounded-b-md ">
      <TabsList className="flex w-full justify-start border-b-2 rounded-none border-Primary/60 overflow-x-auto">
        <TabsTrigger value="about">About</TabsTrigger>
        {post?.documents && post?.documents !== undefined && <TabsTrigger value="document">Documents</TabsTrigger>}
        <TabsTrigger value="update">Updates</TabsTrigger>
        <TabsTrigger value="comments">Comments</TabsTrigger>
      </TabsList>
      <TabsContent value="about">
        <Card className="border-0 shadow-none bg-transparent">
          <CardHeader>
            <CardTitle className="text-center">Story About Benificiary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-justify tracking-wide">{post.description}</p>
          </CardContent>
        </Card>
      </TabsContent>
      {post?.documents && post?.documents !== undefined &&
        <TabsContent value="document">
          <Card className="border-0 shadow-none bg-transparent">
            <CardHeader>
              <CardTitle className="text-center">Supporting Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col place-items-center">
                {post.documents && post.documents?.length > 0 ?
                  <>
                    {post.documents.map((images) => (
                      <Image
                        key={images}
                        src={images}
                        alt={'images'}
                        width={500}
                        height={700}
                        quality={100}
                        className="w-full h-auto"
                      />
                    ))

                    }
                  </> :
                  <>

                  </>

                }
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      }
      <TabsContent value="update">
        <Update />
      </TabsContent>
      <TabsContent value="comments">
        <CommentBox onSubmit={addComment} />
        <Comments />
      </TabsContent>
    </Tabs>
  )
}



export default DonateCard;