import React, { useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import { AiOutlineCheck } from "react-icons/ai";
import axios from "axios";

function Chat({ chat, selectedChat, onClick, getChats, setSelectedChat,setMessages }) {
  const [deleteClicked, setDeleteClicked] = useState(false);

  const deleteChat = () => {
    axios
      .get(
        "https://plankton-app-q74hx.ondigitalocean.app/ai-services/delete/chat/" +
          chat.id
      )
      .then((res) => {
        getChats();
        setSelectedChat(null)
        setMessages([])
      });
  };
  return (
    <div
      onClick={onClick}
      className={`relative max-w-[280px] truncate text-gray-500 ml-2 text-sm p-3 pl-1 border-b-2 border-gray-300 cursor-pointer ${
        selectedChat === chat.id && "bg-gray-100"
      }`}
    >
      {selectedChat === chat.id && !deleteClicked && (
        <div
          onClick={() => {
            setDeleteClicked(true);
          }}
          className="absolute right-3 bottom-3 p-1 rounded flex bg-red-200"
        >
          <BsFillTrashFill className="text-[#9997fe]" size={14} />
        </div>
      )}
      {selectedChat === chat.id && deleteClicked && (
        <div className="absolute right-3 bottom-3  rounded flex">
          <div className=" p-1 rounded flex bg-red-200 mr-1">
            <AiOutlineCheck onClick={deleteChat} className="text-[#9997fe]" size={14} />
          </div>
          <div
            onClick={() => {
              setDeleteClicked(false);
            }}
            className=" p-1 rounded flex bg-green-200"
          >
            <CgClose className="text-[#9997fe]" size={14} />
          </div>
        </div>
      )}
      {chat.title ?? "New chat"}{" "}
    </div>
  );
}

export default Chat;
