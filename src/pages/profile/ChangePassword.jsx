import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

function ChangePassword() {
  const { user } = useSelector((state) => state.auth);
  const [values, setValues] = useState({
    oldPwd: "",
    newPwd: "",
  });

  const changeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const updatePassword = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://api.bevinzey.com/users/password/update/" +
          user?.id,
        {
          old_password: values.oldPwd,
          new_password: values.newPwd,
        }
      )
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Password changed successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
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
              title: "Password not correct",
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
        <h1 className="text-slate-800 text-2xl font-bold mb-2">
          Change Password
        </h1>
        <p className="text-xs text-slate-700">Change your account password</p>
      </div>
      <div>
        <form onSubmit={updatePassword}>
          <div className="flex flex-col mt-8">
            <label htmlFor="newPwd" className="text-[#2A2F44] text-sm">
              Old Password <span className="text-[#FF0F00] font-bold">*</span>
            </label>
            <input
              required
              name="oldPwd"
              value={values.oldPwd}
              onChange={changeHandler}
              type="password"
              id="oldPwd"
              className="border-[#D1D9E6E5] mt-1 rounded-md max-w-[500px] lg:w-[500px] text-[#2A2F44]"
            />
          </div>
          <div className="flex flex-col mt-8">
            <label htmlFor="oldPwd" className="text-[#2A2F44] text-sm">
              New Password <span className="text-[#FF0F00] font-bold">*</span>
            </label>
            <input
              required
              name="newPwd"
              value={values.newPwd}
              onChange={changeHandler}
              type="password"
              id="newPwd"
              className="border-[#D1D9E6E5] mt-1 rounded-md max-w-[500px] lg:w-[500px] text-[#2A2F44]"
            />
            <p className="text-xs mt-1 text-slate-700">Minimum 6 characters</p>
          </div>
          <div className="max-w-[500px] lg:w-[500px]">
            <input
              type="submit"
              value="SAVES CHANGES"
              className="w-full bg-slate-800 py-2 text-white rounded-md text-sm my-8 cursor-pointer"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
