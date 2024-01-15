import CampaignForm from "@/components/CampaignForm/CampaignForm";
import PostForm from "@/components/CampaignForm/form";
import React from "react";

export const fetchCountries = async () => {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all?fields=name", {
      method: 'GET',
      redirect: 'follow'
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();

    return result.map((country: any) => country?.name?.common);
  } catch (error) {
    console.error('Error fetching countries:', error);
    return [];
  }
};

const Page =async() => {
 const countries:string[] = await fetchCountries();

  return (
    // <!-- component -->
    <div className="container px-0">
      <div className="md:h-[90vh] md:flex w-full ">
        {/* <div className="relative overflow-hidden md:flex w-2/6 bg-gradient-to-tr from-Secondary/40 to-Primary/60 dark:bg-gradient-to-tr dark:from-zinc-950 dark:to-zinc-800 justify-around items-center hidden">
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
        <div className="md:w-4/6 md:[90vh] bg-zinc-50 dark:bg-zinc-600">
          <CampaignForm countries={countries}/>
        </div> */}
        <PostForm countries={countries}/>
      </div>
    </div>
  );
};

export default Page;
