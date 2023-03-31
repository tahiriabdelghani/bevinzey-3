import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Header from "../partials/Header";
import PageIllustration from "../partials/PageIllustration";
import { clearMessage, setMessage } from "../redux/message";
import axios from "axios";
import { setUserData, switchLoginStatus } from "../redux/auth";
import { ColorRing } from "react-loader-spinner";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
const initialState = {
  email: "",
  password: "",
};

const clientId = ""

function SignIn() {


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [visible, setIsVisible] = useState(false);

  const { message } = useSelector((state) => state.message);
  const { user } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = values;
    setIsVisible(true);
    await axios
      .post(
        "https://plankton-app-q74hx.ondigitalocean.app/auth/client/local/login",
        {
          email: email,
          password: password,
        }
      )
      .then((res) => {
        // if (!response.ok) {
        //   throw new Error('Sending user data failed.');
        // }
        axios
          .get(
            "https://plankton-app-q74hx.ondigitalocean.app/users/find/" +
            res?.data[1]
          )
          .then((res) => {
            dispatch(setUserData(res.data));
            dispatch(switchLoginStatus());
            navigate("/pricing");
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
          });
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
      });

    // await axios.get("https://plankton-app-q74hx.ondigitalocean.app/users/find/" + user[1]).then((response) => {
    //   dispatch(setUserData(response.data))
    //   setIsVisible(false)
    // }).catch((error) => {
    //   dispatch(setMessage((error.response &&
    //     error.response.data &&
    //     error.response.data.message) ||
    //     error.message ||
    //     error.toString()))
    //   setIsVisible(false)
    // })

    setIsVisible(false);
    setTimeout(() => {
      dispatch(clearMessage());
    }, 3000);
  };

  useEffect(() => {
    dispatch(clearMessage());
  }, []);

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-slate-800">
      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="grow">
        {/*  Page illustration */}
        <div
          className="relative max-w-6xl mx-auto h-0 pointer-events-none"
          aria-hidden="true"
        >
          <PageIllustration />
        </div>

        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">
                  Welcome back. Maximize your learning potential with us.
                </h1>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form>
                  <div className="flex flex-wrap -mx-3">
                    <div className="w-full px-3">
                      {/* <button
                        onClick={() => navigate("https://plankton-app-q74hx.ondigitalocean.app/auth/google")}
                        className="btn px-0 text-white bg-red-600 hover:bg-red-700 w-full relative flex items-center">
                        <svg
                          className="w-4 h-4 fill-current text-white opacity-75 shrink-0 mx-4"
                          viewBox="0 0 16 16"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z" />
                        </svg>
                        <span
                          className="h-6 flex items-center border-r border-white border-opacity-25 mr-4"
                          aria-hidden="true"
                        ></span>
                        <span className="flex-auto pl-16 pr-8 -ml-16">
                          Sign in with Google
                        </span>
                      </button> */}
                    </div>

                  </div>
                  <div>

                  </div>
                </form>
                <div className="flex items-center my-6">
                  <div
                    className="border-t border-gray-700 border-dotted grow mr-3"
                    aria-hidden="true"
                  ></div>
                  <div className="text-gray-400">
                    Sign in with your email
                  </div>
                  <div
                    className="border-t border-gray-700 border-dotted grow ml-3"
                    aria-hidden="true"
                  ></div>
                </div>
                <form onSubmit={onSubmit}>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-300 text-sm font-medium mb-1"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        className="form-input w-full text-slate-700"
                        placeholder="you@email.com"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-300 text-sm font-medium mb-1"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <div className="flex items-center relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          className="form-input w-full text-slate-700 pr-8"
                          placeholder="Password (at least 10 characters)"
                          required
                        />
                        {showPassword ? (
                          <AiFillEyeInvisible
                            className="absolute right-3 cursor-pointer text-orange-700" onClick={() => { setShowPassword(false) }}
                            size={20}
                          />
                        ) : (
                          <AiFillEye className="absolute right-3 cursor-pointer text-orange-700" onClick={() => { setShowPassword(true) }} size={20} />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <div className="flex justify-between">
                        {/* <label className="flex items-center">
                          <input type="checkbox" className="form-checkbox" />
                          <span className="text-gray-400 ml-2">
                            Keep me signed in
                          </span>
                        </label> */}
                        <Link
                          to="/reset-password"
                          className="text-orange-600 hover:text-gray-200 transition duration-150 ease-in-out"
                        >
                          Forgot Password?
                        </Link>
                      </div>
                    </div>
                  </div>
                  <p className="mt-8 mx-3 text-xs font-bold text-center text-gray-700">
                    {message && (
                      <div className="text-red-500" role="alert">
                        {message}
                      </div>
                    )}
                  </p>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button
                        type="submit"
                        className="btn text-white bg-orange-600 hover:bg-orange-700 w-full"
                      >
                        Sign in
                      </button>
                    </div>
                  </div>
                </form>
                <div className="text-gray-400 text-center mt-6">
                  Don’t you have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-orange-600 hover:text-gray-200 transition duration-150 ease-in-out"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
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
                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
              />
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default SignIn;
