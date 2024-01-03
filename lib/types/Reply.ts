import Reaction from "./Reaction";

export default  interface Reply {
    id: string;
    content: string;
    creator_name: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    reactions?: Reaction[];
    replies?: Reply[];
  }