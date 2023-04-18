import React from "react";

import FeatImage01 from "../images/features-03-image-01.png";
import FeatImage02 from "../images/features-03-image-02.png";
import FeatImage03 from "../images/features-03-image-03.png";
import imaga from "../images/c.png";
import imagb from "../images/v.png";
import imagd from "../images/d.png";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

function FeaturesZigzag() {
  const { isLoggedIn } = useSelector((state) => state.auth)
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 border-t border-gray-800">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <div className="inline-flex text-sm font-semibold py-1 px-3 m-2 text-green-600 bg-green-200 rounded-full mb-4">
              Reach goals that matter
            </div>
            <h1 className="h2 mb-4">Master any subject in record time.</h1>
            <p className="text-xl text-gray-400">
              study, learn new things and get more knowledge in less time. A
              better way is here!
            </p>
          </div>

          {/* Items */}
          <div className="grid gap-20">
            {/* 1st item */}
            <div className="md:grid md:grid-cols-12 md:gap-6 items-center">
              {/* Image */}
              <div
                className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1"
                data-aos="fade-up"
              >
                <img
                  className="max-w-full mx-auto md:max-w-none h-auto"
                  src={imaga}
                  width="540"
                  height="405"
                  alt="Features 01"
                />
              </div>
              {/* Content */}
              <div
                className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6"
                data-aos="fade-right"
              >
                <div className="md:pr-4 lg:pr-12 xl:pr-16">
                  <div className="font-architects-daughter text-xl text-orange-600 mb-2">
                    More speed. Less spend
                  </div>
                  <h3 className="h3 mb-3">Bevinzey AI Tools</h3>
                  <p className="text-xl text-gray-400 mb-4">
                    "Knowledge is power, and we want to be there for you when it
                    matters most. Our goal involves harnessing the new
                    technologies of artificial intelligence so that you can
                    master any content faster than ever before. With Bevinzey,
                    the help you need is just a few clicks away."
                  </p>
                  <ul className="text-lg text-gray-400 -mb-2">
                    <Link to={isLoggedIn ? "/services" : "/signin"}>
                      <li className="flex items-center mb-2">
                        <svg
                          className="w-3 h-3 fill-current text-green-500 mr-2 shrink-0"
                          viewBox="0 0 12 12"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                        </svg>
                        <span>Summarize text to key points </span>
                      </li>
                    </Link>
                    <Link to={isLoggedIn ? "/services" : "/signin"}>
                      <li className="flex items-center mb-2">
                        <svg
                          className="w-3 h-3 fill-current text-green-500 mr-2 shrink-0"
                          viewBox="0 0 12 12"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                        </svg>
                        <span>Text to questions</span>
                      </li>
                    </Link>
                    <Link to={isLoggedIn ? "/services" : "/signin"}>
                      <li className="flex items-center mb-2">
                        <svg
                          className="w-3 h-3 fill-current text-green-500 mr-2 shrink-0"
                          viewBox="0 0 12 12"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                        </svg>
                        <span>Audio Transcription</span>
                      </li>
                    </Link>
                    <Link to={isLoggedIn ? "/services" : "/signin"}>
                      <li className="flex items-center mb-2">
                        <svg
                          className="w-3 h-3 fill-current text-green-500 mr-2 shrink-0"
                          viewBox="0 0 12 12"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                        </svg>
                        <span>Chat Bevinzey</span>
                      </li>
                    </Link>
                    <Link to={isLoggedIn ? "/services" : "/signin"}>
                      <li className="flex items-center mb-2">
                        <svg
                          className="w-3 h-3 fill-current text-green-500 mr-2 shrink-0"
                          viewBox="0 0 12 12"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                        </svg>
                        <span>Mentor Chat Bevinzey</span>
                      </li>
                    </Link>
                  </ul>
                </div>
              </div>
            </div>

            {/* 2nd item */}
            <div className="md:grid md:grid-cols-12 md:gap-6 items-center">
              {/* Image */}
              <div
                className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:rtl"
                data-aos="fade-up"
              >
                <img
                  className="max-w-full mx-auto md:max-w-none h-auto"
                  src={imagd}
                  width="540"
                  height="405"
                  alt="Features 02"
                />
              </div>
              {/* Content */}
              <div
                className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6"
                data-aos="fade-left"
              >
                <div className="md:pl-4 lg:pl-12 xl:pl-16">
                  <div className="font-architects-daughter text-xl text-orange-600 mb-2">
                    More speed. Less spend
                  </div>
                  <h3 className="h3 mb-3">One product, unlimited solutions</h3>
                  {/* <p className="text-xl text-gray-400 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p> */}
                  <ul className="text-lg text-gray-400 -mb-2">
                    <Link>
                      <li className="flex items-center mb-2">
                        <svg
                          className="w-3 h-3 fill-current text-green-500 mb-12 mr-2 shrink-0"
                          to={isLoggedIn ? "/services" : "/signin"}
                          viewBox="0 0 12 12"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                        </svg>
                        <span>
                          Be careful you might not get what you need from
                          Bevinzey if your content is highly specialized to a
                          domain and contains specific jargon.
                        </span>
                      </li>
                    </Link>
                    <Link>
                      <li className="flex items-center mb-2">
                        <svg
                          to={isLoggedIn ? "/services" : "/signin"}
                          className="w-3 h-3 fill-current text-green-500 mb-6 mr-2 shrink-0"
                          viewBox="0 0 12 12"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                        </svg>
                        <span>
                          Bevinzey works with structured, factual text that
                          doesn't follow an overly sophisticated writing style.
                        </span>
                      </li>
                    </Link>
                    <Link>
                      <li className="flex items-center mb-2">
                        <svg
                          className="w-3 h-3 fill-current text-green-500 mr-2 mb-20 shrink-0"
                          viewBox="0 0 12 12"
                          to={isLoggedIn ? "/services" : "/signin"}
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                        </svg>
                        <span>
                          Bevinzey develops tests that assess your students'
                          capacity to cite instances of broad concepts discussed
                          in the material and explain causal linkages based on
                          openly stated reasoning.
                        </span>
                      </li>
                    </Link>
                  </ul>
                </div>
              </div>
            </div>

            {/* 3rd item */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturesZigzag;
