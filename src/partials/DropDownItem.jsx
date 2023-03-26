import React from 'react'
import { FiArrowUpRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'

export default function DropDownItem({ Title, Description, Image, to }) {
    return (
        <div>
            <Link to={to}>
                <div className='flex py-3 h-28 hover:bg-gray-100 hover:rounded-md m-1  cursor-pointer px-2 space-x-3'>
                    <div className='flex-[30%]  text-red-400'>
                        <img src={Image} alt="logo" />
                    </div>
                    <div className='flex-[60%] flex mt-4 '>
                        <div className='flex flex-col space-y-2  '>
                            <h2 className=' text-gray-600 font-bold text-[18px]'>{Title}</h2>
                            <h2 className='text-[13px] text-gray-500'>{Description}</h2>
                        </div>
                    </div>
                    <div className='flex-[10%] text-gray-500 p-2'>
                        <FiArrowUpRight size={20} />
                    </div>
                </div>
            </Link>
        </div>
    )
}
