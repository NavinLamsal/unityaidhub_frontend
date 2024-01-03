"use client";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import FundraisingCard from "../Card/fundraisingCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const responsive = {
    superLargeDesktop:{
        breakpoint: { max: 3000, min: 1280 },
        items: 4,
        partialVisibilityGutter: 40
    },
  desktop: {
    breakpoint: { max: 1280, min: 950 },
    items: 3,
    partialVisibilityGutter: 100
  },
  tablet: {
    breakpoint: { max: 950, min: 700 },
    items: 2,
    partialVisibilityGutter: 30
  },
  mobile: {
    breakpoint: { max: 700, min: 0 },
    items: 1,
    partialVisibilityGutter: 30
  },
};

const ButtonGroup = ({ next, previous, goToSlide, ...rest }: any) => {
  const {
    carouselState: { currentSlide },
  } = rest;
  return (
    <div className=" w-full flex gap-1 flex-1 justify-between max-[700px]:justify-end absolute min-[700px]:top-[50%] max-[700px]:relative">
      <div
        className={`text-3xl cursor-pointer z-10 border-2 border-Primary text-Primary bg-white/0 block p-2 hover:bg-Primary hover:text-white transition-all duration-300 rounded-[3px]`}
        onClick={() => previous()}
      >
        <ChevronLeft />
      </div>
      <span
        className={`text-3xl cursor-pointer z-10 border-2 border-Primary text-Primary bg-white/0 block p-2 hover:bg-Primary hover:text-white transition-all duration-300 rounded-[3px]`}
        onClick={() => next()}
      >
        <ChevronRight />
      </span>
    </div>
  );
};

const RelatedProducts = () => {
  return (
    <div className="container max-[700px]:-translate-y-10">
      <div className="flex relative flex-col-reverse justify-center max-w-7xl mb-3 ">
        <Carousel
          responsive={responsive}
          containerClass=""
          itemClass=""
          infinite
          autoPlay
          autoPlaySpeed={5000}
          arrows={false}        
        renderButtonGroupOutside={true}
          customButtonGroup={<ButtonGroup />}
          keyBoardControl
          pauseOnHover
          swipeable
        >
          {/* {products?.data?.map((product) => (
              <ProductCard key={product?.id} data={product} />
            ))} */}
          <FundraisingCard />
          <FundraisingCard />
          <FundraisingCard />
          <FundraisingCard />
          <FundraisingCard />
          <FundraisingCard />
          <FundraisingCard />
          <FundraisingCard />
        </Carousel>
      </div>
    </div>
  );
};

export default RelatedProducts;
