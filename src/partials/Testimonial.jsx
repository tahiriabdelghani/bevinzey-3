import React from 'react'
import { AiFillStar } from 'react-icons/ai'

export default function Testimonial({ logo, image, text, name, job }) {
    return (
        <div>
            <div className="flex flex-col rounded-xl shadow-lg h-full p-6 bg-gray-50 border-2 border-gray-200" data-aos="fade-up">
                <div>
                    <div className="relative inline-flex flex-col mb-4">
                        <ul className='flex'>
                            <li className='text-[#FFD700]'><AiFillStar size={20} /></li>
                            <li className='text-[#FFD700]'><AiFillStar size={20} /></li>
                            <li className='text-[#FFD700]'><AiFillStar size={20} /></li>
                            <li className='text-[#FFD700]'><AiFillStar size={20} /></li>
                            <li className='text-[#FFD700]'><AiFillStar size={20} /></li>
                        </ul>
                    </div>
                </div>
                <blockquote className="text-lg text-gray-700 grow">{text}</blockquote>
                <div className="text-gray-700 flex space-x-4  font-medium mt-6 pt-5 border-t border-gray-700">
                    <div>
                        <img className="rounded-full" src={image} width="48" height="48" alt="Testimonial 01" />
                    </div>
                    <div className='flex-col flex'>
                        <cite className="text-gray-800 font-bold  not-italic">{name}</cite>
                        <a className="text-orange-600 hover:text-gray-200 transition duration-150 ease-in-out" href="#0">{job}</a>
                    </div>

                </div>
            </div>
        </div>
    )
}
