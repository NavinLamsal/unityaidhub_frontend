import React from 'react'
import Carousel from '../ui/carousel';
import CampaingCard from '../Card/CampaingCard';
import FundraisingCard from '../Card/fundraisingCard';

const TrendingCarousel = () => {
  return (
    <div>
      <Carousel title="Question Banks" className=''>
        {/* {questions.map((question, i) => {
          return <QuestionCard key={i} {...question} />;
        })} */}
      <FundraisingCard/>
      <FundraisingCard/>
      <FundraisingCard/>
      <FundraisingCard/>
      <FundraisingCard/>
      <FundraisingCard/>
      <FundraisingCard/>
      <FundraisingCard/>
      </Carousel>
    </div>
  )
}

export default TrendingCarousel
