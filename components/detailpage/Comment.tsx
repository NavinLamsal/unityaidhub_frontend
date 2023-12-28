import { Heart, MessageCircle } from "lucide-react";
import Image from "next/image";
import { comments } from "@/db.json";
import { extractInitials } from "@/lib/reuseableFunctions/Extractinitals";

const Comments = () => {
  return (
    <>
      {comments.map((comment) => (
        <div key={comment.id}>
          <div className="flex pt-4 ">
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
            <div className="pl-4">
              <span className="text-secondary text-sm opacity-70">
                {`${comment.creator_name} 
                `}
              </span>
              <p className="my-2 text-base">{comment.content}</p>
              <div className="flex gap-4">
                <Heart
                  size={16}
                  className="cursor-pointer"
                  // onClick={() => handleLike(post.id)}
                />
                {comment.reactions.length}
                <div className="flex gap-4">
                  <MessageCircle size={16} className="cursor-pointer" />
                  {comment.replies.length}
                  <span
                    className="text-base cursor-pointer"
                    // onClick={submitAnswer}
                  >
                    reply
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
export default Comments;
