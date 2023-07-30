import React, { useEffect, useRef, useState } from "react";

import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/DashboardHeader";
import PageIllustration from "../../partials/PageIllustration";
import ServiceHero from "../../partials/ServiceHero";
import axios from "axios";
import FileUpload from "../../components/FileUploader/FileUpload";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import SubscriptionAd from "../../components/SubscriptionAd";
import { useSelector } from "react-redux";
import InfinityLoading from "../../images/Infinity.svg";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import jsPDF from "jspdf";
import { Document, Packer, Paragraph, HeadingLevel, TextRun } from "docx";
import ReactQuill from "react-quill";
import AWS from "aws-sdk";
import "react-quill/dist/quill.snow.css";
import {
  AiFillCloseCircle,
  AiOutlineClose,
  AiOutlineLink,
} from "react-icons/ai";
import { BsFillFileEarmarkFill } from "react-icons/bs";
import { MdContentCopy } from "react-icons/md";
import ManuscriptCard from "../../components/ManuscriptCard";
import { BiRefresh } from "react-icons/bi";
function Manuscript() {
  const { user } = useSelector((state) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const fileInputRef = useRef(null);
  const quillRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const totalFiles = links.length + files.length + event.target.files.length;
    console.log(totalFiles)
    if (totalFiles > 10) {
      Swal.fire({
        icon: "info",
        title: "Please add at least one file or link",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      const selectedFiles = event.target.files
      let renamedFiles = []
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const timestamp = Date.now();
        const reader = new FileReader();
      
        reader.onload = () => {
          const fileContent = reader.result;
          const renamedFile = new File([fileContent], `doc_${timestamp}.pdf`, {
            type: file.type
          });
          renamedFiles.push(renamedFile);
          // Optionally, you can log the renamed file here
          console.log(renamedFile);
      
          if (renamedFiles.length === selectedFiles.length) {
            setFiles([...files, ...renamedFiles]);
          }
        };
      
        reader.readAsArrayBuffer(file);
      }
    }
  };

  const [values, setValues] = useState({
    title: "",
    sections: "",
    mode: "Regular",
    type: "Normal",
  });
  const changeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [link, setLink] = useState("");
  const [links, setLinks] = useState([]);
  const [fileLinks, setFileLinks] = useState([
    "https://drive.google.com/file/d/15Vuabh1TznGSTLQhExVhoZfOofrX-9Tz",
    "https://drive.google.com/file/d/14Q3N0fZgzQZc-xKyKkrErpHk4eoaISyj",
  ]);
  const [files, setFiles] = useState([]);
  const [copied, setCopied] = useState(false);
  const [result, setResult] = useState("");

  const addLink = (e) => {
    e.preventDefault();
    if (link !== "") {
      const totalFiles = links.length + files.length;
      if (totalFiles < 10) {
        setLinks([...links, link]);
        setLink("");
      } else {
        Swal.fire({
          icon: "info",
          title: "The maximum number of links and files is 10",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  const removeLink = (index) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const copyResult = () => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      const plainText = editor.getText();
      navigator.clipboard.writeText(plainText);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    }
  };

  const uploadFile = async (file) => {
    const S3_BUCKET = "bevinzey-storage";
    const REGION = "eu-west-3";

    AWS.config.update({
      accessKeyId: "AKIAWBNV3LKW23ESOLON",
      secretAccessKey: "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",
    });
    const s3 = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });

    // const filename = file.name.split(".")[0];
    // const timestamp = Date.now();
    // const extension = file.name.split(".").slice(-1)[0];

    // const newName = filename + "-" + timestamp + "." + extension;

    const params = {
      Bucket: S3_BUCKET,
      Key: file.name,
      Body: file,
    };

    try {
      await s3.putObject(params).promise();
      const fileLink = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${file.name}`;
      console.log("File uploaded successfully.");
      return {
        success: true,
        link: fileLink,
      };
      return fileLink;
    } catch (error) {
      console.error("Error uploading file:", error);
      return {
        success: false,
      };
    }
  };

  const [history, setHistory] = useState([]);
  const fetchHistory = () => {
    setRefreshing(true);
    axios
      .get(
        "https://api.bevinzey.com/ai-services/manuscript/findAll/" +
          user.id
      )
      .then((res) => {
        setRefreshing(false);
        setHistory(res.data.slice().reverse());
        console.log(res.data);
      })
      .catch((err) => {
        setRefreshing(false);
        console.log(err);
      });
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const generate = async () => {
    if (links.length === 0 && files.length === 0) {
      Swal.fire({
        icon: "info",
        title: "Please add at least one file or link",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      setLoading(true);
      let uploadedFiles = [];
      console.log(files);
      if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          const response = await uploadFile(files[i]);
          if (response.success) {
            uploadedFiles = [...uploadedFiles, response.link];
          }
        }
      }
      axios
        .post(
          "https://api.bevinzey.com/ai-services/manuscript/create",
          {
            pdf_files: [...uploadedFiles, ...links],
            title: values.title,
            sections: values.sections,
            userId: user.id,
            mode: values.mode,
            type: values.type,
          }
        )
        .then((res) => {
          setLoading(false);
          resetForm();
          console.log(res);
          Swal.fire({
            icon: "success",
            title: "Operation completed succesfully",
            showConfirmButton: false,
            timer: 1500,
          });
          fetchHistory();
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  };

  const resetForm = () => {
    setValues({
      title: "",
      sections: "",
    });
    setLinks([]);
    setFiles([]);
  };

  const [exportAs, setExportAs] = useState("txt");

  function exportTxt() {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      const plainText = editor.getText();
      const element = document.createElement("a");
      const file = new Blob([plainText], { type: "text/plain" });
      element.href = URL.createObjectURL(file);
      element.download = "Manuscript.txt";
      document.body.appendChild(element);
      element.click();
    }
  }

  const exportFile = () => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      const plainText = editor.getText();
      if (exportAs !== "txt") {
        // make a post request to store the text
        const response = await fetch('https://api.bevinzey.com/ai-services/store-text', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ text: plainText })
        });

        const data = await response.json(); // assuming the response is json
        const id = data.id; // get the id from the response

        // construct the href for download
        const href = `https://api.bevinzey.com/ai-services/download-${exportAs}3/${id}`;
        const link = document.createElement("a");
        link.href = href;
        link.setAttribute("download", `products.${exportAs}`); //or any other extension
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      } else {
        exportTxt();
      }
    }
  };

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/*  Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main className="relative bg-gray-400">
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto ">
              <div className="flex flex-col overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-1/3 flex flex-col items-center">
                    <div className="w-[80%]">
                      <label>Select your files:</label>
                      <button
                        className="mt-1 w-full border-2 border-orange-400 text-orange-500 hover:text-orange-600 bg-white py-2 px-4 rounded"
                        onClick={handleButtonClick}
                      >
                        Choose Files
                      </button>
                      <input
                        type="file"
                        accept="application/pdf"
                        multiple
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleFileChange}
                      />
                      <div className="mt-3">
                        {files.map((file, index) => (
                          <div className="relative mb-1.5 flex items-center pr-10 h-[40px] bg-gray-300 text-gray-600 rounded">
                            <BsFillFileEarmarkFill className="mr-2 h-full text-white rounded-l px-2.5 bg-orange-500 min-w-[40px]" />
                            <span className="truncate overflow-ellipsis">
                              {file.name}
                            </span>
                            <span
                              onClick={() => {
                                removeFile(index);
                              }}
                              className="absolute right-3 text-red-500 cursor-pointer"
                            >
                              <AiFillCloseCircle />
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="w-[80%] mt-4">
                      <label className="">Links:</label>
                      <form
                        onSubmit={addLink}
                        className="mt-2 flex items-center"
                      >
                        <input
                          type="text"
                          value={link}
                          onChange={(e) => {
                            setLink(e.target.value);
                          }}
                          placeholder="Add a link"
                          className="border-2 text-black border-orange-400 focus:border-orange-500 rounded p-2 w-full h-[35px]"
                        />
                        <div
                          type="submit"
                          onClick={addLink}
                          className="text-2xl rounded bg-orange-500 px-3 py-0 h-[35px] ml-3 cursor-pointer"
                        >
                          +
                        </div>
                      </form>
                    </div>
                    <div className="mt-4 w-[80%]">
                      {links.map((link, index) => (
                        <div className="flex items-center mb-1.5">
                          <div className="relative w-full bg-white pl-3 pr-10 py-1 flex items-center rounded-full text-blue-600 italic">
                            <AiOutlineLink className="mr-1 min-w-[16px]" />{" "}
                            <span className="truncate overflow-ellipsis">
                              {link}
                            </span>
                            <span
                              onClick={() => {
                                removeLink(index);
                              }}
                              className="absolute right-3 text-red-500 cursor-pointer"
                            >
                              <AiFillCloseCircle />
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="w-[80%] mt-4">
                      <label className="">Title:</label>
                      <input
                        type="text"
                        value={values.title}
                        name="title"
                        onChange={changeHandler}
                        placeholder="Please enter a title"
                        className="mt-1 text-black border-2 border-orange-400 focus:border-orange-500 rounded p-2 w-full h-[40px]"
                      />
                    </div>
                    <div className="w-[80%] mt-4">
                      <label className="">Sections:</label>
                      <textarea
                        placeholder="Sections"
                        value={values.sections}
                        name="sections"
                        onChange={changeHandler}
                        className="mt-1 text-black border-2 border-orange-400 focus:border-orange-500 rounded p-2 w-full h-[150px]  resize-none"
                      />
                    </div>
                    <div className="w-[80%] mt-4">
                      <label className="">Mode:</label>
                      <select
                        value={values.mode}
                        name="mode"
                        onChange={changeHandler}
                        className="text-black mt-1 border-2 border-orange-400 focus:border-orange-500 rounded p-2 w-full h-[40px]"
                      >
                        <option className="text-blacddk">Regular</option>
                        <option className="text-blacdk">Advanced</option>
                      </select>
                    </div>
                    <div className="w-[80%] mt-4">
                      <label className="">Type:</label>
                      <select
                        value={values.type}
                        name="type"
                        onChange={changeHandler}
                        className="text-black mt-1 border-2 border-orange-400 focus:border-orange-500 rounded p-2 w-full h-[40px]"
                      >
                        <option className="text-blacddk">Normal</option>
                        <option className="text-blacdk">Detailed</option>
                      </select>
                    </div>

                    <button
                      onClick={generate}
                      className="w-[80%] mt-4 mb-8 btn-sm
                        bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600
                        text-white px-5 py-2.5 border-2  rounded-lg hover:bg-orange-700"
                    >
                      Generate
                    </button>
                  </div>
                  <div className="relative w-full md:w-2/3  rounded h-[520px]  text-black bg-white">
                    <ReactQuill
                      ref={quillRef}
                      className="h-[480px] p-2"
                      value={result}
                      onChange={(value) => {
                        setResult(value);
                        console.log(value);
                      }}
                    />
                    <div className="absolute top-5 right-5 flex flex-col items-end">
                      <MdContentCopy
                        onClick={copyResult}
                        size={17}
                        className="cursor-pointer"
                      />
                      {copied && (
                        <span className="text-xs px-2 py-1 bg-slate-800 opacity-70 mt-1 text-white rounded-full">
                          Copied!
                        </span>
                      )}
                    </div>
                    <div className="flex justify-end mt-14 items-center">
                      <button
                        onClick={() => {
                          exportFile();
                        }}
                        className={
                          result !== ""
                            ? "btn-sm bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 text-white px-5 py-2.5 border-2  rounded-full hover:bg-orange-700 mx-3"
                            : "btn-sm bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 text-white px-5 py-2.5 border-2  rounded-full hover:bg-orange-700 mx-3"
                        }
                      >
                        Export
                      </button>
                      <span>As:</span>
                      <select
                        onChange={(e) => {
                          setExportAs(e.target.value);
                        }}
                        className={"text-black rounded-xl mx-3"}
                      >
                        <option value="txt">TXT</option>
                        <option value="pdf">PDF</option>
                        <option value="word">WORD</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="mt-24 lg:mt-8">
                  <div className="flex justify-between">
                    <h1 className="text-2xl font-[600]">
                      Generated manuscripts
                    </h1>
                    <div
                      onClick={fetchHistory}
                      className="bg-orange-500 rounded-full text-white px-3 py-1 cursor-pointer flex items-center"
                    >
                      {refreshing ? (
                        "Refreshing..."
                      ) : (
                        <>
                          <BiRefresh className="text-[20px] mr-1" /> Refresh
                        </>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-12 gap-6 mt-4">
                    {history.map((manuscript) => {
                      return (
                        <ManuscriptCard
                          key={manuscript.id}
                          manuscript={manuscript}
                          setResult={setResult}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            {loading && (
              <img
                className="fixed top-[50%] left-[50%] w-[150px] -translate-x-[50%] -translate-y-[50%]"
                src={InfinityLoading}
              />
            )}
          </main>
        </div>
      </div>
    </>
  );
}

export default Manuscript;
