import React, { useEffect, useState } from "react";

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
function TextSummarize() {
  const { user } = useSelector((state) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [error, setError] = useState(null);
  const [countMax, setCountMax] = useState(0);

  const [file, setFile] = useState([]);
  const [fileText, setFileText] = useState("");

  useEffect(() => {
    var count = 0;
    var split = text.split(" ");
    for (var i = 0; i < split.length; i++) {
      if (split[i] != "") {
        count++;
      }
    }
    setWordCount(count);
    countMax > 0 && count > countMax
      ? setError("Maximum number of words is exceeded")
      : setError(null);
  }, [text]);

  const generate = () => {
    if (wordCount > countMax) {
      Swal.fire({
        icon: "warning",
        title: "You exceeded the limit number of words per request.",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      setLoading(true);
      setSummary("");
      axios
        .post(
          "https://plankton-app-q74hx.ondigitalocean.app/ai-services/summarize",
          {
            input_text: text,
            userId: user?.id,
          }
        )
        .then((res) => {
          setLoading(false);
          setSummary(res.data.Summary);
        })
        .catch((err) => {
          setLoading(false);
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

  const [exportAs, setExportAs] = useState("txt");

  function exportTxt() {
    const element = document.createElement("a");
    const file = new Blob([summary], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "TextSummarize.txt";
    document.body.appendChild(element);
    element.click();
  }

  const exportFile = () => {
    if (exportAs !== "txt") {
      const href =
        "https://plankton-app-q74hx.ondigitalocean.app/ai-services/download-" +
        exportAs +
        "2?text=" +
        encodeURIComponent(summary);
      const link = document.createElement("a");
      link.href = href;
      link.setAttribute("download", "products.pdf"); //or any other extension
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    } else {
      exportTxt();
    }
  };

  const [userData, setUserdata] = useState(null);

  useEffect(() => {
    axios
      .get(
        "https://plankton-app-q74hx.ondigitalocean.app/users/find/" + user?.id
      )
      .then((res) => {
        setUserdata(res.data);
        setCountMax(res.data.subscription.input_length);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
                <div className="grow">
                  <h1 className="text-4xl font-[600] text-[#ea580c] text-center mt-8">
                    Summarize Text To Key Points
                  </h1>
                  <p className="text-slate-800 text-center w-[80%] mx-auto mt-4">
                    Summarize any text with a click of a button. Bevinzey's
                    summarizer can condense articles, slides or chapters down to
                    the key points instantly.,
                  </p>
                  <p className="text-slate-800 text-center w-[60%] mx-auto mt-4">
                    Just copy and paste your English text below and get the
                    results right away!
                  </p>
                  {userData && (
                    <div>
                      {userData?.subscriptionId !== null ? (
                        <div className="relative flex justify-evenly items-center mb-2 relative flex-col md:flex-row mt-24">
                          <div className="w-full lg:w-[35%]">
                            <div className="w-[15px]"></div>

                            <textarea
                              value={text}
                              onChange={(e) => {
                                setText(e.target.value);
                              }}
                              placeholder="Please paste your text here."
                              className="min-h-[250px] resize-none w-full rounded-lg text-black border-2 border-[#ffa000] focus:border-[#e65100] scrollbar-thin h-full scrollbar-thumb-[#e65100] scrollbar-track-[#ffa000] overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
                            ></textarea>
                            <div className={` text-slate-800 mb-2`}>
                              <p
                                className={`${
                                  wordCount > countMax && "text-[red]"
                                }`}
                              >
                                {userData && (
                                  <>
                                    <span>
                                      {wordCount}/{countMax}{" "}
                                    </span>
                                    <span className="text-sm">{error}</span>
                                  </>
                                )}
                              </p>
                            </div>
                            {userData?.subscription.export && (
                              <FileUpload
                                setFileText={setText}
                                files={file}
                                setFiles={setFile}
                                removeFile={() => {
                                  setFile([]);
                                }}
                                text="Or upload a file instead"
                              />
                            )}
                          </div>
                          <div className="w-full lg:w-[15%] flex flex-col items-center my-4">
                            <button
                              onClick={() => {
                                text !== "" && generate();
                              }}
                              className="btn-sm
                  bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600
                  text-white px-5 py-2.5 border-2  rounded-full hover:bg-orange-700 ml-3"
                            >
                              Generate
                            </button>
                          </div>
                          <div className="w-full lg:w-[35%]">
                            <textarea
                              disabled
                              value={summary}
                              onChange={(e) => {
                                setSummary(e.target.value);
                              }}
                              placeholder="Click generate to get your summary"
                              className="h-[250px] mb-8 resize-none w-full rounded-lg text-black border-2 border-[#ffa000] focus:border-[#e65100] scrollbar-thin scrollbar-thumb-[#e65100] scrollbar-track-[#ffa000] overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
                            ></textarea>
                            {userData?.subscription.export && (
                              <div className="flex justify-end items-center">
                                <button
                                  onClick={() => {
                                    exportFile();
                                  }}
                                  className={
                                    summary !== ""
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
                            )}
                          </div>
                          {loading && (
                            <img
                              className="absolute top-[5%] left-[50%] w-[150px] -translate-x-[50%]"
                              src={InfinityLoading}
                            />
                          )}
                        </div>
                      ) : (
                        <SubscriptionAd />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default TextSummarize;
