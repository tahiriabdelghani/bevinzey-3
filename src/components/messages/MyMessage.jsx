import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function MyMessage({ text }) {
  const { user } = useSelector((state) => state.auth);

  const [userData, setUserdata] = useState(null);

  useEffect(() => {
    axios
      .get(
        "https://plankton-app-q74hx.ondigitalocean.app/users/find/" + user.id
      )
      .then((res) => {
        setUserdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex justify-end">
      <div className="flex items-start mb-4 last:mb-0">
        <div>
          <div className="text-sm bg-indigo-500 text-white p-3 rounded-lg rounded-tr-none border border-transparent shadow-md mb-1">
            {text}
          </div>
        </div>
        <img
          className="rounded-full ml-4 border-[#8290f1] border-[2px]"
          src={userData?.urlPhoto ?? ""}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = "/images/profile.png";
          }}
          width="40"
          height="40"
          alt="User 02"
        />
      </div>
    </div>
  );
}

export default MyMessage;
