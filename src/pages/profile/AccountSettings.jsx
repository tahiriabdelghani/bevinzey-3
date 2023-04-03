import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { logoutUser } from "../../redux/auth";

function AccountSettings({ userData, getUserData }) {
  const { user } = useSelector((state) => state.auth);
  const [values, setValues] = useState({
    username: userData?.username,
    email: userData?.email,
  });

  const changeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const updateUsername = (e) => {
    e.preventDefault();
    if (userData?.username === values?.username) {
      Swal.fire({
        icon: "success",
        title: "Username updated successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      axios
        .post(
          "https://plankton-app-q74hx.ondigitalocean.app/users/username/update/" +
            user?.id,
          {
            username: values.username,
          }
        )
        .then((res) => {
          console.log(res.data);
          getUserData();
          Swal.fire({
            icon: "success",
            title: "Username updated successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((err) => {
          console.log(err);
          err.message === "Network Error"
            ? Swal.fire({
                icon: "warning",
                title: "No internet connection. Please check your network",
                showConfirmButton: false,
                timer: 1500,
              })
            : Swal.fire({
                icon: "info",
                title: "Server error, please try later",
                showConfirmButton: false,
                timer: 1500,
              });
        });
    }
  };
  const updateEmail = (e) => {
    e.preventDefault();
    console.log(userData?.email === values.email);
    if (userData?.email === values?.email) {
      Swal.fire({
        icon: "success",
        title: "Email address updated successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      axios
        .post(
          "https://plankton-app-q74hx.ondigitalocean.app/users/email/update/" +
            user?.id,
          {
            new_email: values.email,
          }
        )
        .then((res) => {
          console.log(res.data);
          Swal.fire({
            icon: "success",
            title: "Email address updated successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((err) => {
          console.log(err.message);
          err.message === "Network Error"
            ? Swal.fire({
                icon: "warning",
                title: "No internet connection. Please check your network",
                showConfirmButton: false,
                timer: 1500,
              })
            : err.message === "Request failed with status code 403"
            ? Swal.fire({
                icon: "error",
                title: "Email address already taken",
                showConfirmButton: false,
                timer: 1500,
              })
            : Swal.fire({
                icon: "info",
                title: "Server error, please try later",
                showConfirmButton: false,
                timer: 1500,
              });
        });
    }
  };

  const closeAccount = () => {
    axios
      .get(
        "https://plankton-app-q74hx.ondigitalocean.app/users/delete/" + user?.id
      )
      .then((res) => {
        console.log(res.data);
        Swal.fire("Account closed!", "", "success");
        logOut();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  //Sign Out user
  const logOut = () => {
    dispatch(logoutUser());
    navigate("/signin");
  };

  return (
    <div className="space-y-5 my-8 xl:mb-0 max-w-[500px] lg:w-[500px]">
      <div>
        <h1 className="text-slate-800 text-2xl font-bold mb-2">
          Account Settings
        </h1>
      </div>
      <div className="w-full">
        <form onSubmit={updateUsername}>
          <div className="flex flex-col mt-8">
            <label htmlFor="username" className="text-[#2A2F44] text-sm">
              Username <span className="text-[#FF0F00] font-bold">*</span>
            </label>
            <input
              required
              name="username"
              value={values.username}
              onChange={changeHandler}
              type="text"
              id="username"
              className="border-[#D1D9E6E5] mt-1 rounded-md  text-[#2A2F44]"
            />
            <div className="flex justify-between">
              <div className="md:w-[200px]">
                <button
                  type="submit"
                  className="px-4 w-full bg-slate-800 py-2 text-white rounded-md text-sm my-8"
                >
                  SAVE CHANGES
                </button>
              </div>
              <div className="md:w-[200px]">
                <div
                  onClick={() => {
                    setValues({
                      ...values,
                      username: userData?.username,
                    });
                  }}
                  className="px-4 text-center cursor-pointer w-full bg-white text-slate-800 font-semibold border-2 border-slate-800 py-2 rounded-md text-sm my-8"
                >
                  CANCEL
                </div>
              </div>
            </div>
          </div>
        </form>
        <hr />
        <form onSubmit={updateEmail}>
          <div className="flex flex-col mt-12">
            <label htmlFor="username" className="text-[#2A2F44] text-sm">
              Change Email <span className="text-[#FF0F00] font-bold">*</span>
            </label>
            <input
              required
              name="email"
              value={values.email}
              onChange={changeHandler}
              type="text"
              id="username"
              className="border-[#D1D9E6E5] mt-1 rounded-md  text-[#2A2F44]"
            />
            <div className="flex justify-between">
              <div className="md:w-[200px]">
                <button
                  type="submit"
                  className="px-4 w-full bg-slate-800 py-2 text-white rounded-md text-sm my-8"
                >
                  SAVE CHANGES
                </button>
              </div>
              <div className="md:w-[200px]">
                <div
                  onClick={() => {
                    setValues({
                      ...values,
                      email: userData?.email,
                    });
                  }}
                  className="px-4 text-center cursor-pointer w-full bg-white text-slate-800 font-semibold border-2 border-slate-800 py-2 rounded-md text-sm my-8"
                >
                  CANCEL
                </div>
              </div>
            </div>
          </div>
        </form>
        <hr />
        <div className="flex justify-between mt-12 mb-8">
          <div>
            <div className="text-slate-800 font-bold">Close Account</div>
            <div className="text-xs text-gray-500">
              Delete Your Account and Account data.
            </div>
          </div>
          <button
            onClick={() => {
              Swal.fire({
                title: "Are you sure you want to close your account?",
                text: "It's sad to see you go :(",
                showDenyButton: true,
                showCancelButton: true,
                showConfirmButton: false,
                denyButtonText: `Close`,
              }).then((result) => {
                if (result.isDenied) {
                  if (userData.subscription.Status === "Active") {
                    Swal.fire(
                      "Please cancel your subscription first.",
                      "",
                      "warning"
                    );
                  } else {
                    closeAccount();
                  }
                }
              });
            }}
            className="bg-[red] text-white px-6 rounded text-sm uppercase"
          >
            Close Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default AccountSettings;
