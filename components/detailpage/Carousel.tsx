"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";



type assets = {
  id: number,
  link: string,
  type: string,
  name: string
}

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

const Carousel = ({images}:{images:string[]}) => {
  const imageAssets = images.map((url, index) => ({
    link:url,
    id: index + 1,
    type: 'image',
    name: `Image ${index + 1}`, // Add a name property for each image
  }));

  // Assuming you have a prop named 'videos' containing an array of video links
  const videoLinks: string[] = []; // Replace this with your actual prop containing video links

  // Convert the video URLs into video assets
  const videoAssets = videoLinks.map((url, index) => ({
    link:url,
    id: index + 1,
    type: 'video',
    name: `Video ${index + 1}`, // Add a name property for each video
  }));

  // Concatenate imageAssets and videoAssets into a single array
  const carouselassets = [...imageAssets, ...videoAssets];

  // const carouselassets = [...video.map(video => ({ ...video, type: 'video' })), ...images.map(image => ({ ...image, type: 'image' }))];
  const [selectedMedia, setSelectedMedia] = useState(carouselassets[0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleMediaClick = (media: assets, index: number) => {
    setSelectedMedia(media);
    setCurrentIndex(index);
  };

  const handleNextClick = () => {
    const nextIndex = (currentIndex + 1) % carouselassets.length;
    setSelectedMedia(carouselassets[nextIndex]);
    setCurrentIndex(nextIndex);
  };

  const handlePrevClick = () => {
    const prevIndex = (currentIndex - 1 + carouselassets.length) % carouselassets.length;
    setSelectedMedia(carouselassets[prevIndex]);
    setCurrentIndex(prevIndex);
  };

  return (
    <div className="grid lg:grid-cols-12 gap-4">
      <div className="lg:col-span-10 h-72 bg-Secondary/20">
        {selectedMedia && (
          <>
            {selectedMedia.type === 'image' ? (
              <Image
                src={selectedMedia.link}
                width={1024}
                height={1024}
                quality={100}
                alt={selectedMedia.name}
                className=" h-72 object-contain"

              />
            ) : (
              <Video src={selectedMedia.link} />
              // <Video src={selectedMedia.url} poster={selectedMedia.thumbnail} />
            )}
          </>)}
      </div>
      <div className="lg:col-span-2 ">
        {/* row display  */}
        <div className="flex items-center gap-4">
          <div
            className="hover:text-Primary bg-darkPrimary/20 hover:bg-darkPrimary/40 text-white p-1 cursor-pointer lg:hidden inline-block"
            onClick={handlePrevClick}
          >
            <ChevronLeft className="h-10 w-10  " />
          </div>

          <div className="flex lg:flex-col flex-row gap-2 h-20 lg:h-56 justify-start items-center overflow-auto w-full">
            {carouselassets && carouselassets.map((asset, index) => (
              <>
                {asset.type === 'image' ? (
                  <Image
                    src={asset.link}
                    width={250}
                    height={250}
                    quality={60}
                    alt={asset.name}
                    className="h-16 w-16 object-cover"
                    onClick={() => handleMediaClick(asset, index)}
                  />) : (
                  <video
                    src={asset.link}
                    width={250}
                    height={250}
                    // quality={60}
                    // alt="small"
                    className="h-16 w-16 object-cover"
                    onClick={() => handleMediaClick(asset, index)}
                  />)}
              </>
            ))

            }
          </div>

          <div
            className="hover:text-Primary bg-darkPrimary/20 hover:bg-darkPrimary/40 text-white p-1 cursor-pointer lg:hidden inline-block"
            onClick={handleNextClick}
          >
            <ChevronRight className="h-10 w-10  " />
          </div>
        </div>

           {/* col navigator   */}
        <div className=" hidden lg:flex gap-2 justify-between items-center mt-5">
          <div
            className="hover:text-Primary bg-darkPrimary/20 hover:bg-darkPrimary/40 text-white p-1 cursor-pointer"
            onClick={handlePrevClick}
          >
            <ChevronLeft className="h-10 w-10  " />
          </div>
          <div
            className="hover:text-Primary bg-darkPrimary/20 hover:bg-darkPrimary/40 text-white p-1 cursor-pointer"
            onClick={handleNextClick}
          >
            <ChevronRight className="h-10 w-10 " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
