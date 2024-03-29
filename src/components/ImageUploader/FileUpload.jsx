import axios from "axios";
import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faArrowUpFromBracket,
//   faTrash,
// } from "@fortawesome/free-solid-svg-icons";
import "./FileUpload.css";
const FileUpload = ({ files, text, getUserData, userId, setImageLoading }) => {
  const uploadHandler = (event) => {
    const file = event.target.files[0];
    setImageLoading(true)
    const formData = new FormData();
    formData.append("file", file, file?.name);
    axios
      .post(
        "https://api.bevinzey.com/files/upload",
        formData
      )
      .then((res1) => {
        axios
          .post(
            "https://api.bevinzey.com/users/picture/update/" +
              userId,
            {
              urlPhoto: res1.data,
            }
          )
          .then((res2) => {
            getUserData();
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="file-card relative h-full flex cursor-pointer">
        <div className="file-inputs">
          <input
            accept={"image/*"}
            onClick={(event) => {
              event.target.value = null;
            }}
            type="file"
            onChange={uploadHandler}
          />
          <button className="cursor-pointer">{text}</button>
        </div>
      </div>
    </>
  );
};

export default FileUpload;
