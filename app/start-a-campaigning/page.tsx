import CampaingnContentform from "@/components/CampaignForm/CampaingnContentform";
import DocumentUpload from "@/components/CampaignForm/DocumentsForm";
import Fundraisingfor from "@/components/CampaignForm/Fundraisingfor";
import ChooseCategory from "@/components/CampaignForm/chooseCategory";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import React from "react";

const page = () => {
  return (
    // <!-- component -->
    <div className="container px-0">
      <div className="md:h-[90vh] md:flex w-full ">
        <div className="relative overflow-hidden md:flex w-2/6 bg-gradient-to-tr from-Secondary/40      to-Primary/60 dark:bg-gradient-to-tr dark:from-zinc-950 dark:to-zinc-800 justify-around items-center hidden">
          <div>
            <h1 className="text-white font-bold text-4xl font-sans">
              Create a Campaing
            </h1>
            <p className="text-white mt-1">
              Description text area 
            </p>
            progress bar of the form
          </div>
        </div>
        <div className="flex flex-col md:w-4/6 md:justify-start justify-center pt-10  items-center bg-zinc-50 dark:bg-zinc-600">
      <ScrollArea className="h-[80%] w-full px-4 md:place-self-start ">
        {/* step 1  */}
			{/* <ChooseCategory />  */}

        {/* step 2  */}
      {/* <Fundraisingfor/> */}

      {/* step 3  */}
      <CampaingnContentform/>

      {/* <DocumentUpload/> */}
      <ScrollBar orientation="vertical" />
      </ScrollArea>
     
      <div className="h-[20%] pb-15 px-4 w-full border-t-2  border-Primary dark:border-zinc-50 pt-2 bg-white dark:bg-zinc-950 rounded-t-3xl">
        <div className="flex w-full justify-between mb-5">
          <Button variant="outline">Previous</Button>
          <Button variant="default_outline">Next</Button>
        </div>
      </div>
        </div>
      </div>
    </div>
  );
};

export default page;
