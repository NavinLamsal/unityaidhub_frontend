// import CampaignForm from "@/components/CampaignForm/CampaignForm";
import PostForm from "@/components/CampaignForm/form";
import React from "react";

const fetchCountries = async (): Promise<string[]> => {
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
    return [] as string[];
  }
};

const Page =async() => {
 const countries:string[] = await fetchCountries();

  return (

    <div className="container px-0">
      <div className="md:h-[90vh] md:flex w-full ">
        <PostForm countries={countries}/>
      </div>
    </div>
  );
};

export default Page;
