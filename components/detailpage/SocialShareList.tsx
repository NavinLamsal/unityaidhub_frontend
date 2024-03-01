"use client"
import React from 'react'
import { FacebookShare, FacebookCount, TwitterShare, WhatsappShare, EmailShare, FacebookMessengerShare } from 'react-share-kit';

const SocialShareList = () => {
    const shareUrl = 'https://github.com/ayda-tech/react-share-kit';
    const title = 'Check out this awesome website!';
    const hashtags = ["#react-share-kit", "#front-end"]

    return (
        <div className='flex flex-1 gap-4 h-12 mx-auto justify-between'>
            
            <FacebookShare url={shareUrl} quote={title} round size={40} />
           
            <TwitterShare
                url={shareUrl}
                title={title}
                hashtags={hashtags}
                round size={48}
            />
            <WhatsappShare
                url={shareUrl}
                title={title}
                separator=":: "
                round size={48}
            />
            <EmailShare
                url={shareUrl}
                subject={title}
                body="body"
                round size={48}
            />
        </div>
    )
}

export default SocialShareList
