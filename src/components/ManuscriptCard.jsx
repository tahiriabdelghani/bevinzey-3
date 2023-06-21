import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdEditNote, MdContentCopy } from "react-icons/md";

function ManuscriptCard({ manuscript, setResult }) {
  const [copied, setCopied] = useState(false);

  const copyResult = (result) => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };
  return (
    <div className="col-span-full sm:col-span-6 xl:col-span-4 cursor-pointer bg-white shadow-lg rounded-sm border-[2px] border-[#ea580c] rounded-xl text-black">
      <div className="flex flex-col h-full p-5">
        <div className="grow mt-2">
          <h2 className="text-xl leading-snug font-semibold text-slate-800 mb-2">
            {manuscript.title}
          </h2>
          <div className="text-sm text-slate-800">
            {manuscript.response
              ? manuscript.response.length > 150
                ? manuscript.response.slice(0, 150) + "..."
                : manuscript.response
              : "Your content is being generated please wait."}
          </div>
        </div>
        <footer className="mt-5">
          {/* <div className="text-sm font-medium text-slate-500 mb-2">{props.dates.from} <span className="text-slate-400">-&gt;</span> {props.dates.to}</div> */}
          <div className="flex justify-between items-center">
            <div className="flex justify-between w-full">
              {manuscript.status === "finish" ? (
                <div className="flex items-center">
                  <div
                    className={`mr-2 text-xs inline-flex font-medium rounded-full text-center px-2.5 py-1 bg-emerald-100 text-emerald-600`}
                  >
                    Finished
                  </div>
                  <MdEditNote onClick={() => setResult(manuscript.response)} className="text-[25px] mr-2" />
                  <MdContentCopy
                    onClick={() => copyResult(manuscript.response)}
                    className="text-[16px] mr-4"
                  />
                  {copied && (
                    <span className="text-xs px-2 py-0.5 bg-slate-800 opacity-40 mt-1 text-white rounded-full">
                      Copied!
                    </span>
                  )}
                </div>
              ) : (
                <div
                  className={`text-xs inline-flex font-medium rounded-full text-center px-2.5 py-1 bg-yellow-100 text-emerald-600`}
                >
                  Processing...
                </div>
              )}
              <div className="text-slate-800">
                {manuscript.createdAt.slice(0, 10)}{" "}
                {manuscript.createdAt.slice(11, 16)}
              </div>
            </div>
            <div>
              {/* <Link className="text-sm font-medium text-indigo-500 hover:text-indigo-600" to={props.link}>View -&gt;</Link> */}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default ManuscriptCard;
