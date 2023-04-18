import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MdOutlineContentCopy } from "react-icons/md";

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

  const handleClick = (event) => {
    switch (event.detail) {
      case 1: {
        break;
      }
      case 2: {
        copyScript();
        break;
      }
      default: {
        break;
      }
    }
  };

  const [copied, setCopied] = useState(false);
  const copyScript = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <div className="flex justify-end select-none">
      <div className="flex items-start mb-4 last:mb-0">
        <div className="relative flex items-center">
          {copied && (
            <span className="text-[11px] absolute -left-[25px] text-white bg-[#8886fe] rounded p-1 mb-1">
              <MdOutlineContentCopy size={12} />
            </span>
          )}
          <div onClick={handleClick}>
            <pre className="text-sm font-inter whitespace-pre-wrap cursor-pointer bg-indigo-500 text-white p-3 rounded-lg rounded-tr-none border border-transparent shadow-md mb-1">
              {text}
            </pre>
          </div>
        </div>
        <img
          className="max-w-[45px] min-w-[45px] max-h-[45px] min-h-[45px] rounded-full ml-4 border-[#8290f1] border-[2px] object-cover"
          src={userData?.urlPhoto ?? ""}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = "/images/profile.png";
          }}
          alt="User 02"
        />
      </div>
    </div>
  );
}

export default MyMessage;
