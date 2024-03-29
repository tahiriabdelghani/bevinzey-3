import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/Favicon.ico";
import youtube from "../images/youtube.png";
import x from "../images/x.png";

function Footer() {
  const navigate = useNavigate();

  const { isLoggedIn } = useSelector((state) => state.auth);
  return (
    <footer>
      <div className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Top area: Blocks */}
          <div className="grid md:grid-cols-12 gap-8 lg:gap-20 mb-8 md:mb-12">
            {/* 1st block */}
            <div className="md:col-span-4 lg:col-span-5">
              <div className="mb-2">
                {/* Logo */}
                <Link to="/" className="inline-block" aria-label="Cruip">
                  <img
                    alt="logo"
                    src={logo}
                    className="sm:h-14 w-8 h-8 sm:w-16 animate-bounce"
                  />
                </Link>
              </div>
              <div className="text-gray-400 text-md">
                An ai-powered learning and question generation platform for
                students and educators
              </div>
            </div>

            {/* 2nd, 3rd and 4th blocks */}
            <div className="md:col-span-8 lg:col-span-7 grid sm:grid-cols-3 gap-8">
              {/* 2nd block */}
              <div className="text-md ">
                <h6 className="text-gray-200 font-medium mb-1 mb:mb-4 ">
                  Services
                </h6>
                <ul className="space-y-2">
                  <li className="mb-1">
                    <Link
                      to={isLoggedIn ? "/services" : "/signin"}
                      className="text-gray-400 hover:text-orange-600 transition duration-150 ease-in-out"
                    >
                      Summarize text to key points
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link
                      to={isLoggedIn ? "/services" : "/signin"}
                      className="text-gray-400 hover:text-orange-600 transition duration-150 ease-in-out"
                    >
                      Text to questions
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link
                      to={isLoggedIn ? "/services" : "/signin"}
                      className="text-gray-400 hover:text-orange-600 transition duration-150 ease-in-out"
                    >
                      Audio Transcription
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link
                      to={isLoggedIn ? "/services" : "/signin"}
                      className="text-gray-400 hover:text-orange-600 transition duration-150 ease-in-out"
                    >
                      Chat Bevinzey
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link
                      to={isLoggedIn ? "/services" : "/signin"}
                      className="text-gray-400 hover:text-orange-600 transition duration-150 ease-in-out"
                    >
                      Mentor Chat Bevinzey
                    </Link>
                  </li>
                </ul>
              </div>

              {/* 3rd block */}
              <div className="text-md">
                <h6 className="text-gray-200 mb:mb-3  font-medium mb-1">
                  Bevinzey Pricing
                </h6>
                <ul className="space-y-2">
                  <li className="mb-1">
                    <Link
                      to="/pricing"
                      className="text-gray-400 hover:text-orange-600 transition duration-150 ease-in-out"
                    >
                      Billed Annually
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link
                      to="/pricing"
                      className="text-gray-400 hover:text-orange-600 transition duration-150 ease-in-out"
                    >
                      Billed Monthly
                    </Link>
                  </li>
                </ul>
              </div>

              {/* 4th block */}
              <div className="text-md">
                <h6 className="text-gray-200 mb:mb-3  font-medium mb-1">
                  Support
                </h6>
                <ul className="space-y-2">
                  <li className="mb-1">
                    <Link
                      to="/"
                      className="text-gray-400 hover:text-orange-600 transition duration-150 ease-in-out"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link
                      to="/contact"
                      className="text-gray-400 hover:text-orange-600 transition duration-150 ease-in-out"
                    >
                      Contact us
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link
                      to="/blog"
                      className="text-gray-400 hover:text-orange-600 transition duration-150 ease-in-out"
                    >
                      Blog
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom area */}
          <div className="md:flex md:items-center md:justify-between">
            {/* Social links */}
            <ul className="flex mb-4 md:order-1 0 md:ml-4 md:mb-0">
              <li className="ml-4">
                <a
                  target="_blank"
                  href="https://twitter.com/bevinzey"
                  className="flex justify-center items-center text-orange-600 bg-white hover:text-gray-100 hover:bg-orange-600 rounded-full transition duration-150 ease-in-out"
                  aria-label="Github"
                >
                  <img width="6" height="6" className="h-8 w-8 p-2" src={x} />
                </a>
              </li>
              <li className="ml-4">
                <a
                  target="_blank"
                  href="https://www.youtube.com/channel/UCnJVvKeQ4y88coeCA6L-Lpw"
                  className="flex justify-center items-center text-orange-600 bg-white hover:text-gray-100 hover:bg-orange-600 rounded-full transition duration-150 ease-in-out"
                  aria-label="Github"
                >
                  <img width="6" height="6" className="h-8 w-8" src={youtube} />
                </a>
              </li>
              <li className="ml-4">
                <a
                  target="_blank"
                  href="https://www.facebook.com/bevinzey"
                  className="flex justify-center items-center text-orange-600 bg-white hover:text-gray-100 hover:bg-orange-600 rounded-full transition duration-150 ease-in-out"
                  aria-label="Facebook"
                >
                  <svg
                    className="w-8 h-8 fill-current"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M14.023 24L14 17h-3v-3h3v-2c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V14H21l-1 3h-2.72v7h-3.257z" />
                  </svg>
                </a>
              </li>
              <li className="ml-4">
                <a
                  target="_blank"
                  href="https://www.instagram.com/bevinzey/"
                  className="flex justify-center items-center text-orange-600 bg-white hover:text-gray-100 hover:bg-orange-600 rounded-full transition duration-150 ease-in-out"
                  aria-label="Instagram"
                >
                  <svg
                    className="w-8 h-8 fill-current"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="20.145" cy="11.892" r="1" />
                    <path d="M16 20c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4zm0-6c-1.103 0-2 .897-2 2s.897 2 2 2 2-.897 2-2-.897-2-2-2z" />
                    <path d="M20 24h-8c-2.056 0-4-1.944-4-4v-8c0-2.056 1.944-4 4-4h8c2.056 0 4 1.944 4 4v8c0 2.056-1.944 4-4 4zm-8-14c-.935 0-2 1.065-2 2v8c0 .953 1.047 2 2 2h8c.935 0 2-1.065 2-2v-8c0-.935-1.065-2-2-2h-8z" />
                  </svg>
                </a>
              </li>
              <li className="ml-4">
                <a
                  target="_blank"
                  href="https://www.linkedin.com/company/bevinzey/"
                  className="flex justify-center items-center text-orange-600 bg-white hover:text-gray-100 hover:bg-orange-600 rounded-full transition duration-150 ease-in-out"
                  aria-label="Linkedin"
                >
                  <svg
                    className="w-8 h-8 fill-current"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M23.3 8H8.7c-.4 0-.7.3-.7.7v14.7c0 .3.3.6.7.6h14.7c.4 0 .7-.3.7-.7V8.7c-.1-.4-.4-.7-.8-.7zM12.7 21.6h-2.3V14h2.4v7.6h-.1zM11.6 13c-.8 0-1.4-.7-1.4-1.4 0-.8.6-1.4 1.4-1.4.8 0 1.4.6 1.4 1.4-.1.7-.7 1.4-1.4 1.4zm10 8.6h-2.4v-3.7c0-.9 0-2-1.2-2s-1.4 1-1.4 2v3.8h-2.4V14h2.3v1c.3-.6 1.1-1.2 2.2-1.2 2.4 0 2.8 1.6 2.8 3.6v4.2h.1z" />
                  </svg>
                </a>
              </li>
            </ul>

            {/* Copyrights note */}
            <div className="text-gray-400 text-sm mr-4">
              &copy; bevinzey.com. All rights reserved.
            </div>

            <div className="text-gray-400 text-sm mr-4 mt-4">
              <Link to="/privacy-policy" className="border-2 px-2 py-1 rounded-full border-gray-400 mr-4">Privacy Policy</Link>
              <Link to="/terms-of-service" className="border-2 px-2 py-1 rounded-full border-gray-400">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
