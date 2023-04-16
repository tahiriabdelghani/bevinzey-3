import React, { useState } from "react";
import { MdOutlineContentCopy } from "react-icons/md";

function BotMessage({ text }) {
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
    <div
      onClick={handleClick}
      className="flex cursor-pointer items-start my-4 last:mb-0 select-none"
    >
      <img
        className="rounded-full mr-4"
        src="/images/bevinzey-bot.png"
        width="40"
        height="40"
        alt="User 01"
      />
      <div className="relative flex items-center">
        <div>
          <pre className="text-sm font-inter whitespace-pre-wrap bg-white text-slate-800 p-3 rounded-lg rounded-tl-none border border-slate-200 shadow-md mb-1">
            {text}
          </pre>
        </div>
        {copied && (
          <span className="text-[11px] absolute -right-[25px] text-white bg-[#8886fe] rounded p-1 mb-1">
          <MdOutlineContentCopy size={12}/>
        </span>
        )}
      </div>
    </div>
  );
}

export default BotMessage;
