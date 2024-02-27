import { MessageSquare } from "lucide-react";
import Image from "next/image";
import { comments } from "@/db.json";
import { extractInitials } from "@/lib/reuseableFunctions/Extractinitals";
import { Card, CardContent, CardHeader } from "../ui/card";

const Comments = () => {


  async function submitAnswer() {
    console.log("reply function called")
  }

  return (
    <div className="grid gap-2">
      {comments.map((comment) => (
        <Card key={comment.id} className="pt-3">
          <CardContent className=" flex flex-1 gap-4">
            {comment.creator_profile ? (
              <Image
                src={comment.creator_profile}
                alt="profile-image"
                width={400}
                height={400}
                quality={75}
                className="h-16 w-16 lg:h-16 lg:w-16 rounded-full object-cover"
              />
            ) : (
              <div className="h-16 w-16 lg:h-16 lg:w-16 text-xl rounded-full object-cover bg-Primary/20 flex justify-center items-center">
                {extractInitials(comment.creator_name)}
              </div>
            )}
            <div className="">
              <span className="text-secondary text-sm opacity-70">
                {`${comment.creator_name} 
                `}
              </span>
              <p className="my-2 text-base">{comment.content}</p>
              <div className="flex gap-4">

                <div className="flex gap-4 items-center cursor-pointer"
                  onClick={submitAnswer}
                >
                  <MessageSquare size={16} className="cursor-pointer" />
                  {comment.replies.length}
                  <span
                    className="text-base cursor-pointer"
                  >
                    reply
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
          
        </Card>
      ))}
    </div>
  );
};
export default Comments;
