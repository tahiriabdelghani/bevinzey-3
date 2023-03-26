import React, { useEffect, useState } from "react";

import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/DashboardHeader";
import PageIllustration from "../../partials/PageIllustration";
import ServiceHero from "../../partials/ServiceHero";
import axios from "axios";
import FileUpload from "../../components/FileUploader/FileUpload";
import Swal from "sweetalert2";
import SubscriptionAd from "../../components/SubscriptionAd";
import { useSelector } from "react-redux";

function StudyGuide() {
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [error, setError] = useState("");
  const [countMax, setCountMax] = useState(0);
  const [questionsNumber, setQuestionsNumber] = useState(1);
  const [questionType, setQuestionType] = useState("Multiple choices");

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
      : setError("");
  }, [text]);

  const generate = () => {
    setLoading(true);
    setSummary("");
    axios
      .post(
        "https://plankton-app-q74hx.ondigitalocean.app/ai-services/questions",
        {
          nbr_questions: parseInt(questionsNumber),
          study_guide: true,
          questions_type: questionType,
          input_text: text,
          userId: 5,
        }
      )
      .then((res) => {
        setLoading(false);
        console.log(res.data.Questions);
        setSummary(res.data["Study guide"]);
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
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto bg-gray-400 ">
            <div className="flex flex-col overflow-hidden">
              <div className="grow">
                <h1 className="text-4xl font-[600] text-[#ea580c] text-center mt-8">
                  Study Guide
                </h1>
                <p className="text-slate-800 text-center w-[80%] mx-auto mt-4">
                  Create study guides that help you study smarter and faster
                  with this useful feature!
                </p>
                <p className="text-slate-800 text-center w-[60%] mx-auto mt-4">
                  Just copy and paste your English text below and get the
                  results right away!
                </p>

                {userData && (
                  <div>
                    {userData?.subscriptionId !== null ? (
                      <div className="w-[90%] mx-auto mt-24">
                        <div className="flex justify-end mb-4">
                          <div className="flex mx-4 flex items-center">
                            <div className="mr-4 text-slate-800">
                              Number of Questions:{" "}
                            </div>
                            <select
                              value={questionsNumber}
                              onChange={(e) => {
                                setQuestionsNumber(e.target.value);
                              }}
                              className="text-slate-800 rounded-lg"
                            >
                              {userData && (
                                <>
                                  <option value={1}>1</option>
                                  <option value={2}>2</option>
                                  <option value={3}>3</option>
                                  <option value={4}>4</option>
                                  <option value={5}>5</option>
                                  {userData?.subscription.plan ===
                                    "Premium" && (
                                    <>
                                      <option value={6}>6</option>
                                      <option value={7}>7</option>
                                      <option value={8}>8</option>
                                      <option value={9}>9</option>
                                      <option value={10}>10</option>
                                    </>
                                  )}
                                </>
                              )}
                            </select>
                          </div>
                          <div className="flex mx-4 flex items-center">
                            <div className="mr-4 text-slate-800">
                              Question type:{" "}
                            </div>
                            <select
                              onChange={(e) => {
                                setQuestionType(e.target.value);
                              }}
                              className="text-slate-800 rounded-lg"
                            >
                              <option>Multiple choices</option>
                              <option>True/False</option>
                              <option>Short answer</option>
                              <option>Fill in the blanks</option>
                            </select>
                          </div>
                        </div>

                        <div className="flex justify-between items-center relative flex-col md:flex-row mb-24">
                          <div className="w-full lg:w-[35%]">
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
                              <div className="flex justify-end">
                                <button
                                  className={
                                    summary !== ""
                                      ? "btn-sm bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 text-white px-5 py-2.5 border-2  rounded-full hover:bg-orange-700 ml-3"
                                      : "btn-sm bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 text-white px-5 py-2.5 border-2  rounded-full hover:bg-orange-700 ml-3"
                                  }
                                >
                                  Export
                                </button>
                              </div>
                            )}
                          </div>
                          {loading && (
                            <img
                              className="absolute top-[5%] left-[50%] w-[150px] -translate-x-[50%]"
                              src="/images/Infinity.svg"
                            />
                          )}
                        </div>
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
  );
}

export default StudyGuide;
