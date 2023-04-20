import React, { useEffect, useState } from "react";
import DashboardHeader from "../../partials/DashboardHeader";
import Sidebar from "../../partials/Sidebar";
import "../../css/additional-styles/msg.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { SiAudiomack } from "react-icons/si";
import { FaRegCopy } from "react-icons/fa";
import { HiDownload } from "react-icons/hi";
import infinity from "../../images/Infinity.svg";

function AudioTranscription() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [script, setScript] = useState("");

  const generate = () => {
    if (file !== null && file?.size < 25 * 1024 * 1024) {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file, file?.name);
      axios
        .post(
          "https://plankton-app-q74hx.ondigitalocean.app/ai-services/audio-to-text3/" +
            user.id,
          formData
        )
        .then((res) => {
          setLoading(false);
          setScript(res.data);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  };

  const uploadHandler = (event) => {
    const f = event.target.files[0];
    const reader = new FileReader();
    reader.onload = async (e) => {
      setFile(f);
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  const [copied, setCopied] = useState(false);
  const copyScript = () => {
    navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const [exportAs, setExportAs] = useState("txt");

  function exportTxt() {
    const element = document.createElement("a");
    const file = new Blob([script], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "TextToQuestions.txt";
    document.body.appendChild(element);
    element.click();
  }

  const exportFile = () => {
    if (exportAs !== "txt") {
      const href =
        "https://plankton-app-q74hx.ondigitalocean.app/ai-services/download-" +
        exportAs +
        "2?text=" +
        encodeURIComponent(script);
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

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col h-full flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <div className="small-div">
          <DashboardHeader
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        </div>

        <main className="big-div relative">
          <div className="relative w-full h-full py-4">
            <div className="w-[90%] md:w-[80%] lg:w-[60%] m-auto bg-white rounded-xl shadow-xl">
              <div className="p-4">
                <div className="flex items-center">
                  <div className="w-fit p-2.5 rounded-lg bg-[#eef0fd] mr-2">
                    <SiAudiomack className="text-orange-600" size={30} />
                  </div>
                  <div>
                    <h1 className="font-semibold text-black text-xl">
                      Audio Transcription
                    </h1>
                    <span className="text-gray-400">
                      Generate scripts from audio using AI
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-black text-sm mb-3">
                    Upload your audio:
                  </span>
                  <div className="flex">
                    <input
                      type="file"
                      name="file"
                      onChange={uploadHandler}
                      className="w-full border-1.5 text-sm border-black h-[30px] text-black"
                    />
                  </div>
                  {file?.size > 25 * 1024 * 1024 && (
                    <span className="text-xs text-[red]">
                      File too big (>25MB). File upload a smaller file.
                    </span>
                  )}
                </div>
                <div className="w-full flex justify-between m-auto my-4">
                  <div className="flex justify-end items-center">
                    <button
                      onClick={() => {
                        exportFile();
                      }}
                      className={
                        script !== ""
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
                  <button
                    onClick={() => {
                      generate();
                    }}
                    className="btn-sm
                  bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600
                  text-white px-5 py-2.5 border-2  rounded-full hover:bg-orange-700 ml-3"
                  >
                    Generate
                  </button>
                </div>
                <div className="mt-4 relative h-[250px]">
                  <textarea
                    disabled
                    value={script}
                    onChange={(e) => {
                      setScript(e.target.value);
                    }}
                    placeholder="Click generate to get your script"
                    className="h-full mb-8 resize-none w-full rounded-lg text-black border-2 border-orange-400 focus:border-orange-600 scrollbar-thin scrollbar-thumb-orange-600 scrollbar-track-orange-400 overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
                  ></textarea>
                  {script && (
                    <span
                      onClick={copyScript}
                      className="flex flex-col items-end text-orange-600 absolute bottom-1.5 right-3 cursor-pointer"
                    >
                      {copied && (
                        <span className="text-xs text-white bg-orange-600 rounded-full px-1 py-0.5 mb-1 opacity-80">
                          Copied!
                        </span>
                      )}
                      <FaRegCopy />
                    </span>
                  )}
                  {loading && (
                    <div className="absolute w-[40%] flex flex-col left-[50%] -translate-x-[50%] -translate-y-[50%] top-[50%]">
                      <img src={infinity} className="w-[40%] m-auto" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AudioTranscription;
