import React from "react";

function BotMessage({ text }) {
  return (
    <div className="flex items-start my-4 last:mb-0">
      <img
        className="rounded-full mr-4"
        src="/images/bevinzey-bot.png"
        width="40"
        height="40"
      />
      <div className="">
        <pre className="text-sm font-inter whitespace-pre-wrap bg-white text-slate-800 p-3 rounded-lg rounded-tl-none border border-slate-200 shadow-md mb-1">
          {text}
        </pre>
      </div>
    </div>
  );
}

export default BotMessage;
