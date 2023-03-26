import React, { useState } from 'react'
import Modal from '../utils/Modal';

import HeroImage from '../images/hero-image-01.jpg';
import emailRes from '../images/email.png';
import blog from '../images/blog.png';
import social from '../images/social.png';
import Video from './Video';
import { FiArrowUpRight } from 'react-icons/fi'
import { motion } from "framer-motion";

export default function Services() {

    const [videoModalOpen, setVideoModalOpen] = useState(false);
    return (
        <section>
            <div className="md:max-w-7xl my-8 w-full mx-auto px-4 sm:px-3">
                {/* Section header */}
                <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
                    <h1 className="h2 mb-4">100+ Frameworks for every use case</h1>
                    <p className="text-xl text-gray-400">Discover tools injected with all the necessary formulas for success.</p>

                    <div className='flex justify-center my-5 cursor-pointer'>
                        <div className='text-xl font-medium text-gray-500' >
                            View Tool Library
                        </div>
                        <div className='mt-1 text-orange-700 text-xl'> <FiArrowUpRight /></div>

                    </div>
                </div>

                <div

                    className="grid md:grid-cols-3 rounded-3xl space-x-2 bg-gray-50  px-6 md:px md:py-8 text-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5 }}
                        variants={{
                            hidden: { opacity: 0, x: -100 },
                            visible: { opacity: 1, x: 0 },
                        }}
                        className="flex space-x-3 justify-center">
                        <img className="  object-cover w-[190px] h-[149px]" src={emailRes} alt="About" />
                        <img className="  object-cover w-[190px] md:mt-10 mt-20 h-[149px]" src={blog} alt="About" />
                    </motion.div>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        variants={{
                            hidden: { opacity: 0, x: -100 },
                            visible: { opacity: 1, x: 0 },
                        }}
                        className="flex space-x-3 justify-center">
                        <img className="  object-cover w-[190px] h-[149px]" src={emailRes} alt="About" />
                        <img className="  object-cover w-[190px] md:mt-10 mt-20 h-[149px]" src={blog} alt="About" />
                    </motion.div>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        variants={{
                            hidden: { opacity: 0, x: 100 },
                            visible: { opacity: 1, x: 0 },
                        }}
                        className="flex space-x-3 justify-center">
                        <img className="  object-cover w-[190px] h-[149px]" src={emailRes} width="190" height="150" alt="About" />
                        <img className="  object-cover w-[190px] md:mt-10 mt-20 h-[149px]" src={blog} width="100" height="100" alt="About" />
                    </motion.div>
                </div>
            </div></section>
    )
}
