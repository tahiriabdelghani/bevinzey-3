import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Header from '../partials/Header'
import { setUserData } from '../redux/auth'
import { clearMessage, setMessage } from '../redux/message'

export default function Completion() {
  const navigate = useNavigate()
  const goTo = (href) => {
    navigate(href)
  }

  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const getUserData = async () => {
    await axios.get("https://api.bevinzey.com/users/find/" + user?.id).then(res => {
      dispatch(setUserData(res.data))
    }).catch((error) => {
      dispatch(setMessage((error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString()))

      setTimeout(() => {
        dispatch(clearMessage())
      }, 3000);
    })
  }

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      <Header />
      {/* Hero content */}
      <div className="relative bg-white bg-opacity-5 pt-32 pb-10 md:pt-40  md:pb-16">
        <div className='flex flex-col space-y-6  justify-center items-center '>
          <div> <h1 className='text-xl text-center'>Congratulations! Your payment has been successfully processed. 🎉</h1></div>
          <div className='flex space-x-8'>
            <button onClick={() => navigate("/services")} className="p-2 pl-5 pr-5 bg-transparent border-2 border-orange-500 text-orange-500 text-lg rounded-lg transition-colors duration-700 transform hover:bg-orange-500 hover:text-gray-100 focus:border-4 focus:border-orange-300">
              Go to Services
            </button>
            <button onClick={() => navigate("/")} className="p-2 pl-5 pr-5 transition-colors duration-700 transform bg-orange-500 hover:bg-blue-400 text-gray-100 text-lg rounded-lg focus:border-4 border-orange-300">
              Back to Home
            </button>
          </div>
        </div>

      </div>

    </div>
  )
}

