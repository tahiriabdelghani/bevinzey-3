import React, { useEffect, useRef, useState } from "react";
import DashboardHeader from "../../partials/DashboardHeader";
import MessagesBody from "../../components/messages/MessagesBody";
import MessagesFooter from "../../components/messages/MessagesFooter";
import Sidebar from "../../partials/Sidebar";
import "../../css/additional-styles/msg.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BsStars } from "react-icons/bs";
import { BsFillTrashFill } from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import { GiSpiderWeb } from "react-icons/gi";
import { AiTwotoneSetting } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import Chat from "../../components/Chat";
function ChatBevinzey() {
  const { user } = useSelector((state) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  const [messages, setMessages] = useState([]);
  const getMessages = () => {
    selectedChat !== null &&
      axios
        .get(
          "https://plankton-app-q74hx.ondigitalocean.app/ai-services/chat/" +
            selectedChat
        )
        .then((res) => {
          var oldMsgs = [];
          res.data.map((msg, i) => {
            if (i % 2 == 0) {
              oldMsgs = [
                ...oldMsgs,
                {
                  sender: "me",
                  text: msg,
                },
              ];
            } else {
              oldMsgs = [
                ...oldMsgs,
                {
                  sender: "bot",
                  text: msg,
                },
              ];
            }
          });
          setMessages(oldMsgs);
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const sendMessage = (msg) => {
    if (!loading) {
      if (selectedChat === null) {
        createNewChatAndSend(msg);
      } else {
        setMessages([
          ...messages,
          {
            sender: "me",
            text: msg,
          },
        ]);
        setLoading(true);
        setNewMessage("");
        axios
          .post(
            "https://plankton-app-q74hx.ondigitalocean.app/ai-services/gpt/ChatBevinzey",
            {
              userId: user.id,
              chatId: selectedChat,
              prompt: msg,
            }
          )
          .then((res) => {
            setLoading(false);
            setMessages([
              ...messages,
              {
                sender: "me",
                text: msg,
              },
              {
                sender: "bot",
                text: res.data.message,
              },
            ]);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      }
    }
  };

  const createNewChatAndSend = (msg) => {
    axios
      .post(
        "https://plankton-app-q74hx.ondigitalocean.app/ai-services/create/chat",
        {
          userId: user.id,
        }
      )
      .then((res) => {
        getChats();
        
        setMessages([
          ...messages,
          {
            sender: "me",
            text: msg,
          },
        ]);
        setLoading(true);
        setNewMessage("");

        axios
          .post(
            "https://plankton-app-q74hx.ondigitalocean.app/ai-services/gpt/ChatBevinzey",
            {
              userId: user.id,
              chatId: res.data.id,
              prompt: msg,
            }
          )
          .then((res2) => {
            setLoading(false);
            setSelectedChat(res.data.id);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      });
  };

  const createNewChat = async () => {
    await axios
      .post(
        "https://plankton-app-q74hx.ondigitalocean.app/ai-services/create/chat",
        {
          userId: user.id,
        }
      )
      .then((res) => {
        getChats();
        setSelectedChat(res.data.id);
      });
  };

  const [chats, setChats] = useState([]);
  const getChats = () => {
    axios
      .get(
        "https://plankton-app-q74hx.ondigitalocean.app/ai-services/user/chats/" +
          user.id
      )
      .then((res) => {
        setChats(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    getChats();
  }, []);

  useEffect(() => {
    getMessages();
  }, [selectedChat]);

  const [clear, setClear] = useState(false);

  const clearChat = () => {
    axios
      .get(
        "https://plankton-app-q74hx.ondigitalocean.app/ai-services/delete/chats/user/" +
          user.id
      )
      .then((res) => {
        getChats();
        setClear(false);
        setSelectedChat(null);
        setMessages([]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [showTip, setShowTip] = useState(false);
  const showToolTip = () => {
    setShowTip(true);
    setTimeout(() => {
      setShowTip(false);
    }, 1500);
  };

  const [showChatList, setShowChatList] = useState(false);
  const toggleChatList = () => {
    setShowChatList(!showChatList);
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

        <main className="h-[calc(100%-111px)] scrollbar-thin scrollbar-thumb-[#5552FE] scrollbar-track-gray-300 overflow-y-scroll">
          <div className="relative flex h-full">
            {showChatList && (
              <div className="min-w-[280px] h-full z-20 drop-shadow-[60px_0px_50px_rgba(0,0,0,0.10)] fixed">
                <div className="flex flex-col justify-between h-[calc(100%-111px)]  justify-evenly  min-w-[280px] bg-white">
                  <div className="small-div flex justify-center py-4 border-b-2 border-[#5552FE]">
                    <button
                      onClick={createNewChat}
                      className="text-[#5552FE] text-sm mx-1 border-2 border-[#5552FE] py-[2px] px-2 flex items-center rounded"
                    >
                      <AiOutlinePlusCircle className="mr-2" /> Start new chat{" "}
                    </button>
                  </div>
                  {chats.length > 0 ? (
                    <>
                      <div className="big-div scrollbar-thin scrollbar-thumb-[#5552FE] scrollbar-track-gray-300 overflow-y-scroll">
                        {chats
                          .slice(0)
                          .reverse()
                          .map((chat) => (
                            <Chat
                              onClick={() => {
                                if (selectedChat !== chat.id) {
                                  setMessages([]);
                                  setSelectedChat(chat.id);
                                }
                              }}
                              key={chat.id}
                              getChats={getChats}
                              selectedChat={selectedChat}
                              setSelectedChat={setSelectedChat}
                              chat={chat}
                              setMessages={setMessages}
                            />
                          ))}
                      </div>
                      <div className="flex justify-between small-div py-3  border-[#5552FE]">
                        <div className="relative small-div flex items-center justify-evenly">
                          <GrClose
                            onClick={toggleChatList}
                            className="text-black p-2 ml-2 cursor-pointer bg-gray-100 rounded"
                            size={45}
                          />
                        </div>
                        {!clear ? (
                          <button
                            onClick={() => {
                              setClear(true);
                            }}
                            className="text-red-500 m-auto border-2 border-red-500 py-[2px] px-5 flex items-center rounded"
                          >
                            <BsFillTrashFill className="mr-2" size={14} /> Clear
                            all
                          </button>
                        ) : (
                          <div className="flex m-auto justify-center">
                            <button
                              onClick={() => {
                                clearChat();
                              }}
                              className="text-red-500 border-2 p-2 border-red-500  text-center mx-2 flex items-center rounded"
                            >
                              <BsFillTrashFill size={14} />
                            </button>
                            <button
                              onClick={() => {
                                setClear(false);
                              }}
                              className="text-green-600 border-2 p-2 border-green-600 text-center mx-2 flex items-center rounded"
                            >
                              <CgClose size={14} />
                            </button>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="big-div text-gray-400 text-sm flex flex-col items-center justify-center">
                      <GiSpiderWeb className="mb-2" size={55} />{" "}
                      <span>Nothing to show.</span>
                    </div>
                  )}
                </div>
              </div>
            )}
            <div
              onClick={() => {
                setShowChatList(false);
              }}
              className="flex w-full flex-col justify-between h-full z-10"
            >
              {messages?.length > 0 && (
                <span className="text-black flex h-[30px] justify-end pt-[4px] pr-3">
                  {showTip && (
                    <span className="text-xs bg-gray-300 rounded-full h-min px-2 py-[1px] mr-1">
                      Double click on message to copy
                    </span>
                  )}
                  <BsInfoCircle
                    className="cursor-pointer"
                    onClick={showToolTip}
                    size={16}
                  />{" "}
                </span>
              )}
              <div className="big-div">
                <MessagesBody messages={messages} loading={loading} />
              </div>
              <div className="small-div sticky bottom-0">
                <MessagesFooter
                  setNewMessage={setNewMessage}
                  newMessage={newMessage}
                  sendMessage={sendMessage}
                  toggleChatList={toggleChatList}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ChatBevinzey;
