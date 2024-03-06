"use client"
import { Share } from 'lucide-react';
import React from 'react'
import { FacebookShare, FacebookCount, TwitterShare, WhatsappShare, EmailShare, FacebookMessengerShare } from 'react-share-kit';

const SocialShareList = () => {
    const shareUrl = 'https://github.com/ayda-tech/react-share-kit';
    const title = 'Check out this awesome website!';
    const hashtags = ["#react-share-kit", "#front-end"]

    return (
        <div className='flex flex-1 gap-4 h-12 mx-auto justify-between'>
             <span>Share on: <Share /> </span>

            <FacebookShare url={shareUrl} quote={title} round size={40} />
           
            <TwitterShare
                url={shareUrl}
                title={title}
                hashtags={hashtags}
                round size={40}
            />
            <WhatsappShare
                url={shareUrl}
                title={title}
                separator=":: "
                round size={40}
            />
            <EmailShare
                url={shareUrl}
                subject={title}
                body="body"
                round size={40}
            />
        </div>
    )
}

export default SocialShareList
