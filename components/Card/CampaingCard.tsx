import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '../ui/card'
import Image from 'next/image'
import { FaLocationDot } from 'react-icons/fa6'
import { Button } from '../ui/button'

const CampaingCard = () => {
  return (
    <Card className='max-w-[300px] border-0 drop-shadow-2xl cursor-pointer'>
        <CardContent className='inset-0 p-0'>
            <Image src="/samplecardimage.jpg" alt="sample card image" width={320} height={288} quality={80} className='w-full h-48 rounded-t-sm object-cover'/>
            <div className='px-2 text-darkPrimary/70'>
                <div className='text-Primary text-sm mt-2 flex gap-1'><FaLocationDot size={20}/>Pokhara, Nepal</div>
            <CardTitle className='my-2 font-medium  text-lg '>Support my Father fight severe Mitral Valve leakage</CardTitle>
            <CardDescription className='flex flex-col gap-4'>
            <div className='flex gap-2 items-center'>
                <Image src={"/sampleProfile.jpg"} alt="profile" width={32} height={32} quality={100} className='h-8 w-8 rounded-full object-cover' />
                <p className='text-sm font-light'>by :&nbsp;{"Navin Lamsal"}</p>
            </div>
            <div>
                <p className='text-sm font-light'><span className='text-base font-medium text-darkPrimary'>$5,400 raised</span>&nbsp;of $10,000</p>
                <div className=' relative w-full h-1.5 bg-darkPrimary/30 rounded-full my-2'>
                    <div className='absolute top-0 left-0 w-[50%] h-1.5 bg-Secondary rounded-full'></div>
                </div>
            </div>
            </CardDescription>
            </div>
            <CardFooter className='grid grid-cols-2 gap-2 px-2 mt-2'>
                <Button variant="outline">Share</Button>
                <Button variant="default">Donate</Button>
            </CardFooter>
        </CardContent>
      
    </Card>
  )
}

export default CampaingCard
