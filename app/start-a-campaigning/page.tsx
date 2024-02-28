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

const Page = async () => {
  const countries: string[] = await fetchCountries();

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
        <PostForm countries={countries} ngos={NGOs}/>
      </div>
    </div>
  );
};

export default Page;
