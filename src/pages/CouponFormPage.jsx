import React, { useEffect, useState } from 'react'
import CoupounForm from '../components/CoupounForm'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setClientSecret } from '../redux/auth';
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner';
import { clearMessage, setMessage } from '../redux/message';

export default function CouponFormPage() {
    const [isCoupon, setIsCoupon] = useState(false)
    const [couponCode, setCouponCode] = useState('');
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [visible, setIsVisible] = useState(false);
    const { message } = useSelector((state) => state.message);
    const { user, isLoggedIn } = useSelector((state) => state.auth);
    const { clientsecret } = useSelector((state) => state.auth)

    const handleChange = (e) => {
        setIsCoupon(!isCoupon)
    }
    useEffect(() => {
        dispatch(clearMessage())
    }, [])
    const onsubmit = async () => {
        if (isCoupon) {
            setIsVisible(true);

            await axios.post("https://plankton-app-q74hx.ondigitalocean.app/payment/subscription/initial",
                {
                    plan: clientsecret?.plan,
                    frequency: clientsecret?.frequency,
                    email: user?.email,
                    code: couponCode
                }
            )
                .then((response) => {
                    axios.post("https://plankton-app-q74hx.ondigitalocean.app/payment/check-promo", {
                        plan: clientsecret?.plan,
                        frequency: clientsecret?.frequency,
                        code: couponCode
                    }).then(res => {
                        navigate("/payment");
                        dispatch(
                            setClientSecret({
                                ...clientsecret, priceReduction: res?.data,
                                clientsecret: response?.data.client_secret,
                            })
                        );
                    }).catch((err) => {
                        dispatch(
                            setMessage(
                                err.response &&
                                err.response.data &&
                                err.response.data.message
                            ) ||
                            err.message ||
                            err.toString()
                        );
                        setTimeout(() => {
                            dispatch(clearMessage());
                        }, 5000);

                    })
                })
                .catch((error) => {
                    dispatch(
                        setMessage(
                            error.response &&
                            error.response.data &&
                            error.response.data.message
                        ) ||
                        error.message ||
                        error.toString()
                    );
                    setTimeout(() => {
                        dispatch(clearMessage());
                    }, 5000);
                })
                :
    navigate("/signin");

    setIsVisible(false);
} else {
    await axios
        .post(
            "https://plankton-app-q74hx.ondigitalocean.app/payment/subscription/initial",
            {
                plan: clientsecret?.plan,
                frequency: clientsecret?.frequency,
                email: user?.email
            }
        )
        .then((res) => {
            navigate("/payment");
            dispatch(
                setClientSecret({
                    ...clientsecret,
                    clientsecret: res?.data.client_secret,
                    priceReduction: { amount: null, percentage: null }
                })
            );
        })
        .catch((error) => {
            dispatch(
                setMessage(
                    error.response &&
                    error.response.data &&
                    error.response.data.message
                ) ||
                error.message ||
                error.toString()
            );
            setTimeout(() => {
                dispatch(clearMessage());
            }, 5000);
        })
}
    }

return (
    <div className='flex  h-screen justify-center items-center flex-col'>
        <p className='text-md my-6 font-medium text-white'>Enter Your Coupon Code for Extra Discounts on Your Purchase</p>

        <div className='bg-white shadow-xl h-64 w-[90%] md:w-[40%] rounded-lg flex flex-col'>
            <div onClick={() => navigate('/')} className='cursor-pointer flex justify-end pt-1 pr-1  items-end text-end'>
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ff4500" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <circle cx="12" cy="12" r="9" />
                    <path d="M10 10l4 4m0 -4l-4 4" />
                </svg>
            </div>
            <div className='flex flex-col justify-center items-center'>
                <CoupounForm isCoupon={isCoupon} handleChange={handleChange} />
                {isCoupon &&
                    <div className='flex flex-col mt-2'>
                        <label className="text-gray-600">
                            Coupon Code
                        </label>
                        <input
                            className="text-gray-700 my-2 w-60"
                            type="text"
                            placeholder="Enter coupon code"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                        /></div>}

                {visible &&
                    <div className="z-50 absolute top-[50%] left-[50%] -translate-x-[50%]">
                        <ColorRing visible={true}
                            height="100"
                            width="100"
                            ariaLabel="blocks-loading"
                            wrapperStyle={{}}
                            wrapperClass="blocks-wrapper"
                            colors={['#164bd3', '#126eba', '#1850b1', '#5869c9', '#132a77']}
                        /></div>
                }

                <p className=" mx-3 text-xs font-bold text-center text-green-500 ">
                    {message && (
                        <div
                            className="text-red-500"
                            role="alert"
                        >
                            {message}
                        </div>
                    )}
                </p>
                <button className="w-[28%] mx-[26%] flex justify-center items-center 
      bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 font-bold
      py-2.5 my-2" onClick={onsubmit} >
                    {isCoupon ? "Apply Coupon" : "Skip"}
                </button>
            </div>

        </div>
    </div>
)
}
