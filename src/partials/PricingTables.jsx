import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setClientSecret, setUserData } from "../redux/auth";
import { ColorRing } from "react-loader-spinner";
import { clearMessage, setMessage } from "../redux/message";
import { useNavigate } from "react-router-dom";

function PricingTables() {
  const [value, setValue] = useState(true);

  const [priceOutput] = useState({
    plan1: {
      false: ["$", "18", "/month"],
      true: ["$", "13", "/month"],
    },
    plan3: {
      false: ["$", "37", "/month"],
      true: ["$", "29", "/month"],
    },
  });

  // useEffect(() => {
  //   setIsVisible(true)
  //   axios.post('https://plankton-app-q74hx.ondigitalocean.app/payment/subscription/initial',
  //     {
  //       plan: "Basic",
  //       frequency: priceOutput.plan1[value][1] && priceOutput.plan1[value][1] === "18" ? "Monthly" : "Annually",
  //       email: user?.email
  //     }
  //   ).then((res) => {
  //     window.location.href = res?.data.invoice_url
  //   }).catch((error) => {
  //     console.log(error.response &&
  //       error.response.data &&
  //       error.response.data.message) ||
  //       error.message ||
  //       error.toString()
  //   })

  //   setIsVisible(false)
  // }, [subscriptionObject])

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const [visible, setIsVisible] = useState(false);

  const [subscriped, setSubscriped] = useState(false);
  useEffect(() => {
    axios
      .get(
        "https://plankton-app-q74hx.ondigitalocean.app/users/find/" + user?.id
      )
      .then((res) => {
        if (res.data.subscriptionId) {
          setSubscriped(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  useEffect(() => {
    dispatch(clearMessage())
  }, [])

  const basicGetSTarted = async () => {

    let frequency =
      priceOutput.plan1[value][1] === "18"
        ? "Monthly"
        : "Yearly";
    // console.log({
    //   plan: "Starter",
    //   frequency: frequency,
    //   email: user?.email
    // })
    setIsVisible(true);
    isLoggedIn ? await axios
      .post(
        "https://plankton-app-q74hx.ondigitalocean.app/payment/subscription/initial",
        {
          plan: "Basic",
          frequency: frequency,
          email: user?.email,
        }
      )
      .then((res) => {
        navigate("/payment");
        dispatch(
          setClientSecret({
            plan: "Starter",
            frequency: frequency,
            email: user?.email,
            clientsecret: res?.data.client_secret,
            price: priceOutput.plan1[value][1],
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
      }) : navigate('/signin')

    setIsVisible(false);

  }

  const premiumGetStarted = async () => {

    // setSubscriptionObject({
    //   plan: "Premium",
    //   frequency: priceOutput.plan3[value][1] === "37" ? "Monthly" : "Yearly",
    //   email: user?.email
    // })
    let frequency =
      priceOutput.plan3[value][1] === "37"
        ? "Monthly"
        : "Yearly";
    console.log({
      plan: "Premium",
      frequency: frequency,
      email: user?.email,
    });
    setIsVisible(true);
    isLoggedIn ? await axios
      .post(
        "https://plankton-app-q74hx.ondigitalocean.app/payment/subscription/initial",
        {
          plan: "Premium",
          frequency: frequency,
          email: user?.email,
        }
      )
      .then((res) => {
        navigate("/payment");
        dispatch(
          setClientSecret({
            plan: "Premium",
            frequency: frequency,
            email: user?.email,
            clientsecret: res?.data.client_secret,
            price: priceOutput.plan3[value][1],
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
      }) : navigate('/signin')

    setIsVisible(false);

  }

  const handleBasicGetStarted = () => {
    let frequency = priceOutput.plan1[value][1] === "18" ? "Monthly" : "Yearly";


    if (isLoggedIn) {
      dispatch(
        setClientSecret({
          plan: "Basic",
          frequency: frequency,
          email: user?.email,
          price: priceOutput.plan1[value][1],
        })
      );
      navigate("/coupon");
    } else {
      navigate("/signin");
    }

  }


  const handlePremiumGetStarted = () => {
    let frequency =
      priceOutput.plan3[value][1] === "37"
        ? "Monthly"
        : "Yearly";

    if (isLoggedIn) {
      dispatch(
        setClientSecret({
          plan: "Basic",
          frequency: frequency,
          email: user?.email,
          price: priceOutput.plan3[value][1],
        })
      );
      navigate("/coupon");
    } else {
      navigate("/signin");
    }
  }


  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12">
            <h1 className="h1 mb-4" data-aos="fade-up">
              Simple, transparent pricing
            </h1>
            <p
              className="text-xl text-gray-400"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Get the Bevinzey plan that fits your needs at a special
              introductory price.
            </p>
          </div>

          {/* Pricing tables */}
          <div>
            {/* Pricing toggle */}
            <div
              className="flex justify-center mb-16"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="inline-flex items-center">
                <div className="text-gray-500 font-medium mr-3">
                  Billed Monthly
                </div>
                <div className="form-switch">
                  <input
                    type="checkbox"
                    name="pricing-toggle"
                    id="pricing-toggle"
                    className="sr-only"
                    checked={value}
                    onChange={() => setValue(!value)}
                  />
                  <label className="bg-gray-600" htmlFor="pricing-toggle">
                    <span className="bg-gray-200" aria-hidden="true"></span>
                    <span className="sr-only">Enable to see yearly prices</span>
                  </label>
                </div>
                <div className="text-gray-500 font-medium ml-3">
                  Billed Annually
                </div>
              </div>
            </div>
            <p className="mt-8 mx-3 text-xl font-bold text-center text-gray-700">
              {message && (
                <div className="text-red-500" role="alert">
                  {message}
                </div>
              )}
            </p>
            {visible && (
              <div className="z-50 absolute top-[50%] left-[50%] -translate-x-[50%]">
                <ColorRing
                  visible={true}
                  height="100"
                  width="100"
                  ariaLabel="blocks-loading"
                  wrapperStyle={{}}
                  wrapperClass="blocks-wrapper"
                  colors={[
                    "#e15b64",
                    "#f47e60",
                    "#f8b26a",
                    "#abbd81",
                    "#849b87",
                  ]}
                />
              </div>
            )}

            <div className="max-w-sm rounded-md justify-center mx-auto grid gap-8 lg:grid-cols-2 lg:gap-6 items-center lg:max-w-none">
              {/* Pricing table 1 */}
              <div
                className="relative flex flex-col h-full p-6 shadow-xl"
                data-aos="fade-up"
                data-aos-delay="700"
              >
                <div className="mb-4 pb-4 border-b border-gray-700">
                  <div className="h4 text-orange-600 mb-1">Starter</div>
                  <div className="inline-flex items-baseline mb-2">
                    <span className="text-2xl md:text-3xl font-medium text-gray-400">
                      {priceOutput.plan1[value][0]}
                    </span>
                    <span className="h2">{priceOutput.plan1[value][1]}</span>
                    <span className="font-medium text-gray-400">
                      {priceOutput.plan1[value][2]}
                    </span>
                  </div>
                  <div className="text-gray-400">Get started with AI-powered learning today!</div>
                </div>
                <div className="font-medium mb-3">Features include:</div>
                <ul className="text-gray-400 -mb-3 grow">
                  <li className="flex items-center mb-3">
                    <svg
                      className="w-3 h-3 fill-current text-green-500 mr-3 shrink-0"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span>30,000 words Per month</span>
                  </li>
                  <li className="flex items-center mb-3">
                    <svg
                      className="w-3 h-3 fill-current text-green-500 mr-3 shrink-0"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span>800 words Input length</span>
                  </li>
                  <li className="flex items-center mb-3">
                    <svg
                      className="w-3 h-3 fill-current text-green-500 mr-3 shrink-0"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span>5 questions per question type</span>
                  </li>
                  <li className="flex items-center mb-3">
                    <svg
                      className="w-3 h-3 fill-current text-green-500 mr-3 shrink-0"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span>Summarizer</span>
                  </li>
                  <li className="flex items-center mb-3">
                    <svg
                      className="w-3 h-3 fill-current text-green-500 mr-3 shrink-0"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span>
                      Generate Multiple Choice, True/False, Short Answer and
                      Fill- In-The-Blank Questions
                    </span>
                  </li>
                  <li className="flex items-center mb-3">
                    <svg
                      className="w-3 h-3 fill-current text-green-500 mr-3 shrink-0"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span>Input Content as Text</span>
                  </li>
                </ul>
                {!subscriped && (
                  <div
                    onClick={
                      handleBasicGetStarted
                    }
                    className=" p-3 mt-6"
                  >
                    <a
                      className="btn-sm text-white bg-orange-600 hover:bg-orange-700 w-full"
                      href="#0"
                    >
                      Get started
                    </a>
                  </div>
                )}
              </div>

              {/* Pricing table 2 */}
              <div
                className="relative flex flex-col h-full p-6 shadow-xl"
                data-aos="fade-up"
                data-aos-delay="800"
              >
                <div className="mb-4 pb-4 border-b border-gray-700">
                  <div className="h4 text-orange-600 mb-1">Premium</div>
                  <div className="inline-flex items-baseline mb-2">
                    <span className="text-2xl md:text-3xl font-medium text-gray-400">
                      {priceOutput.plan3[value][0]}
                    </span>
                    <span className="h2">{priceOutput.plan3[value][1]}</span>
                    <span className="font-medium text-gray-400">
                      {priceOutput.plan3[value][2]}
                    </span>
                  </div>
                  <div className="text-gray-400">Experience the full power of AI for education</div>
                </div>
                <div className="font-medium mb-3">
                  All features of Essential plus:
                </div>
                <ul className="text-gray-400 -mb-3 grow">
                  <li className="flex items-center mb-3">
                    <svg
                      className="w-3 h-3 fill-current text-green-500 mr-3 shrink-0"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span>70 000 words and 2000 words Input length</span>
                  </li>
                  <li className="flex items-center mb-3">
                    <svg
                      className="w-3 h-3 fill-current text-green-500 mr-3 shrink-0"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span>Input Content as .txt, .doc or .pdf</span>
                  </li>
                  <li className="flex items-center mb-3">
                    <svg
                      className="w-3 h-3 fill-current text-green-500 mr-3 shrink-0"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span>Create Study Guide</span>
                  </li>
                  <li className="flex items-center mb-3">
                    <svg
                      className="w-3 h-3 fill-current text-green-500 mr-3 shrink-0"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span>
                      Export Questions, and Study Guide as .txt,.doc or .pdf
                    </span>
                  </li>

                  <li className="flex items-center mb-3">
                    <svg
                      className="w-3 h-3 fill-current text-green-500 mr-3 shrink-0"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span>Auto-Save</span>
                  </li>
                </ul>
                {!subscriped && (
                  <div
                    onClick={
                      handlePremiumGetStarted}
                    className=" p-3 mt-6"
                  >
                    <a
                      className="btn-sm text-white bg-orange-600 hover:bg-orange-700 w-full"
                      href="#0"
                    >
                      Get started
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Full Pricing table */}
            <div>
              <h2 className="h2 font-hkgrotesk  text-center mt-24 mb-4">
                Full pricing tables
              </h2>
            </div>
            <div className="max-w-sm rounded-md justify-center mx-auto grid gap-8 lg:grid-cols-3 lg:gap-6 items-center lg:max-w-none">
              {/* Pricing table 1 */}

              <div
                className="relative flex flex-col h-full p-6 shadow-xl"
                data-aos="fade-up"
                data-aos-delay="700"
              >
                <div className="mb-4 pb-4 border-b border-gray-700">
                  <div className="h4 text-orange-600 mb-1">Plan</div>
                </div>
                <div className="font-medium mb-3">Price:</div>
                <div className="font-medium my-3">What's included :</div>
                <ul className="text-gray-400 -mb-3 grow">
                  <li className="flex items-center mb-3">
                    <span className="ml-4">Words Per Month</span>
                  </li>
                </ul>
                <div className="font-medium my-3">Features :</div>
                <ul className="text-gray-400 -mb-3 grow">
                  <li className="flex items-center mb-3">
                    <span className="ml-4">Input Length</span>
                  </li>
                  <li className="flex items-center mb-3">
                    <span className="ml-4">Number of question generated</span>
                  </li>
                  <li className="flex items-center mb-3">
                    <span className="ml-4">Summarizer</span>
                  </li>
                  <li className="flex items-center mb-3">
                    <span className="ml-4">Generate Questions</span>
                  </li>
                  <li className="flex items-center mb-3">
                    <span className="ml-4">Input Content as Text</span>
                  </li>
                  <li className="flex items-center mb-3">
                    <span className="ml-4">
                      Input Content as .txt, .doc or .pdf
                    </span>
                  </li>
                  <li className="flex items-center mb-3">
                    <span className="ml-4">Create Study Guide</span>
                  </li>
                </ul>
                <div className="font-medium my-3">Organization :</div>
                <ul className="text-gray-400 -mb-3 grow">
                  <li className="flex items-center mb-3">
                    <span className="ml-4">Project Folders</span>
                  </li>
                  <li className="flex items-center mb-3">
                    <span className="ml-4">
                      Export result .txt,.doc or .pdf
                    </span>
                  </li>
                  <li className="flex items-center mb-3">
                    <span className="ml-4">Auto-Save</span>
                  </li>
                  <li className="flex items-center mb-3">
                    <span className="ml-4">Revision History</span>
                  </li>
                </ul>
                <div className="font-medium my-3">Support :</div>
                <ul className="text-gray-400 -mb-3 grow">
                  <li className="flex items-center mb-3">
                    <span className="ml-4">Contact</span>
                  </li>
                  <li className="flex items-center mb-3">
                    <span className="ml-4">bevinzey Community</span>
                  </li>
                </ul>
                {!subscriped && (
                  <div className=" p-3 mt-6 invisible">
                    <a
                      className="btn-sm text-white bg-orange-600 hover:bg-orange-700 w-full"
                      href="#0"
                    >
                      Get started
                    </a>
                  </div>
                )}
              </div>

              {/* Pricing tables*/}

              <div
                className="relative flex flex-col h-full p-6 shadow-xl"
                data-aos="fade-up"
                data-aos-delay="800"
              >
                <div className="mb-4 pb-4 border-b border-gray-700">
                  <div className="h4 text-orange-600 mb-1">Starter</div>
                </div>
                <div className="font-medium mb-3">
                  {priceOutput.plan1[value][0]}
                  {priceOutput.plan1[value][1]}
                  {priceOutput.plan1[value][2]}
                </div>
                <div className="font-medium my-3 invisible">
                  What's included :
                </div>
                <ul className="text-gray-400 -mb-3 grow">
                  <li className="flex items-center mb-3">
                    <span className="ml-4">30,000 words</span>
                  </li>
                </ul>
                <div className="font-medium my-3 invisible">Features :</div>
                <ul className="text-gray-400 -mb-3 grow">
                  <li className="flex items-center mb-3">
                    <span className="ml-4">800 words</span>
                  </li>
                  <li className="flex items-center mb-3">
                    <span className="ml-4">5 questions per question type</span>
                  </li>
                  <li className="flex items-center mb-3">
                    <span className="ml-4 text-[#4BB543]">Yes</span>
                  </li>
                  <li className="flex items-center mb-3">
                    <span className="ml-4 text-[#4BB543]">Yes</span>
                  </li>
                  <li className="flex items-center mb-3">
                    <span className="ml-4 text-[#4BB543]">Yes</span>
                  </li>
                  <li className="flex items-center mb-3">
                    <span className="ml-4 text-[#ff3333]">No</span>
                  </li>
                  <li className="flex items-center mb-3">
                    <span className="ml-4 text-[#ff3333]">No</span>
                  </li>
                </ul>
                <div className="font-medium my-3 invisible">Organization :</div>
                <ul className="text-gray-400 -mb-3 grow">
                  <li className="flex items-center mb-3">
                    <span className="ml-4 text-[#ff3333]">No</span>
                  </li>
                  <li className="flex items-center mb-3">
                    <span className="ml-4 text-[#ff3333]">No</span>
                  </li>
                  <li className="flex items-center mb-3">
                    <span className="ml-4 text-[#ff3333]">No</span>
                  </li>
                  <li className="flex items-center mb-3">
                    <span className="ml-4 text-[#ff3333]">No</span>
                  </li>
                </ul>
                <div className="font-medium my-3 invisible">Support :</div>
                <ul className="text-gray-400 -mb-3 grow">
                  <li className="flex items-center mb-3">
                    <span className="ml-4">Email : support@bevinzey.com</span>
                  </li>
                  <li className="flex items-center mb-3">
                    <span className="ml-4">Priority Support</span>
                  </li>
                </ul>
                {!subscriped && (
                  <div className=" p-3 mt-6">
                    <button
                      className="btn-sm text-white bg-orange-600 hover:bg-orange-700 w-full"
                      onClick={basicGetSTarted}
                    >
                      Get started
                    </button>
                  </div>
                )}
              </div>

              <div
                className="relative flex flex-col h-full p-6 shadow-xl"
                data-aos="fade-up"
                data-aos-delay="800"
              >
                <div className="mb-4 pb-4 border-b border-gray-700">
                  <div className="h4 text-orange-600 mb-1">Starter</div>
                </div>
                <div className="font-medium mb-3">
                  {priceOutput.plan3[value][0]}
                  {priceOutput.plan3[value][1]}
                  {priceOutput.plan3[value][2]}
                </div>
                <div className="font-medium my-3 invisible">
                  What's included :
                </div>
                <ul className="text-gray-400 -mb-3 grow">
                  <li className="flex items-center mb-3">
                    <span className="ml-4">70,000 words</span>
                  </li>
                </ul>
                <div className="font-medium my-3 invisible">Features :</div>
                <ul className="text-gray-400 -mb-3 grow">
                  <li className="flex items-center mb-3">
                    <span className="ml-4">2000 words</span>
                  </li>
                  <li className="flex items-center mb-3">
                    <span className="ml-4">10 questions per question type</span>
                  </li>
                  <li className="flex items-center mb-3">
                    <span className="ml-4 text-[#4BB543]">Yes</span>
                  </li>
                  <li className="flex items-center mb-3">
                    <span className="ml-4 text-[#4BB543]">Yes</span>
                  </li>
                  <li className="flex items-center mb-3">
                    <span className="ml-4 text-[#4BB543]">Yes</span>
                  </li>
                  <li className="flex items-center mb-3">
                    <span className="ml-4 text-[#4BB543]">Yes</span>
                  </li>
                  <li className="flex items-center mb-3">
                    <span className="ml-4 text-[#4BB543]">Yes</span>
                  </li>
                </ul>
                <div className="font-medium my-3 invisible">Organization :</div>
                <ul className="text-gray-400 -mb-3 grow">
                  <li className="flex items-center mb-3">
                    <span className="ml-4 text-[#4BB543]">Yes</span>
                  </li>
                  <li className="flex items-center mb-3">
                    <span className="ml-4 text-[#4BB543]">Yes</span>
                  </li>
                  <li className="flex items-center mb-3">
                    <span className="ml-4 text-[#4BB543]">Yes</span>
                  </li>
                  <li className="flex items-center mb-3">
                    <span className="ml-4 text-[#4BB543]">Yes</span>
                  </li>
                </ul>
                <div className="font-medium my-3 invisible">Support :</div>
                <ul className="text-gray-400 -mb-3 grow">
                  <li className="flex items-center mb-3">
                    <span className="ml-4">Email : support@bevinzey.com</span>
                  </li>
                  <li className="flex items-center mb-3">
                    <span className="ml-4">Priority Support</span>
                  </li>
                </ul>
                {!subscriped && (
                  <div className=" p-3 mt-6">
                    <button
                      className="btn-sm text-white bg-orange-600 hover:bg-orange-700 w-full"
                      onClick={premiumGetStarted}
                    >
                      Get started
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom infobox */}
            <div className="flex flex-col lg:flex-row justify-between items-center mt-12 lg:mt-6 lg:py-8 lg:border-t lg:border-b lg:border-gray-800">
              <div className="font-medium text-lg text-center lg:text-left mb-4 lg:mb-0">
                Need more than 70,000 words per month?
              </div>
              <div>
                <a
                  className="btn-sm text-white bg-orange-600 hover:bg-orange-700"
                  href="/contact"
                >
                  Contact us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PricingTables;
