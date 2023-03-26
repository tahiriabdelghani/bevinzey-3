import React from 'react'
import { Link } from 'react-router-dom'

export default function HeaderOption({ text, to }) {
    return (
        <div>
            <Link to={to} className="text-white tracking-wider font-inter  px-4 py-2 flex items-center transition duration-150 ease-in-out">
                {text}
            </Link>
        </div>
    )
}
