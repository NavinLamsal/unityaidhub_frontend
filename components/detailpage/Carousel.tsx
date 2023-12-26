"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Video = ({ src, poster, ...props }: any) => {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative">
      <video
        // poster={poster}
        // controls={playing}
        // onClick={() => setPlaying(!playing)}
        controls
        width={1024}
        height={1024}
        className=" h-72 object-contain"
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

const Carousel = () => {
  function handlePrevious(): void {
    throw new Error("Function not implemented.");
  }

  // const [selectedMedia, setSelectedMedia] = useState();
  // const [currentIndex, setCurrentIndex] = useState(0);

  // const handleMediaClick = (media, index) => {
  //   setSelectedMedia(media);
  //   setCurrentIndex(index);
  // };

  // const handleNextClick = () => {
  //   const nextIndex = (currentIndex + 1) % smallMedia.length;
  //   setSelectedMedia(smallMedia[nextIndex]);
  //   setCurrentIndex(nextIndex);
  // };

  // const handlePrevClick = () => {
  //   const prevIndex = (currentIndex - 1 + smallMedia.length) % smallMedia.length;
  //   setSelectedMedia(smallMedia[prevIndex]);
  //   setCurrentIndex(prevIndex);
  // };

  return (
    // <div>
    //   <div className="mb-4 relative">
    //     {/* Big Image/Video */}
    //     {selectedMedia && (
    //       <div>
    //         {selectedMedia.type === 'image' ? (
    //           <Image src={selectedMedia.url} alt="Main" className="w-full" width={500} height={500} quality={100} />
    //         ) : (
    //           <Video src={selectedMedia.url} poster={selectedMedia.thumbnail} />
    //         )}

    //         <button
    //           className="absolute left-0 top-1/2 transform -translate-y-1/2"
    //           onClick={handlePrevClick}
    //         >
    //           Previous
    //         </button>
    //         <button
    //           className="absolute right-0 top-1/2 transform -translate-y-1/2"
    //           onClick={handleNextClick}
    //         >
    //           Next
    //         </button>
    //       </div>
    //     )}
    //   </div>

    //   <div className="mb-4">
    //     {/* Small Images/Videos Carousel */}
    //     <div className="flex overflow-x-scroll">
    //       {smallMedia.map((media, index) => (
    //         <div
    //           key={index}
    //           className={`mr-2 cursor-pointer ${index === currentIndex ? 'border-2 border-blue-500' : ''}`}
    //           onClick={() => handleMediaClick(media, index)}
    //         >
    //           {media.type === 'image' ? (
    //             <Image src={media.url} alt={`Small ${index}`} className="w-1/5" width={36} height={36} quality={80} />
    //           ) : (
    //             <Image src={media.thumbnail} alt={`Small Video ${index}`} className="w-1/5" width={36} height={36}  quality={80}/>
    //           )}
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </div>

    <div className="grid md:grid-cols-12 gap-4">
      <div className="md:col-span-10 h-72 bg-Secondary/20">
        {/* <Image
          src=" http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_4_front.jpg"
          width={1024}
          height={1024}
          quality={100}
          alt="big image"
          className=" h-72 object-contain"
        /> */}
        <Video src={`https://www.w3schools.com/tags/movie.mp4`} />
        <div></div>
      </div>
      <div className="md:col-span-2 ">
        <div className="flex items-center gap-4">
        <div
            className="hover:text-Primary bg-darkPrimary/20 hover:bg-darkPrimary/40 text-white p-1 cursor-pointer lg:hidden inline-block"
            onClick={handlePrevious}
          >
            <ChevronLeft className="h-10 w-10  " />
          </div>
        <div className="flex md:flex-col flex-row gap-2 h-20 md:h-56 justify-start items-center overflow-auto w-full">
          
          <Image
            src=" http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_4_front.jpg"
            width={250}
            height={250}
            quality={60}
            alt="small"
            className="h-16 w-16 object-cover"
          />
          <Image
            src=" http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_4_front.jpg"
            width={250}
            height={250}
            quality={60}
            alt="small"
            className="h-16 w-16 object-cover"
          />
          <Image
            src=" http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_4_front.jpg"
            width={250}
            height={250}
            quality={60}
            alt="small"
            className="h-16 w-16 object-cover"
          />
          <Image
            src=" http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_4_front.jpg"
            width={250}
            height={250}
            quality={60}
            alt="small"
            className="h-16 w-16 object-cover"
          />
          <Image
            src=" http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_4_front.jpg"
            width={250}
            height={250}
            quality={60}
            alt="small"
            className="h-16 w-16 object-cover"
          />
          <video
            src=" https://www.w3schools.com/tags/movie.mp4"
            width={250}
            height={250}
            // quality={60}
            // alt="small"
            className="h-16 w-16 object-cover"
          />
        </div>
        <div
            className="hover:text-Primary bg-darkPrimary/20 hover:bg-darkPrimary/40 text-white p-1 cursor-pointer lg:hidden inline-block"
            onClick={handlePrevious}
          >
            <ChevronRight className="h-10 w-10  " />
          </div>
        </div>
        <div className=" hidden lg:flex gap-2 justify-between items-center mt-5">
          <div
            className="hover:text-Primary bg-darkPrimary/20 hover:bg-darkPrimary/40 text-white p-1 cursor-pointer"
            onClick={handlePrevious}
          >
            <ChevronLeft className="h-10 w-10  " />
          </div>
          <div
            className="hover:text-Primary bg-darkPrimary/20 hover:bg-darkPrimary/40 text-white p-1 cursor-pointer"
            onClick={handlePrevious}
          >
            <ChevronRight className="h-10 w-10  " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
