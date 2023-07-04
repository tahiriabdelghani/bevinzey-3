import React, { useEffect, useState } from 'react';

import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';
import Footer from '../partials/Footer1';
import { useDispatch, useSelector } from 'react-redux';
import { clearMessage, setMessage } from '../redux/message';
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

const initialState = {
  subject: "",
  full_name: "",
  email: "",
  phone: "",
  message: ""
};

function Contact() {

  const [values, setValues] = useState(initialState);
  const [successful, setSuccessful] = useState(false);
  const { message } = useSelector((state) => state.message);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [visible, setIsVisible] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    dispatch(clearMessage());
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const { email, phone, subject, full_name, message } = values;
    setIsVisible(true);
    await axios
      .post(
        "https://api.bevinzey.com/contact-us/send",
        {
          subject: subject,
          full_name: full_name,
          message: message,
          email: email,
          phone: phone,
        }
      )
      .then((res) => {
        dispatch(setMessage("Message Sent"))
        setSuccessful(true)
        setTimeout(() => {
          navigate("/")
        }, 4000);
      })
      .catch((error) => {
        setSuccessful(false)
        dispatch(
          setMessage(
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
          )
        );
      });
    setIsVisible(false);
  };


  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-slate-800">

      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="grow">

        {/*  Page illustration */}
        <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
          <PageIllustration />
        </div>

        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">

              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
                <h1 className="h1 mb-4" data-aos="fade-up">How can we help you?</h1>
                <p className="text-xl text-gray-400" data-aos="fade-up" data-aos-delay="200">Tell us your needs, and we’ll contact you shortly.</p>
              </div>

              {/* Contact form */}
              <form onSubmit={onSubmit} className="max-w-xl mx-auto">
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                    <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="first-name">Full Name <span className="text-red-600">*</span></label>
                    <input
                      id="first-name"
                      name="full_name"
                      value={values.full_name}
                      onChange={handleChange}
                      type="text"
                      className="form-input w-full text-gray-300  focus:border-orange-500"
                      placeholder="Enter your full name"
                      required />
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="last-name">Phone Number <span className="text-red-600">*</span></label>
                    <input
                      name="phone"
                      value={values.phone}
                      onChange={handleChange}
                      type="number"
                      className="form-input w-full text-gray-300 focus:border-orange-500"
                      placeholder="Enter your phone number"
                      required />

                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="email">Email <span className="text-red-600">*</span></label>
                    <input id="email"
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      className="form-input w-full text-gray-300 focus:border-orange-500"
                      placeholder="Enter your email address"
                      required />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="subject">Subject <span className="text-red-600">*</span></label>
                    <input id="subject"
                      name="subject"
                      value={values.subject}
                      onChange={handleChange}
                      type="text"
                      className="form-input w-full text-gray-300 focus:border-orange-500"
                      placeholder="How can we help you?"
                      required />
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="message">Message</label>
                    <textarea id="message" rows="4"
                      className="form-textarea w-full text-gray-300 focus:border-orange-500"
                      name="message"
                      value={values.message}
                      onChange={handleChange}
                      type="text"
                      placeholder="Write your message"></textarea>
                  </div>
                </div>
                <p className="my-4 mx-3 text-md font-medium text-center text-gray-700">
                  {message && (
                    <div className={successful ? "text-green-600" : "text-red-600"} role="alert">
                      {message}
                    </div>
                  )}
                </p>
                {/* <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label className="flex items-center">
                      <input type="checkbox" className="form-checkbox" />
                      <span className="text-gray-400 ml-2">I agree to the privacy policy</span>
                    </label>
                  </div>
                </div> */}
                <div className="flex flex-wrap -mx-3 mt-6">
                  <div className="w-full px-3">
                    <button type='submit' className="btn text-white bg-orange-600 hover:bg-orange-700 w-full">Send</button>
                  </div>
                </div>
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
              </form>

            </div>
          </div>
        </section>

      </main>

      {/*  Site footer */}
      <Footer />

    </div>
  );
}

export default Contact;