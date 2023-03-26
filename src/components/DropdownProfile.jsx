import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/auth";
import Transition from "../utils/Transition";
import defaultPicture from "../images/profile.png";

function DropdownProfile({ align }) {
  const { user } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  //Sign Out user
  const logOut = () => {
    dispatch(logoutUser());
    navigate("/");
    setDropdownOpen(!dropdownOpen);
  };

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  const [userData, setUserdata] = useState(null);

  useEffect(() => {
    axios
      .get(
        "https://plankton-app-q74hx.ondigitalocean.app/users/find/" + user?.id
      )
      .then((res) => {
        setUserdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="relative inline-flex">
      {userData && (
        <button
          ref={trigger}
          className="inline-flex justify-center items-center group"
          aria-haspopup="true"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          aria-expanded={dropdownOpen}
        >
          <img
            className="w-8 h-8 rounded-full bg-white"
            src={userData?.urlPhoto ?? ""}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = "/images/profile.png";
            }}
            width="32"
            height="32"
            alt="User"
          />
          <div className="flex items-center truncate">
            <div className="hidden md:flex flex-col text-start mr-2">
              <span className="truncate ml-2 text-sm font-medium">
                {userData?.first_name + " " + userData?.last_name}
              </span>
              <span className="flex justify-between truncate ml-2 text-[10px] font-medium">
                <span className="mr-2">{"@" + userData?.username}</span>
                <span>{userData?.subscription?.words_per_month} Credits</span>
              </span>
            </div>
            <svg
              className="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400"
              viewBox="0 0 12 12"
            >
              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
            </svg>
          </div>
        </button>
      )}

      <Transition
        className={`origin-top-right z-10 absolute top-full min-w-44 bg-white border border-slate-200 py-1.5 rounded shadow-lg overflow-hidden mt-1 ${
          align === "right" ? "right-0" : "left-0"
        }`}
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          <ul className="w-[110px]">
            <li>
              <Link
                className="font-medium cursor-pointer text-sm text-slate-800 hover:text-slate-600 flex items-center py-1 px-3"
                to="/profile"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <svg
                  width="16px"
                  height="16px"
                  viewBox="0 0 32 32"
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
                    <g id="Cart"></g> <g id="Setting"></g> <g id="Search"></g>{" "}
                    <g id="Pencils"></g> <g id="Group"></g> <g id="Record"></g>{" "}
                    <g id="Headphone"></g> <g id="Music_Player"></g>{" "}
                    <g id="Sound_On"></g> <g id="Sound_Off"></g>{" "}
                    <g id="Lock"></g> <g id="Lock_open"></g> <g id="Love"></g>{" "}
                    <g id="Favorite"></g> <g id="Film_1_"></g>{" "}
                    <g id="Music"></g> <g id="Puzzle"></g> <g id="Turn_Off"></g>{" "}
                    <g id="Book"></g> <g id="Save"></g> <g id="Reload"></g>{" "}
                    <g id="Trash"></g> <g id="Tag"></g> <g id="Link"></g>{" "}
                    <g id="Like"></g> <g id="Bad"></g> <g id="Gallery"></g>{" "}
                    <g id="Add"></g> <g id="Close"></g> <g id="Forward"></g>{" "}
                    <g id="Back"></g> <g id="Buy"></g> <g id="Mac"></g>{" "}
                    <g id="Laptop"></g>{" "}
                  </g>
                </svg>{" "}
                <span className="ml-2">Profile</span>
              </Link>
            </li>
            <li>
              <div
                className="font-medium cursor-pointer text-sm text-slate-800 hover:text-slate-600 flex items-center py-1 px-3"
                to="/signin"
                onClick={logOut}
              >
                <svg
                  fill="#000000"
                  width="16px"
                  height="16x"
                  viewBox="0 0 24 24"
                  id="sign-out-left-2"
                  data-name="Line Color"
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon line-color"
                  transform="matrix(-1, 0, 0, 1, 0, 0)"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke="#CCCCCC"
                    stroke-width="0.72"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <polyline
                      id="secondary"
                      points="6 15 3 12 6 9"
                      style={{
                        fill: "none",
                        stroke: "#FFA000",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: "2.4",
                      }}
                    ></polyline>
                    <line
                      id="secondary-2"
                      data-name="secondary"
                      x1="3"
                      y1="12"
                      x2="17"
                      y2="12"
                      style={{
                        fill: "none",
                        stroke: "#FFA000",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: "2.4",
                      }}
                    ></line>
                    <path
                      id="primary"
                      d="M10,8V5a1,1,0,0,1,1-1h9a1,1,0,0,1,1,1V19a1,1,0,0,1-1,1H11a1,1,0,0,1-1-1V16"
                      style={{
                        fill: "none",
                        stroke: "#E65100",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: "2.4",
                      }}
                    ></path>
                  </g>
                </svg>{" "}
                <span className="ml-2">Sign Out</span>
              </div>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  );
}

export default DropdownProfile;
