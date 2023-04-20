import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

function EditProfile({ userData, getUserData }) {
  const { user } = useSelector((state) => state.auth);
  const [values, setValues] = useState({
    firstName: userData?.first_name,
    lastName: userData?.last_name,
    phone: userData?.phone_number,
  });

  const changeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const saveChanges = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://plankton-app-q74hx.ondigitalocean.app/users/profile/update/" +
          user?.id,
        {
          first_name: values.firstName,
          last_name: values.lastName,
          phone_number: values.phone,
        }
      )
      .then((res) => {
        getUserData();
        Swal.fire({
          icon: "success",
          title: "Profile infotmation updated successfully",
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
  };

  return (
    <div className="space-y-5 my-8 xl:mb-0">
      <div>
        <h1 className="text-slate-800 text-2xl font-bold mb-2">Edit Profile</h1>
      </div>
      <div>
        <form onSubmit={saveChanges}>
          <div className="flex flex-col mt-8">
            <label htmlFor="firstName" className="text-[#2A2F44] text-sm">
              First Name <span className="text-[#FF0F00] font-bold">*</span>
            </label>
            <input
              required
              name="firstName"
              value={values.firstName}
              onChange={changeHandler}
              type="text"
              id="firstName"
              className="border-[#D1D9E6E5] mt-1 rounded-md max-w-[500px] lg:w-[500px] text-[#2A2F44]"
            />
          </div>
          <div className="flex flex-col mt-8">
            <label htmlFor="lastName" className="text-[#2A2F44] text-sm">
              Last Name <span className="text-[#FF0F00] font-bold">*</span>
            </label>
            <input
              required
              name="lastName"
              value={values.lastName}
              onChange={changeHandler}
              type="text"
              id="lastName"
              className="border-[#D1D9E6E5] mt-1 rounded-md max-w-[500px] lg:w-[500px] text-[#2A2F44]"
            />
          </div>
          <div className="flex flex-col mt-8">
            <label htmlFor="phone" className="text-[#2A2F44] text-sm">
              Phone
            </label>
            <input
              name="phone"
              value={values.phone}
              onChange={changeHandler}
              pattern="^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"
              type="tel"
              id="phone"
              className="border-[#D1D9E6E5] mt-1 rounded-md max-w-[500px] lg:w-[500px] text-[#2A2F44]"
            />
          </div>
          <div className="max-w-[500px] lg:w-[500px]">
            <button
              type="submit"
              className="px-4 w-full bg-slate-800 py-2 text-white rounded-md text-sm my-8"
            >
              SAVE CHANGES
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
