import React, { useEffect, useState } from "react";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/DashboardHeader";
import SearchForm from "../partials/SearchForm";

import Service from "../components/Service";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/auth";
import { clearMessage, setMessage } from "../redux/message";
import { useNavigate } from "react-router-dom";
import Chat from "../images/icons/chat.png";
import MentorChat from "../images/icons/mentor-chat.png";
import Expander from "../images/icons/expander.png";
import Manuscript from "../images/icons/manuscript.png";
import Questions from "../images/icons/questions.png";
import Summarizer from "../images/icons/summarize.png";
import Transcription from "../images/icons/transcription.png";

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
      icon: <img src={Summarizer} />,
    },

    {
      id: 1,
      title: "Text to Questions",
      link: "text-to-questions",
      desc: "Take any text, including essays, stories, passages, or even a students' response to an extended constructed response question and automatically generate questions and answers.",
      color: "bg-[#C1AAF2]",
      comingSoon: false,
      icon: <img src={Questions} />,
    },

    {
      id: 2,
      title: "Chat Bevinzey",
      link: "chat-bevinzey",

      desc: "Engage in interactive conversations to ask questions, clarify doubts, and deepen your understanding. Tailored for students and educators, Chat Bevinzey offers instant, personalized assistance, transforming the way you learn and teach.",

      color: "bg-[#B6ECCC]",
      comingSoon: false,
      icon: <img src={Chat} />,
    },
    {
      id: 3,
      title: "Audio Transcription",
      link: "audio-transcription",
      desc: "Supercharge your learning with our intelligent transcription solution. Seamlessly turn video and audio files into clear, organized text, making your studies more efficient and effective. Boost comprehension, save precious time, and stay ahead of the curve.",
      color: "bg-[#C1AAF2]",
      comingSoon: false,
      premium: true,
      icon: <img src={Transcription} />,
    },
    {
      id: 4,
      title: "Mentor Chat Bevinzey",
      link: "mentor-chat-bevinzey",
      desc: "Engage your personal AI-powered tutor, always ready to guide you on your learning journey. Experience on-demand expertise tailored to your needs, making education more accessible and engaging. Dive into an interactive learning experience, ask questions, and receive real-time feedback to accelerate your progress.",
      color: "bg-[#B6ECCC]",
      comingSoon: false,
      premium: true,
      icon: <img src={MentorChat} />,
    },
    {
      id: 5,
      title: "Topic Expander",
      link: "topic-expander",
      desc: "Delve into any subject and receive a brilliantly crafted, comprehensive, yet succinct response fueled by cutting-edge AI. Master complex concepts with ease as the topic expander optimizes content for enhanced retention and comprehension.",
      color: "bg-[#C1AAF2]",
      comingSoon: false,
      premium: true,
      icon: <img src={Expander} />,
    },
    {
      id: 6,
      title: "Authormatic",
      link: "authormatic",
      desc: "Unleash the scholar in you with Authormatic on Bevinzey! Simply upload relevant research papers, outline your manuscript, hit generate, and watch as your manuscript comes to life at the click of a button! Welcome to a new era of effortless learning. Dive in with Authormatic now!",
      color: "bg-[#C1AAF2]",
      comingSoon: false,
      premium: true,
      icon: <img src={Manuscript} />,
    },
  ];

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const getUserData = async () => {
    await axios
      .get(
        "https://api.bevinzey.com/users/find/" + user?.id
      )
      .then((res) => {
        setUserData(res.data);
        dispatch(setUserData(res.data));
        if (res.data.subscription.Status !== "Active") {
          navigate("/");
        }
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
              <h1 className="h3 mb-4">
                Explore Our Suite of Cutting-Edge AI Tools: Revolutionize Your
                Work Today!
              </h1>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">
              {services.map((tool) => {
                if (tool.premium) {
                  if (userData?.subscription.plan === "Premium") {
                    return <Service key={tool.id} tool={tool} />;
                  }
                } else {
                  return <Service key={tool.id} tool={tool} />;
                }
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Services;
