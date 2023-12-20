import React from "react";

const Page = () => {
  return (
    <div className="w-full h-screen overflow-hidden">
    <div className={`fixed top-0 left-0 w-full h-screen  text-white`}>

    <div className="absolute top-0 ">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#44f249"
          fill-opacity="1"
          d="M0,224L40,202.7C80,181,160,139,240,106.7C320,75,400,53,480,64C560,75,640,117,720,144C800,171,880,181,960,176C1040,171,1120,149,1200,128C1280,107,1360,85,1400,74.7L1440,64L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
        ></path>
      </svg>
      </div>
    </div>

    </div>
  );
};

export default Page;
