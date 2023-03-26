import axios from 'axios'
import React, { useEffect } from 'react'

export default function Success() {

    const getUserDat = async () => {
        await axios.get('https://plankton-app-q74hx.ondigitalocean.app/auth/google').then((res) => {
            console.log("res :" + res?.data)
        })
    }

    useEffect(() => {
        getUserDat()
    }, [])
    return (
        <div>
            <h2> Hello World</h2>
        </div>
    )
}
