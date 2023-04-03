import React from "react";

function Chat({ chat, selectedChat, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`text-gray-500 ml-2 text-sm p-3 border-b-2 border-gray-300 cursor-pointer ${
        selectedChat === chat.id && "bg-gray-100"
      }`}
    >
      {chat.title ?? "New chat"}
    </div>
  );
}

export default Chat;
