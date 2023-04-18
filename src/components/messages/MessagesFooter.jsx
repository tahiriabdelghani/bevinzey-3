import React, { useEffect, useRef } from "react";
import { TbListDetails } from "react-icons/tb";
import { AiOutlineSend } from "react-icons/ai";

function MessagesFooter({
  sendMessage,
  setNewMessage,
  newMessage,
  toggleChatList,
}) {
  const textareaRef = useRef(null);

  const handleTextareaChange = (e) => {
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    setNewMessage(e.target.value);
  };

  useEffect(() => {
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    console.log("first")
  }, [newMessage]);
  return (
    <div className="sticky bottom-0">
      <div className="flex items-center justify-between bg-white border-t border-slate-200 px-4 py-2 sm:px-6 md:px-2 max-h-32">
        {/* Message input */}
        <TbListDetails
          onClick={(e) => {
            e.stopPropagation();
            toggleChatList();
          }}
          className="text-black p-2 cursor-pointer hover:bg-gray-100 mr-1 rounded"
          size={45}
        />
        <form
          className="grow flex"
          onSubmit={(e) => {
            e.preventDefault();
            textareaRef.current.style.height = "auto";
            newMessage !== "" && sendMessage(newMessage);
          }}
        >
          <div className="grow mr-3 relative">
            <label htmlFor="message-input" className="sr-only">
              Type a message
            </label>
            <textarea
              ref={textareaRef}
              className="h-[40px] max-h-[80px] pr-10 w-full resize-none border text-black rounded focus:outline-none scrollbar-w-[3px] scrollbar-thin scrollbar-thumb-[#2e46e8] scrollbar-track-[#6d7eef] overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
              style={{ overflowY: "auto", overflowX: "hidden" }}
              rows="1"
              value={newMessage}
              onChange={(e) => {
                handleTextareaChange(e);
              }}
            ></textarea>
            <button
              className="text-slate-800 absolute right-3 bottom-[50%] translate-y-[35%]"
              type="submit"
            >
              <AiOutlineSend size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MessagesFooter;
