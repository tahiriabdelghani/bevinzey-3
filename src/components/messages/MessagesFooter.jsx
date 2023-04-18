import React from "react";
import { TbListDetails } from "react-icons/tb";
import { AiOutlineSend } from "react-icons/ai";

function MessagesFooter({
  sendMessage,
  setNewMessage,
  newMessage,
  toggleChatList,
}) {
  return (
    <div className="sticky bottom-0">
      <div className="flex items-center justify-between bg-white border-t border-slate-200 px-4 sm:px-6 md:px-2 h-16">
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
            newMessage !== "" && sendMessage(newMessage);
          }}
        >
          <div className="grow mr-3 relative">
            <label htmlFor="message-input" className="sr-only">
              Type a message
            </label>
            <input
              value={newMessage}
              onChange={(e) => {
                setNewMessage(e.target.value);
              }}
              id="message-input"
              className="form-input pr-16 w-full bg-slate-100 text-black border-transparent focus:bg-white focus:border-slate-300"
              type="text"
              placeholder="Aa"
            />
            <button className="text-slate-800 absolute right-3 bottom-[50%] translate-y-[50%]" type="submit">
              <AiOutlineSend
                
                size={20}
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MessagesFooter;
