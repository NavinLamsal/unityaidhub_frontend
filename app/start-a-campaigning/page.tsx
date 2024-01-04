import ChooseCategory from "@/components/CampaignForm/chooseCategory";
import React from "react";

const page = () => {
  return (
    // <!-- component -->
    <div className="container px-0">
      <div className="md:h-[90vh] md:flex w-full ">
        <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-Secondary/80 to-Primary dark:bg-gradient-to-tr dark:from-zinc-950 dark:to-zinc-800 justify-around items-center hidden">
          <div>
            <h1 className="text-white font-bold text-4xl font-sans">
              Create a Campaing
            </h1>
            <p className="text-white mt-1">
              Description text area 
            </p>
            progress bar of the form
          </div>
          <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        </div>
        <div className="flex md:w-1/2 md:justify-start justify-center py-10  px-4 items-center bg-zinc-50 dark:bg-zinc-600">
			<ChooseCategory />
        </div>
      </div>
    </div>
  );
};

export default page;
