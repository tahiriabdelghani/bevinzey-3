import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import { store } from "./redux/store";
import "aos/dist/aos.css";
import "./css/style.css";
import AOS from "aos";
import Home from "./pages/Home";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Help from "./pages/Help";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ResetPassword from "./pages/ResetPassword";
import PageNotFound from "./pages/PageNotFound";
import Services from "./pages/Services";
import TextSummarize from "./pages/services/TextSummarize";
import TestToQuestions from "./pages/services/TextToQuestions";
import Profile from "./pages/Profile";

import { Provider, useSelector } from "react-redux";
import Payment from "./pages/Payment";
import Completion from "./pages/Completion";
import ChangePassword from "./pages/ChangePassword";
import Otp from "./pages/Otp";
import Success from "./pages/Success";
import EmailVerification from "./pages/EmailVerification";
import EmailOtp from "./pages/EmailOtp ";
import axios from "axios";
import ChatBevinzey from "./pages/services/ChatBevinzey";
import AudioTranscription from "./pages/services/AudioTranscription";
import MentorChatBevinzey from "./pages/services/MentorChatBevinzey";
import CouponFormPage from "./pages/CouponFormPage";
import TopicExpander from "./pages/services/TopicExpander";
import Manuscript from "./pages/services/Manuscript";
import FileChatBevinzey from "./pages/services/FileChatBevinzey";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";

function App() {
  const location = useLocation();

  const { user, isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 600,
      easing: "ease-out-sine",
    });
  });

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, []);

  const [subscriped, setSubscriped] = useState(false);
  axios
    .get("https://api.bevinzey.com/users/find/" + user?.id)
    .then((res) => {
      if (res.data.subscription.Status === "Active") {
        setSubscriped(true);
      }
    })
    .catch((err) => {
      console.log(err);
    });

  return (
    <Provider store={store}>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog-details/:id/:name" element={<BlogPost />} />
        <Route path="/about" element={<About />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/help" element={<Help />} />
        <Route
          path="/signin"
          element={!isLoggedIn ? <SignIn /> : <Navigate replace to="/" />}
        />
        <Route
          path="/signup"
          element={!isLoggedIn ? <SignUp /> : <Navigate replace to="/" />}
        />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/email-otp" element={<EmailOtp />} />
        <Route
          path="/services"
          element={subscriped ? <Services /> : <Navigate replace to="/" />}
        />
        <Route
          path="/services/text-summarize"
          element={subscriped ? <TextSummarize /> : <Navigate replace to="/" />}
        />
        <Route
          path="/services/authormatic"
          element={subscriped ? <Manuscript /> : <Navigate replace to="/" />}
        />
        <Route
          path="/services/text-to-questions"
          element={
            subscriped ? <TestToQuestions /> : <Navigate replace to="/" />
          }
        />
        <Route
          path="/services/chat-bevinzey"
          element={subscriped ? <ChatBevinzey /> : <Navigate replace to="/" />}
        />
        <Route
          path="/services/mentor-chat-bevinzey"
          element={subscriped ? <MentorChatBevinzey /> : <Navigate replace to="/" />}
        />
        <Route
          path="/services/text-interactor"
          element={subscriped ? <FileChatBevinzey /> : <Navigate replace to="/" />}
        />
        <Route
          path="/services/audio-transcription"
          element={subscriped ? <AudioTranscription /> : <Navigate replace to="/" />}
        />
        <Route
          path="/services/topic-expander"
          element={subscriped ? <TopicExpander /> : <Navigate replace to="/" />}
        />
        <Route path="/profile" element={!isLoggedIn ? <Home /> : <Profile />} />
        <Route path="/payment" element={<Payment />} />
        
      <Route path="/coupon" element={<CouponFormPage />} />
        <Route path="/completion" element={<Completion />} />
        <Route path="/success" element={<Success />} />
        <Route path="/email-verification" element={<EmailVerification />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Provider>
  );
}

export default App;
