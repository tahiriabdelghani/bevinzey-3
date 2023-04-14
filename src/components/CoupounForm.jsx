import React, { useState } from 'react'

export default function CoupounForm({ handleChange, isCoupon }) {


    return (
        <div >

            <div className="flex flex-col justify-start">
                <label htmlFor="isCoupon" className="text-gray-600">
                    Do you have a coupon?
                </label>
                <select
                    name={isCoupon}
                    value={isCoupon}
                    onChange={handleChange}
                    className="w-60 flex justify-start text-start text-gray-600"
                >

                    <option key={1} value={true}>
                        Yes
                    </option>
                    <option key={2} value={false}>
                        No
                    </option>


                </select>
            </div>
        </div>
    )
}
