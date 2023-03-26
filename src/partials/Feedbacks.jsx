import React, { useState } from 'react'
import Modal from '../utils/Modal';

import HeroImage from '../images/hero-image-01.jpg';
import Video from './Video';

export default function Feedbacks() {

    const [videoModalOpen, setVideoModalOpen] = useState(false);
    return (
        <section>
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                {/* Section header */}
                <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
                    <h1 className="h2 mb-4">Crafting incredible results</h1>
                    <p className="text-xl text-gray-400">Businesses, eCommerce websites, charities, influencers, artists, musicians, and creators. We work with people ...</p>
                </div>
                <div className="grid md:grid-cols-4 rounded-3xl   px-6 md:px-0 md:py-8 text-center">
                    <div className="">
                        <Video />
                    </div>
                    <div className="">  <Video /></div>
                    <div className="">  <Video /></div>
                    <div className="">  <Video /></div>
                </div>
            </div></section>
    )
}
