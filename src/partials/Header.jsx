import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "../utils/Dropdown";
import logo from "../images/white-logo.png";
import HeaderOption from "./HeaderOption";
import DropDownItem from "./DropDownItem";
import events from "../images/events.png";
import blognav from "../images/blognav.png";
import help from "../images/help.png";
import { useDispatch, useSelector } from "react-redux";
import DropdownProfile from "../components/DropdownProfile";
import axios from "axios";
import { logoutUser } from "../redux/auth";

function Header() {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  // const {user} = useSelector((state)=>state.auth)

  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const trigger = useRef(null);
  const mobileNav = useRef(null);

  // close the mobile menu on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!mobileNav.current || !trigger.current) return;
      if (
        !mobileNavOpen ||
        mobileNav.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setMobileNavOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close the mobile menu if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!mobileNavOpen || keyCode !== 27) return;
      setMobileNavOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

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


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logOut = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <header className="fixed w-full z-30 shadow-slate-800 bg-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-2">
        <div className="flex items-center justify-between h-20">
          {/* Site branding */}
          <div className="shrink-0 mr-4">
            {/* Logo */}
            <Link to="/" className="block mb-1 w-40" aria-label="Cruip">
              <img src={logo} alt="logo" />
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">
            {/* Desktop menu links */}
            <ul className="flex  text-md font-normal grow justify-end flex-wrap items-center">
              <li>
                <HeaderOption text="Home" to="/" />
              </li>
              <li>
                <HeaderOption to="/pricing" text="Pricing" />
              </li>

              <li>
                <HeaderOption to="/about" text="About us" />
              </li>
              {/* 1st level: hover */}
              <Dropdown title="Support">
                {/* 2nd level: hover */}

                {/* <li>
                  <Link to="/contact" className="font-medium text-sm text-gray-400 hover:text-orange-600 flex py-2 px-4 leading-tight">Contact us</Link>
                </li>
                <li>
                  <Link to="/help" className="font-medium text-sm text-gray-400 hover:text-orange-600 flex py-2 px-4 leading-tight">Help center</Link>
                </li>
                <li>
                  <Link to="/404" className="font-medium text-sm text-gray-400 hover:text-orange-600 flex py-2 px-4 leading-tight">404</Link>
                </li> */}
                <div className="flex">
                  <div className="flex-[50%]">
                    <DropDownItem
                      to="#"
                      Image={events}
                      Title="Video Tutorials"
                      Description="Video Tutorials by Bevinzey"
                    />
                  </div>
                  <div className="flex-[50%]">
                    <DropDownItem
                      to="/contact"
                      Image={help}
                      Title="Contact us"
                      Description="Contact us by Bevinzey"
                    />
                  </div>
                </div>
                <div className="flex  ">
                  <div className="flex-[50%]">
                    <DropDownItem
                      to="/blog"
                      Image={blognav}
                      Title="Blog"
                      Description="Blogs thrown by Bevinzey"
                    />
                  </div>
                  <div className="flex-[50%]">
                    {/* <DropDownItem
                      to="#"
                      Image={events}
                      Title="Event"
                      Description="Events thrown by Bevinzey"
                    /> */}
                  </div>
                </div>
              </Dropdown>
              {isLoggedIn && subscriped && (
                <li>
                  <HeaderOption to="/services" text="Services" />
                </li>
              )}
            </ul>

            {/* Desktop sign in links */}

            {isLoggedIn ? (
              <ul className="flex grow justify-end flex-wrap items-center">
                <li>
                  <DropdownProfile align="right" />
                </li>
              </ul>
            ) : (
              <ul className="flex grow justify-end flex-wrap items-center">
                <li>
                  <Link
                    to="/signin"
                    className="font-medium 

              rounded-full border-2 border-orange-600
              text-white px-5 py-2 flex
               items-center transition duration-150 ease-in-out"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="btn-sm
               bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600
               text-white px-5 py-2.5 border-2  rounded-full hover:bg-orange-700 ml-3"
                  >
                    Sign up
                  </Link>
                </li>
              </ul>
            )}
          </nav>

          {/* Mobile menu */}
          <div className="md:hidden">
            {/* Hamburger button */}
            <button
              ref={trigger}
              className={`hamburger ${mobileNavOpen && "active"}`}
              aria-controls="mobile-nav"
              aria-expanded={mobileNavOpen}
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
            >
              <span className="sr-only">Menu</span>
              <svg
                className="w-6 h-6 fill-current text-gray-300 hover:text-gray-200 transition duration-150 ease-in-out"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect y="4" width="24" height="2" rx="1" />
                <rect y="11" width="24" height="2" rx="1" />
                <rect y="18" width="24" height="2" rx="1" />
              </svg>
            </button>

            {/*Mobile navigation */}
            <nav
              id="mobile-nav"
              ref={mobileNav}
              className="absolute top-full z-20 left-0 w-full px-4 sm:px-6 overflow-hidden transition-all duration-300 ease-in-out"
              style={
                mobileNavOpen
                  ? { maxHeight: mobileNav.current.scrollHeight, opacity: 1 }
                  : { maxHeight: 0, opacity: 0.8 }
              }
            >
              <ul className="bg-gray-800 px-4 py-2">
                {isLoggedIn ? (
                  <li>
                    <Link
                      to="/profile"
                      className="flex text-gray-300 hover:text-gray-200 py-2"
                    >
                      Profile
                    </Link>
                  </li>
                ) : (
                  <></>
                )}
                {isLoggedIn && subscriped ? (
                  <li>
                    <Link
                      to="/services"
                      className="flex text-gray-300 hover:text-gray-200 py-2"
                    >
                      Services
                    </Link>
                  </li>
                ) : (
                  <></>
                )}
                <li>
                  <Link
                    to="/pricing"
                    className="flex text-gray-300 hover:text-gray-200 py-2"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blog"
                    className="flex text-gray-300 hover:text-gray-200 py-2"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="flex text-gray-300 hover:text-gray-200 py-2"
                  >
                    About us
                  </Link>
                </li>
                <li className="py-2 my-2 border-t border-b border-gray-700">
                  <span className="flex text-gray-300 py-2">Support</span>
                  <ul className="pl-4">
                    <li>
                      <Link
                        to="/contact"
                        className="text-sm flex font-medium text-gray-400 hover:text-gray-200 py-2"
                      >
                        Contact us
                      </Link>
                    </li>
                  </ul>
                </li>
                {!isLoggedIn ? (
                  <>
                    <li>
                      <Link
                        to="/signin"
                        className="flex font-medium w-full text-orange-600 hover:text-gray-200 py-2 justify-center"
                      >
                        Sign in
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/signup"
                        className="font-medium w-full inline-flex items-center justify-center border border-transparent px-4 py-2 my-2 rounded-sm text-white bg-orange-600 hover:bg-orange-700 transition duration-150 ease-in-out"
                      >
                        Sign up
                      </Link>
                    </li>
                  </>
                ) : (
                  <li></li>
                )}
                {isLoggedIn ? (
                  <>
                    <li onClick={logOut} className="cursor-pointer font-medium w-full inline-flex items-center justify-center border border-transparent px-4 py-2 my-2 rounded-sm text-white bg-orange-600 hover:bg-orange-700 transition duration-150 ease-in-out">
                      Sign out
                    </li>
                  </>
                ) : (
                  <li></li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
