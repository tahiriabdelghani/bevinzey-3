import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../images/white-logo.png";
import shortLogo from "../images/logo.png";
import { useSelector } from "react-redux";
import axios from "axios";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  useEffect(() => {
    sidebarOpen && !sidebarExpanded && setSidebarExpanded(true);
  }, [sidebarOpen]);

  const [subscriped, setSubscriped] = useState(false);
  useEffect(() => {
    axios
      .get(
        "https://plankton-app-q74hx.ondigitalocean.app/users/find/" + user?.id
      )
      .then((res) => {
        if (res.data.subscription.Status === "Active") {
          setSubscriped(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0  bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex bg-slate-800 flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 p-4 pr-0 transition-all duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        {/* Sidebar header */}
        <div className="">
          <div className={`flex justify-between pr-3 sm:px-2`}>
            {/* Close button */}
            <button
              ref={trigger}
              className="lg:hidden text-slate-500 hover:text-slate-400"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
            >
              <span className="sr-only">Close sidebar</span>
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
              </svg>
            </button>
            {/* Logo */}
            <NavLink end to="/" className="block mt-4">
              <img className={`hidden 2xl:block`} src={logo} />
              {sidebarExpanded === true ? (
                <img className={`2xl:hidden`} src={logo} />
              ) : (
                <img
                  className={`2xl:hidden sidebar-expandded:hidden`}
                  src={shortLogo}
                />
              )}
            </NavLink>
          </div>
        </div>

        {/* Links */}
        <div className="space-y-8 mt-20">
          {/* Pages group */}
          <div>
            <ul className="">
              {/* services */}
              {subscriped && (
                <li
                  className={`px-3 py-3 last:mb-0 ${
                    pathname.includes("services")
                      ? "bg-gray-400 rounded-l-full"
                      : ""
                  }`}
                >
                  <NavLink
                    end
                    to="/services"
                    className={`block flex text-slate-200 hover:text-white  transition duration-150 ${
                      pathname.includes("services") && "hover:text-slate-200"
                    }`}
                  >
                    <div>
                      <svg
                        width="24px"
                        height="24px"
                        viewBox="0 0 1024 1024"
                        className="icon"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#000000"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <path
                            d="M546.133333 733.866667c2.133333-8.533333 2.133333-19.2 2.133334-29.866667s0-19.2-2.133334-29.866667l59.733334-42.666666c6.4-4.266667 8.533333-12.8 4.266666-19.2l-57.6-98.133334c-4.266667-6.4-10.666667-8.533333-17.066666-6.4L469.333333 539.733333c-14.933333-12.8-32-21.333333-51.2-29.866666l-6.4-72.533334c0-6.4-6.4-12.8-12.8-12.8h-113.066666c-6.4 0-12.8 6.4-12.8 12.8l-8.533334 74.666667c-19.2 6.4-34.133333 17.066667-51.2 29.866667L147.2 512c-6.4-2.133333-14.933333 0-17.066667 6.4l-57.6 98.133333c-4.266667 6.4-2.133333 14.933333 4.266667 19.2l59.733333 42.666667c-2.133333 8.533333-2.133333 19.2-2.133333 29.866667s0 19.2 2.133333 29.866666l-59.733333 42.666667c-6.4 4.266667-8.533333 12.8-4.266667 19.2l57.6 98.133333c4.266667 6.4 10.666667 8.533333 17.066667 6.4L213.333333 874.666667c14.933333 12.8 32 21.333333 51.2 29.866666l6.4 72.533334c0 6.4 6.4 12.8 12.8 12.8h113.066667c6.4 0 12.8-6.4 12.8-12.8l6.4-72.533334c19.2-6.4 34.133333-17.066667 51.2-29.866666l66.133333 29.866666c6.4 2.133333 14.933333 0 17.066667-6.4l57.6-98.133333c4.266667-6.4 2.133333-14.933333-4.266667-19.2l-57.6-46.933333zM341.333333 810.666667c-59.733333 0-106.666667-46.933333-106.666666-106.666667s46.933333-106.666667 106.666666-106.666667 106.666667 46.933333 106.666667 106.666667-46.933333 106.666667-106.666667 106.666667z"
                            fill="#E65100"
                          ></path>
                          <path
                            d="M893.866667 326.4c2.133333-10.666667 2.133333-19.2 2.133333-27.733333s0-17.066667-2.133333-27.733334l53.333333-38.4c6.4-4.266667 6.4-10.666667 4.266667-17.066666l-53.333334-91.733334c-4.266667-6.4-10.666667-8.533333-17.066666-4.266666l-61.866667 27.733333c-14.933333-10.666667-29.866667-19.2-46.933333-27.733333l-6.4-66.133334c2.133333-6.4-2.133333-10.666667-8.533334-10.666666h-104.533333c-6.4 0-12.8 4.266667-12.8 10.666666l-6.4 66.133334c-17.066667 6.4-32 14.933333-46.933333 27.733333l-61.866667-27.733333c-6.4-2.133333-12.8 0-17.066667 4.266666l-53.333333 91.733334c-4.266667 6.4-2.133333 12.8 4.266667 17.066666l53.333333 38.4V298.666667c0 8.533333 0 17.066667 2.133333 27.733333l-53.333333 38.4c-6.4 4.266667-6.4 10.666667-4.266667 17.066667l53.333334 91.733333c4.266667 6.4 10.666667 8.533333 17.066666 4.266667l61.866667-27.733334c14.933333 10.666667 29.866667 19.2 46.933333 27.733334l6.4 66.133333c0 6.4 6.4 10.666667 12.8 10.666667h104.533334c6.4 0 12.8-4.266667 12.8-10.666667l6.4-66.133333c17.066667-6.4 32-14.933333 46.933333-27.733334l61.866667 27.733334c6.4 2.133333 12.8 0 17.066666-4.266667l53.333334-91.733333c4.266667-6.4 2.133333-12.8-4.266667-17.066667l-59.733333-38.4zM704 405.333333c-59.733333 0-106.666667-46.933333-106.666667-106.666666s46.933333-106.666667 106.666667-106.666667 106.666667 46.933333 106.666667 106.666667-46.933333 106.666667-106.666667 106.666666z"
                            fill="#FFA000"
                          ></path>
                        </g>
                      </svg>
                    </div>
                    <div className="flex items-center overflow-hidden">
                      <span
                        className={`text-white text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-50 2xl:opacity-100 duration-200 ${
                          !pathname.includes("services") && "text-slate-400 "
                        }`}
                      >
                        Services
                      </span>
                    </div>
                  </NavLink>
                </li>
              )}
              {/* Profile */}
              <li
                className={`px-3 py-3 last:mb-0 ${
                  pathname.includes("profile")
                    ? "bg-gray-400 rounded-l-full"
                    : ""
                }`}
              >
                <NavLink
                  end
                  to="/profile"
                  className={`block flex text-white hover:text-white truncate transition duration-150 ${
                    pathname.includes("profile") && "hover:text-white"
                  }`}
                >
                  <div>
                    <svg
                      width="24px"
                      height="24px"
                      viewBox="0 0 32 32"
                      enable-background="new 0 0 32 32"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#000000"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <g id="Home"></g> <g id="Print"></g> <g id="Mail"></g>{" "}
                        <g id="Camera"></g> <g id="Video"></g> <g id="Film"></g>{" "}
                        <g id="Message"></g> <g id="Telephone"></g>{" "}
                        <g id="User">
                          {" "}
                          <path
                            d="M21.6,17c2.1-1.6,3.4-4.2,3.4-7c0-5-4-9-9-9s-9,4-9,9c0,2.8,1.3,5.4,3.4,7C5.2,17.3,1,21.7,1,27v3 c0,0.5,0.5,1,1,1h14h14c0.5,0,1-0.5,1-1v-3C31,21.7,26.8,17.3,21.6,17z"
                            fill="#FFA000"
                          ></path>{" "}
                          <path
                            d="M21.6,17c-1.5,1.2-3.5,2-5.6,2s-4.1-0.7-5.6-2C5.2,17.3,1,21.7,1,27v3c0,0.5,0.5,1,1,1h14h14 c0.5,0,1-0.5,1-1v-3C31,21.7,26.8,17.3,21.6,17z"
                            fill="#E65100"
                          ></path>{" "}
                        </g>{" "}
                        <g id="File"></g> <g id="Folder"></g> <g id="Map"></g>{" "}
                        <g id="Download"></g> <g id="Upload"></g>{" "}
                        <g id="Video_Recorder"></g> <g id="Schedule"></g>{" "}
                        <g id="Cart"></g> <g id="Setting"></g>{" "}
                        <g id="Search"></g> <g id="Pencils"></g>{" "}
                        <g id="Group"></g> <g id="Record"></g>{" "}
                        <g id="Headphone"></g> <g id="Music_Player"></g>{" "}
                        <g id="Sound_On"></g> <g id="Sound_Off"></g>{" "}
                        <g id="Lock"></g> <g id="Lock_open"></g>{" "}
                        <g id="Love"></g> <g id="Favorite"></g>{" "}
                        <g id="Film_1_"></g> <g id="Music"></g>{" "}
                        <g id="Puzzle"></g> <g id="Turn_Off"></g>{" "}
                        <g id="Book"></g> <g id="Save"></g> <g id="Reload"></g>{" "}
                        <g id="Trash"></g> <g id="Tag"></g> <g id="Link"></g>{" "}
                        <g id="Like"></g> <g id="Bad"></g> <g id="Gallery"></g>{" "}
                        <g id="Add"></g> <g id="Close"></g> <g id="Forward"></g>{" "}
                        <g id="Back"></g> <g id="Buy"></g> <g id="Mac"></g>{" "}
                        <g id="Laptop"></g>{" "}
                      </g>
                    </svg>
                  </div>
                  <div className="flex items-center overflow-hidden">
                    <span
                      className={`text-white text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${
                        !pathname.includes("profile") && "text-slate-400 "
                      }`}
                    >
                      Profile
                    </span>
                  </div>
                </NavLink>
              </li>
              <li
                className={`px-3 py-3 rounded-sm last:mb-0 bg-slate-800`}
              ></li>
            </ul>
          </div>
        </div>

        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-3 py-3">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg
                className="w-6 h-6 fill-current sidebar-expanded:rotate-180"
                viewBox="0 0 24 24"
              >
                <path
                  className="text-slate-400"
                  d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
                />
                <path className="text-[#ADB5CC]" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
