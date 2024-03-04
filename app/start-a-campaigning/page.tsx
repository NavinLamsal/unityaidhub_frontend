// import CampaignForm from "@/components/CampaignForm/CampaignForm";
import PostForm from "@/components/CampaignForm/form";
import { getCategory } from "@/lib/action/actions";
import { getUser } from "@/lib/action/getUserData";
import { Category } from "@/lib/types/Category";
import { User } from "@/lib/types/User";
import React from "react";



const Page = async () => {
  const category = await getCategory();
  // console.log("category", category);
  let categories=[]
  if(category)
    categories=category
  else{
    categories = [] as Category[]
  }

  const user:User = await getUser();
  // console.log("user from start a campaign", user)

  const NGOs = [
    {
      id: "1",
      name: "NGO 1"
    },
    {
      id: "2",
      name: "NGO 2"
    }, {
      id: "3",
      name: "NGO 3"
    }, {
      id: "4",
      name: "NGO 4"
    }, {
      id: "5",
      name: "NGO 5"
    }, {
      id: "6",
      name: "NGO 6"
    }, {
      id: "7",
      name: "NGO 7"
    },

  ]
  

  return (

    <div className="container px-0">
      <div className="md:h-[90vh] md:flex w-full ">
        <PostForm ngos={NGOs} category={categories} userId={user.id}/>
      </div>
    </div>
  );
};

export default Page;
