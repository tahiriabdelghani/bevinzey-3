import React from "react";
import { Link } from "react-router-dom";

function Service({ tool }) {
  return (
    <div className="col-span-full sm:col-span-6 xl:col-span-4 cursor-pointer bg-slate-800 hover:bg-[#353e4f] shadow-lg rounded-sm border-[2px] border-slate-200 hover:border-[#ea580c] rounded-xl hover:text-[#ea580c]">
      <Link to={`/services/${tool.link ?? "product-description"}`}>
        <div className="flex flex-col h-full p-5">
          <header>
            <div
              className={`flex items-center justify-between ${tool.color} w-fit rounded-xl p-3`}
            >
              {tool.icon}
            </div>
          </header>
          <div className="grow mt-2">
            <Link
              className="inline-flex mb-1"
              to={`/services/${tool.link ?? "product-description"}`}
            >
              <h2 className="text-xl leading-snug font-semibold">
                {tool.title}
              </h2>
            </Link>
            <div className="text-sm text-gray-300">{tool.desc}</div>
          </div>
          <footer className="mt-5">
            {/* <div className="text-sm font-medium text-slate-500 mb-2">{props.dates.from} <span className="text-slate-400">-&gt;</span> {props.dates.to}</div> */}
            <div className="flex justify-between items-center">
              <div>
                {tool.comingSoon && (
                  <div
                    className={`text-xs inline-flex font-medium rounded-full text-center px-2.5 py-1 bg-emerald-100 text-emerald-600`}
                  >
                    Coming Soon
                  </div>
                )}
              </div>
              <div>
                {/* <Link className="text-sm font-medium text-indigo-500 hover:text-indigo-600" to={props.link}>View -&gt;</Link> */}
              </div>
            </div>
          </footer>
        </div>
      </Link>
    </div>
  );
}

export default Service;
