import Reaction from "./Reaction";
import Reply from "./Reply";

 
  
 export default interface Comment {
    id: string;
    content: string;
    image: string | null;
    creator_name: string;
    creator_profile: string | null;
    userId: string;
    postId: string;
    createdAt: string;
    updatedAt: string;
    reactions?: Reaction[];
    replies?: Reply[];
  }
  
  