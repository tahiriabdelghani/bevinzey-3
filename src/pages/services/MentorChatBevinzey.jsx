import React, { useEffect, useState } from "react";
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
import Chat from "../../components/Chat";
import { setMessage } from "../../redux/message";
function MentorChatBevinzey() {
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
            "https://plankton-app-q74hx.ondigitalocean.app/ai-services/gpt/ChatBevinzey/mentor",
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
        "https://plankton-app-q74hx.ondigitalocean.app/ai-services/create/chat/mentor",
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
            "https://plankton-app-q74hx.ondigitalocean.app/ai-services/gpt/ChatBevinzey/mentor",
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
        "https://plankton-app-q74hx.ondigitalocean.app/ai-services/create/chat/mentor",
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
        "https://plankton-app-q74hx.ondigitalocean.app/ai-services/user/chats/mentor/" +
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
        "https://plankton-app-q74hx.ondigitalocean.app/ai-services/delete/chats/user/mentor/" +
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

        <main className="big-div scrollbar-thin scrollbar-thumb-[#4b5462] scrollbar-track-gray-300 overflow-y-scroll">
          <div className="relative flex h-full">
            <div className="min-w-[140px] md:min-w-[200px]">
              <div className="flex flex-col justify-between h-[calc(100vh-111px)]  justify-evenly  min-w-[140px] md:min-w-[200px] bg-white fixed">
                <div className="small-div flex justify-center py-4 border-b-2 border-[#4b5462]">
                  <button
                    onClick={createNewChat}
                    className="text-[#4b5462] text-sm mx-1 border-2 border-[#4b5462] py-[2px] px-2 flex items-center rounded"
                  >
                    <AiOutlinePlusCircle className="mr-2" /> Start new chat{" "}
                  </button>
                </div>
                {chats.length > 0 ? (
                  <>
                    <div className="big-div scrollbar-thin scrollbar-thumb-[#4b5462] scrollbar-track-gray-300 overflow-y-scroll">
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
                            selectedChat={selectedChat}
                            chat={chat}
                          />
                        ))}
                    </div>
                    <div className="small-div py-4  border-[#4b5462]">
                      {!clear ? (
                        <button
                          onClick={() => {
                            setClear(true);
                          }}
                          className="text-[red] m-auto border-2 border-[red] py-[2px] px-5 flex items-center rounded"
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
                            className="text-[red] border-2 p-2 border-[red]  text-center mx-2 flex items-center rounded"
                          >
                            <BsFillTrashFill size={14} />
                          </button>
                          <button
                            onClick={() => {
                              setClear(false);
                            }}
                            className="text-[green] border-2 p-2 border-[green] text-center mx-2 flex items-center rounded"
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
                <div className="small-div flex justify-center py-4 border-t-2 border-gray-400">
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
              </div>
            </div>
            <div className="grow flex flex-col justify-between h-full md:translate-x-0 transition-transform duration-300 ease-in-out translate-x-0">
              <div className="big-div">
                <MessagesBody messages={messages} loading={loading} />
              </div>
              <div className="small-div sticky bottom-0">
                <MessagesFooter
                  setNewMessage={setNewMessage}
                  newMessage={newMessage}
                  sendMessage={sendMessage}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default MentorChatBevinzey;
