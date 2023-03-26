import React, { useEffect, useState } from "react";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/DashboardHeader";
import SearchForm from "../partials/SearchForm";

import Service from "../components/Service";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/auth";
import { clearMessage, setMessage } from "../redux/message";

function Services() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const services = [
    {
      id: 0,
      title: "Summarize Text To Key Points",
      link: "text-summarize",

      desc: "Summarize any text with a click of a button. Bevinzey's summarizer can condense articles, slides or chapters down to the key points instantly.",

      color: "bg-[#B6ECCC]",
      comingSoon: false,
      icon: (
        <svg
          width="22"
          height="28"
          viewBox="0 0 22 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.33398 13.3337C4.7817 13.3337 4.33398 13.7814 4.33398 14.3337C4.33398 14.8859 4.7817 15.3337 5.33398 15.3337C5.88626 15.3337 6.33398 14.8859 6.33398 14.3337C6.33398 13.7814 5.88626 13.3337 5.33398 13.3337ZM4.33398 18.3337C4.33398 17.7814 4.7817 17.3337 5.33398 17.3337C5.88626 17.3337 6.33398 17.7814 6.33398 18.3337C6.33398 18.8859 5.88626 19.3337 5.33398 19.3337C4.7817 19.3337 4.33398 18.8859 4.33398 18.3337ZM8.33398 14.3337C8.33398 13.7814 8.78172 13.3337 9.33398 13.3337H13.4057C13.958 13.3337 14.4057 13.7814 14.4057 14.3337C14.4057 14.8859 13.958 15.3337 13.4057 15.3337H9.33398C8.78172 15.3337 8.33398 14.8859 8.33398 14.3337ZM9.33398 17.3337C8.78172 17.3337 8.33398 17.7814 8.33398 18.3337C8.33398 18.8859 8.78172 19.3337 9.33398 19.3337H13.4057C13.958 19.3337 14.4057 18.8859 14.4057 18.3337C14.4057 17.7814 13.958 17.3337 13.4057 17.3337H9.33398ZM3.33398 0.666992C1.67713 0.666992 0.333984 2.01014 0.333984 3.66699V21.0003C0.333984 22.6571 1.67713 24.0003 3.33398 24.0003H15.334C16.9908 24.0003 18.334 22.6571 18.334 21.0003V9.82546C18.334 9.02981 18.0179 8.26674 17.4553 7.70414L11.2968 1.54567C10.7343 0.983059 9.97118 0.666992 9.17558 0.666992H3.33398ZM2.33398 3.66699C2.33398 3.11471 2.7817 2.66699 3.33398 2.66699H9.00585V6.99703C9.00585 8.65389 10.3491 9.99703 12.0059 9.99703H16.334V21.0003C16.334 21.5526 15.8863 22.0003 15.334 22.0003H3.33398C2.7817 22.0003 2.33398 21.5526 2.33398 21.0003V3.66699ZM11.0059 6.99703V4.08311L14.9197 7.99703H12.0059C11.4536 7.99703 11.0059 7.54931 11.0059 6.99703ZM6.66849 27.3337C5.36226 27.3337 4.25102 26.4989 3.8392 25.3337H15.3352C17.7284 25.3337 19.6685 23.3935 19.6685 21.0003V9.91618L20.7899 11.0375C21.3524 11.6001 21.6685 12.3631 21.6685 13.1589V21.0003C21.6685 24.4982 18.8329 27.3337 15.3352 27.3337H6.66849Z"
            fill="white"
          />
        </svg>
      ),
    },
    {
      id: 1,
      title: "Text to Questions",
      link: "text-to-questions",
      desc: "Take any text, including essays, stories, passages, or even a students' response to an extended constructed response question and automatically generate questions and answers.",
      color: "bg-[#C1AAF2]",
      comingSoon: false,
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.5998 4.79981C5.5998 4.35798 5.95798 3.9998 6.39981 3.9998H17.5998C18.0416 3.9998 18.3998 4.35798 18.3998 4.79981C18.3998 5.24163 18.0416 5.5998 17.5998 5.5998H6.39981C5.95798 5.5998 5.5998 5.24163 5.5998 4.79981ZM6.39981 7.19981C5.95798 7.19981 5.5998 7.55798 5.5998 7.99981C5.5998 8.44163 5.95798 8.79981 6.39981 8.79981H17.5998C18.0416 8.79981 18.3998 8.44163 18.3998 7.99981C18.3998 7.55798 18.0416 7.19981 17.5998 7.19981H6.39981ZM5.5998 0.799805C2.94884 0.799805 0.799805 2.94884 0.799805 5.5998V18.3998C0.799805 21.0508 2.94884 23.1998 5.5998 23.1998H18.3998C21.0508 23.1998 23.1998 21.0508 23.1998 18.3998V5.5998C23.1998 2.94884 21.0508 0.799805 18.3998 0.799805H5.5998ZM21.5998 11.9998H15.9998C15.558 11.9998 15.1998 12.3566 15.1998 12.7984L15.1993 12.818C15.1987 12.8379 15.1971 12.8707 15.194 12.9147C15.1878 13.0028 15.1747 13.1339 15.1481 13.2932C15.0944 13.616 14.9884 14.0339 14.7843 14.442C14.5817 14.8472 14.2905 15.228 13.8686 15.5091C13.4516 15.7872 12.8598 15.9998 11.9998 15.9998C11.1398 15.9998 10.548 15.7872 10.1311 15.5091C9.70915 15.228 9.4179 14.8472 9.21534 14.442C9.01123 14.0339 8.90518 13.616 8.85142 13.2932C8.82485 13.1339 8.81188 13.0028 8.80558 12.9147C8.80244 12.8707 8.80101 12.8379 8.80033 12.818L8.79981 12.7988C8.79926 12.3574 8.44131 11.9998 7.99981 11.9998H2.3998V5.5998C2.3998 3.83249 3.83249 2.3998 5.5998 2.3998H18.3998C20.1672 2.3998 21.5998 3.83249 21.5998 5.5998V11.9998ZM2.3998 13.5998H7.28061C7.35424 14.0227 7.49829 14.5856 7.78427 15.1576C8.08171 15.7524 8.54046 16.3716 9.24355 16.8404C9.95165 17.3124 10.8598 17.5998 11.9998 17.5998C13.1398 17.5998 14.048 17.3124 14.7561 16.8404C15.4592 16.3716 15.9179 15.7524 16.2153 15.1576C16.5012 14.5856 16.6454 14.0227 16.719 13.5998H21.5998V18.3998C21.5998 20.1672 20.1672 21.5998 18.3998 21.5998H5.5998C3.83249 21.5998 2.3998 20.1672 2.3998 18.3998V13.5998Z"
            fill="white"
          />
        </svg>
      ),
    },
  ];

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const getUserData = async () => {
    await axios
      .get(
        "https://plankton-app-q74hx.ondigitalocean.app/users/find/" + user?.id
      )
      .then((res) => {
        dispatch(setUserData(res.data));
        console.log(JSON.stringify(res.data));
      })
      .catch((error) => {
        dispatch(
          setMessage(
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
              error.message ||
              error.toString()
          )
        );

        setTimeout(() => {
          dispatch(clearMessage());
        }, 3000);
      });
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full h-screen max-w-9xl mx-auto bg-gray-400 ">
            <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
              <h1 className="h3 mb-4">Explore Our Suite of Cutting-Edge AI Tools: Revolutionize Your Work Today!</h1>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">
              {services.map((tool) => {
                return <Service key={tool.id} tool={tool} />;
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Services;
