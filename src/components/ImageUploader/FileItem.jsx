import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faFileAlt,
//   faSpinner,
// } from "@fortawesome/free-solid-svg-icons";
// import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
const FileItem = ({
  file,
  removeFile,
  fileData,
  index,
  type,
  removeDatabaseFile,
  databaseFile,
}) => {
  return (
    <>
      {(file?.length !== 0 || fileData) && (
        <li
          className="file-item w-[200px] mt-[20px] mr-[90px] text-[14px] items-center flex"
        >


          {file && type === "pdf" && (
            <>
              <a>
                <img className="w-[40px] " src="./images/pdficon.png" />
              </a>
              <p className="w-[130px] font-thin text-[#2587be] ml-[10px]">
                {file.name}
              </p>
            </>
          )}



          <div className="actions cursor-pointer">
            <div className="loading"></div>
            {file?.isUploading && (
              // <FontAwesomeIcon
              //   icon={faTrashCan}
              //   onClick={() => removeFile(file?.name, index)}
              // />
            )}
          </div>
        </li>
      )}
    </>
  );
};

export default FileItem;
