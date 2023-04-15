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
import { GrLanguage } from "react-icons/gr";
import { AiTwotoneSetting } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import Chat from "../../components/Chat";
import { GrClose } from "react-icons/gr";
function ChatBevinzey() {
  const { user } = useSelector((state) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  const [messages, setMessages] = useState(null);
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
            "https://plankton-app-q74hx.ondigitalocean.app/ai-services/gpt/ChatRobotizia2",
            {
              userId: user.id,
              chatId: selectedChat,
              prompt: msg,
              language: language,
              system: chatType,
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
        setSelectedChat(res.data.id);
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
            "https://plankton-app-q74hx.ondigitalocean.app/ai-services/gpt/ChatRobotizia2",
            {
              userId: user.id,
              chatId: res.data.id,
              prompt: msg,
            }
          )
          .then((res2) => {
            setLoading(false);
            setMessages([
              ...messages,
              {
                sender: "me",
                text: msg,
              },
              {
                sender: "bot",
                text: res2.data.message,
              },
            ]);
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

  const [prompts, setPrompts] = useState([]);
  const getPrompts = () => {
    axios
      .get("https://plankton-app-q74hx.ondigitalocean.app/prompts/findall")
      .then((res) => {
        setPrompts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    getChats();
    getPrompts();
    getChatTypes();
  }, []);

  useEffect(() => {
    getMessages();
  }, [selectedChat]);

  const [selectedCategory, setSelectedCategory] = useState(0);

  const categories = {
    1: "social media",
    2: "frameworks",
    3: "blogs",
  };

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

  const [language, setLanguage] = useState("english");

  const [showSettings, setShowSettings] = useState(false);
  const [chatType, setChatType] = useState("General AI");
  const [chatTypes, setChatTypes] = useState({});
  const getChatTypes = () => {
    axios
      .get(
        "https://plankton-app-q74hx.ondigitalocean.app/ai-services/system/findall"
      )
      .then((res) => {
        setChatTypes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const icons = {
    "General AI": "🤖",
    "Coding Assistant": "💻",
    CTO: "👨‍💼",
    "Travel Guide": "🗺️",
    "Stand-up Comedian": "🎙️",
    Poet: "🖋️",
    "Legal Advisor": "📜",
    Historian: "📚",
    Chef: "👨‍🍳",
    Accountant: "💵",
    "Life Coach": "🧘",
    "Book Recommendation": "📖",
    "Music Recommendation": "🎶",
    "Movie Recommendation": "🎥",
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
    <div
      onClick={() => {
        setShowSettings(false);
      }}
      className="flex h-screen overflow-hidden"
    >
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
                            />
                          ))}
                      </div>
                      <div className="small-div py-4  border-[#5552FE]">
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
                          <div className="flex justify-center">
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
                  <div className="relative small-div flex items-center justify-evenly py-4 border-t-2 border-gray-400">
                    <GrClose
                      onClick={toggleChatList}
                      className="text-black p-2 cursor-pointer hover:bg-gray-100 mr-1 rounded"
                      size={40}
                    />
                    <div className="flex items-center">
                      <GrLanguage
                        onClick={toggleChatList}
                        className="mr-2 hidden 2xl:block"
                        size={16}
                      />
                      <select
                        value={language}
                        onChange={(e) => {
                          setLanguage(e.target.value);
                        }}
                        className="h-8 text-sm rounded-lg text-slate-600 border-slate-600 py-0"
                      >
                        <option value="english">English</option>
                        <option value="portugal">Portuguese</option>
                      </select>
                    </div>
                    <div className="flex items-center">
                      <AiTwotoneSetting
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowSettings(!showSettings);
                        }}
                        className="text-black border-[1px] mx-1 border-black w-8 h-8 p-1.5 rounded cursor-pointer"
                        size={14}
                      />
                      <span>{icons[chatType]}</span>
                    </div>
                    {showSettings && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="text-black p-2 flex flex-col rounded bg-white absolute border-[1px] bottom-[64px] left-0 z-190 border-black"
                      >
                        <div
                          className="flex justify-end cursor-pointer"
                          onClick={() => {
                            setShowSettings(false);
                          }}
                        >
                          <CgClose size={12} />
                        </div>
                        <span className="text-sm mb-1">Chat type: </span>
                        <select
                          value={chatType}
                          onChange={(e) => {
                            setChatType(e.target.value);
                          }}
                          className="py-1 text-sm rounded"
                        >
                          {Object.keys(chatTypes).map((type) => (
                            <option value={type}>{chatTypes[type]}</option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
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
                {messages?.length > 0 || loading ? (
                  <MessagesBody messages={messages} loading={loading} />
                ) : (
                  <div className="w-[90%] xl:w-[1000px] mt-0 m-auto xl:mt-16">
                    <div>
                      <ul className="flex flex-wrap justify-evenly mx-12">
                        <li className="mr-8 mt-2">
                          <button
                            onClick={() => setSelectedCategory(0)}
                            className={`inline-flex items-center border-[2px] border-[#293fd2] justify-center text-sm font-medium leading-5 rounded-xl px-8 py-2 border shadow-sm text-white duration-150 ease-in-out  ${
                              selectedCategory === 0
                                ? "bg-[#2e46e8] text-white"
                                : "bg-white text-[#2e46e8] "
                            }`}
                          >
                            All
                          </button>
                        </li>
                        <li className="mr-8 mt-2">
                          <button
                            onClick={() => setSelectedCategory(1)}
                            className={`inline-flex items-center border-[2px] border-[#293fd2] justify-center text-sm font-medium leading-5 rounded-xl px-8 py-2 border shadow-sm text-white duration-150 ease-in-out  ${
                              selectedCategory === 1
                                ? "bg-[#2e46e8] text-white"
                                : "bg-white text-[#2e46e8] "
                            }`}
                          >
                            Social Media
                          </button>
                        </li>
                        <li className="mr-8 mt-2">
                          <button
                            onClick={() => setSelectedCategory(2)}
                            className={`inline-flex items-center border-[2px] border-[#293fd2] justify-center text-sm font-medium leading-5 rounded-xl px-8 py-2 border shadow-sm text-white duration-150 ease-in-out  ${
                              selectedCategory === 2
                                ? "bg-[#2e46e8] text-white"
                                : "bg-white text-[#2e46e8] "
                            }`}
                          >
                            Frameworks
                          </button>
                        </li>
                        <li className="mr-8 mt-2">
                          <button
                            onClick={() => setSelectedCategory(3)}
                            className={`inline-flex items-center border-[2px] border-[#293fd2] justify-center text-sm font-medium leading-5 rounded-xl px-8 py-2 border shadow-sm text-white duration-150 ease-in-out  ${
                              selectedCategory === 3
                                ? "bg-[#2e46e8] text-white"
                                : "bg-white text-[#2e46e8] "
                            }`}
                          >
                            Blogs
                          </button>
                        </li>
                      </ul>
                    </div>
                    <div className="mt-4 h-[55vh] px-2 pb-3 scrollbar-thin scrollbar-thumb-[#5552FE] scrollbar-track-blue-300 overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
                      <div className="grid grid-cols-12 gap-2">
                        {prompts.map((prompt) => {
                          if (
                            prompt.category.toLowerCase() ===
                              categories[selectedCategory] ||
                            selectedCategory === 0
                          ) {
                            return (
                              <div
                                key={prompt.id}
                                onClick={() => {
                                  setNewMessage(prompt.prompt);
                                }}
                                className="col-span-full sm:col-span-6 xl:col-span-18 bg-white  rounded-md drop-shadow-lg bdorder-[1px] border-gray-600 p-4 cursor-pointer"
                              >
                                <h1 className="text-black font-semibold">
                                  {prompt.title}
                                </h1>
                                <span className="text-gray-500 text-sm">
                                  {prompt.prompt}
                                </span>
                              </div>
                            );
                          }
                        })}
                      </div>
                    </div>
                  </div>
                )}
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
