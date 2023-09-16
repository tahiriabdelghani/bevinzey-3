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
import { BsFillFileEarmarkFill } from "react-icons/bs";
import { AiFillCloseCircle, AiOutlineLink } from "react-icons/ai";
import Swal from "sweetalert2";
import AWS from "aws-sdk";
import infinity from "../../images/Infinity.svg";
function FileChatBevinzey() {
  const { user } = useSelector((state) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  const [messages, setMessages] = useState([]);
  const getMessages = () => {
    selectedChat !== null &&
      axios
        .get("https://api.bevinzey.com/ai-services/chat/" + selectedChat)
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
        .post("https://api.bevinzey.com/ai-services/gpt/ChatBevinzey/pdf", {
          userId: user.id,
          chatId: selectedChat,
          prompt: msg,
        })
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
  };

  const createNewChatAndUploadFiles = () => {
    axios
      .post("https://api.bevinzey.com/ai-services/create/chat/pdf", {
        userId: user.id,
      })
      .then(async (res) => {
        getChats();
        setSelectedChat(res.data.id);
        if (links.length === 0 && files.length === 0) {
          Swal.fire({
            icon: "info",
            title: "Please add at least one file or link",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          setUploadLoading(true);
          let uploadedFiles = [];
          if (files.length > 0) {
            console.log("*********** UPLOADING FILES ***********");
            for (let i = 0; i < files.length; i++) {
              const response = await uploadFile(files[i]);
              if (response.success) {
                uploadedFiles = [...uploadedFiles, response.link];
              }
            }
          }
          console.log("ALL FILES UPLOADED SUCCESSFULLY", uploadFiles);
          console.log("************ SENDING FILES LINKS TO BACKEND ********", [
            ...uploadedFiles,
            ...links,
          ]);
          axios
            .post("https://api.bevinzey.com/ai-services/upload/pdfs/chat", {
              pdfs: [...uploadedFiles, ...links],
              chatId: res.data.id,
            })
            .then((res) => {
              console.log("SUCCESS!!!");
              setUploadLoading(false);
              setFileUploaded(true);
              console.log(res);
              Swal.fire({
                icon: "success",
                title: "File(s) uploaded successfully.",
                showConfirmButton: false,
                timer: 1500,
              });
            })
            .catch((err) => {
              setUploadLoading(false);
              Swal.fire({
                icon: "error",
                title: "There was an error uploady file(s), please try again.",
                showConfirmButton: false,
                timer: 1500,
              });
              console.log(err);
            });
        }
      });
  };

  const createNewChat = async () => {
    await axios
      .post("https://api.bevinzey.com/ai-services/create/chat/pdf", {
        userId: user.id,
      })
      .then((res) => {
        getChats();
        setSelectedChat(res.data.id);
        setFileUploaded(res.data.upload_pdf);
      });
  };

  const [chats, setChats] = useState([]);
  const getChats = () => {
    axios
      .get("https://api.bevinzey.com/ai-services/user/chats/pdf/" + user.id)
      .then((res) => {
        setChats(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [selectedChat, setSelectedChat] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false);

  useEffect(() => {
    getChats();
  }, []);

  useEffect(() => {
    getMessages();
    resetForm();
  }, [selectedChat]);

  const [clear, setClear] = useState(false);

  const clearChat = () => {
    axios
      .get(
        "https://api.bevinzey.com/ai-services/delete/chats/user/pdf/" + user.id
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

  const [files, setFiles] = useState([]);
  const [link, setLink] = useState("");
  const [links, setLinks] = useState([]);
  const fileInputRef = useRef(null);
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };



  const getFileExtension = (filename) => {
    return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
  };
  const handleFileChange = (event) => {
    const totalFiles = links.length + files.length + event.target.files.length;
    if (totalFiles > 10) {
      Swal.fire({
        icon: "info",
        title: "Please add at least one file or link",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      const selectedFiles = event.target.files;
      let renamedFiles = [];
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const timestamp = Date.now();
        const reader = new FileReader();

        reader.onload = () => {
          const fileContent = reader.result;
          const fileExtension = getFileExtension(file.name); // Get the file extension
          
          const renamedFile = new File(
            [fileContent],
            `doc_${timestamp}${i}.${fileExtension}`, // Use the extracted extension here
            {
              type: file.type,
              originalName: file.name, // Store the original name here
            }
          );
          
          renamedFiles.push(renamedFile);
        
          if (renamedFiles.length === selectedFiles.length) {
            setFiles([...files, ...renamedFiles]);
          }
        };
        
        
        

        reader.readAsArrayBuffer(file);
      }
    }
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const addLink = (e) => {
    e.preventDefault();
    if (link !== "") {
      const totalFiles = links.length + files.length;
      if (totalFiles < 3) {
        setLinks([...links, link]);
        setLink("");
      } else {
        Swal.fire({
          icon: "info",
          title: "The maximum number of links and files is 3",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  const removeLink = (index) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const uploadFiles = async () => {
    if (selectedChat == null) {
      createNewChatAndUploadFiles();
    } else {
      if (links.length === 0 && files.length === 0) {
        Swal.fire({
          icon: "info",
          title: "Please add at least one file or link",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        setUploadLoading(true);
        let uploadedFiles = [];
        if (files.length > 0) {
          console.log("*********** UPLOADING FILES ***********");
          for (let i = 0; i < files.length; i++) {
            const response = await uploadFile(files[i]);
            if (response.success) {
              uploadedFiles = [...uploadedFiles, response.link];
            }
          }
        }
        console.log("ALL FILES UPLOADED SUCCESSFULLY", uploadFiles);
        console.log(
          "************ SENDING FILES LINKS TO BACKEND ********",
          [...uploadedFiles, ...links],
          selectedChat
        );
        axios
          .post("https://api.bevinzey.com/ai-services/upload/pdfs/chat", {
            pdfs: [...uploadedFiles, ...links],
            chatId: selectedChat,
          })
          .then((res) => {
            console.log("SUCCESS!!!");
            setUploadLoading(false);
            setFileUploaded(true);
            console.log(res);
            Swal.fire({
              icon: "success",
              title: "File(s) uploaded successfully",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((err) => {
            setUploadLoading(false);
            Swal.fire({
              icon: "error",
              title: "There was an error uploady file(s), please try again.",
              showConfirmButton: false,
              timer: 1500,
            });
            console.log(err);
          });
      }
    }
  };

  const uploadFile = async (file) => {
    const S3_BUCKET = "bevinzey-storage";
    const REGION = "eu-west-3";

    AWS.config.update({
      accessKeyId: "AKIAWBNV3LKWQPMJGBUY",
      secretAccessKey: "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",
    });
    const s3 = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });

    const params = {
      Bucket: S3_BUCKET,
      Key: file.name,
      Body: file,
    };

    try {
      console.log("uploading file");
      await s3.putObject(params).promise();
      const fileLink = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${file.name}`;
      console.log(fileLink);
      console.log("File uploaded successfully.");
      return {
        success: true,
        link: fileLink,
      };
    } catch (error) {
      console.error("Error uploading file:", error);
      return {
        success: false,
      };
    }
  };

  const resetForm = () => {
    setFiles([]);
    setLinks([]);
    setLink("");
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
                                  setFileUploaded(chat.upload_pdf);
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
                {fileUploaded ? (
                  <MessagesBody messages={messages} loading={loading} />
                ) : (
                  <div>
                    <div className="w-[90%] md:w-[50%] m-auto mt-8">
                      <label>Select your files:</label>
                      <button
                        className="mt-1 w-full border-2 border-orange-400 text-orange-500 hover:text-orange-600 bg-white py-2 px-4 rounded"
                        onClick={handleButtonClick}
                      >
                        Choose Files
                      </button>
                      <input
                        type="file"
                        accept="application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, text/plain, text/html"
                        multiple
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleFileChange}
                      />
                      <div className="mt-3">
                        {files.map((file, index) => (
                          <div className="relative mb-1.5 flex items-center pr-10 h-[40px] bg-gray-300 text-gray-600 rounded">
                            <BsFillFileEarmarkFill className="mr-2 h-full text-white rounded-l px-2.5 bg-orange-500 min-w-[40px]" />
                            <span className="truncate overflow-ellipsis">
                              {file.originalName}
                            </span>
                            <span
                              onClick={() => {
                                removeFile(index);
                              }}
                              className="absolute right-3 text-red-500 cursor-pointer"
                            >
                              <AiFillCloseCircle />
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="w-[90%] md:w-[50%] m-auto mt-4">
                      <label className="">Links:</label>
                      <form
                        onSubmit={addLink}
                        className="mt-2 flex items-center"
                      >
                        <input
                          type="text"
                          value={link}
                          onChange={(e) => {
                            setLink(e.target.value);
                          }}
                          placeholder="Add a link"
                          className="border-2 text-black border-orange-400 focus:border-orange-500 rounded p-2 w-full h-[35px]"
                        />
                        <div
                          type="submit"
                          onClick={addLink}
                          className="text-2xl rounded bg-orange-500 px-3 py-0 h-[35px] ml-3 cursor-pointer"
                        >
                          +
                        </div>
                      </form>
                    </div>
                    <div className="w-[90%] md:w-[50%] m-auto mt-4">
                      {links.map((link, index) => (
                        <div className="flex items-center mb-1.5">
                          <div className="relative w-full bg-white pl-3 pr-10 py-1 flex items-center rounded-full text-blue-600 italic">
                            <AiOutlineLink className="mr-1 min-w-[16px]" />{" "}
                            <span className="truncate overflow-ellipsis">
                              {link}
                            </span>
                            <span
                              onClick={() => {
                                removeLink(index);
                              }}
                              className="absolute right-3 text-red-500 cursor-pointer"
                            >
                              <AiFillCloseCircle />
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="w-[90%] md:w-[50%] m-auto">
                      <button
                        disabled={files.length + links.length === 0}
                        onClick={uploadFiles}
                        className="mt-4 mb-8 btn-sm float-right
                        bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600
                        text-white px-5 py-2 border-2  rounded-lg hover:bg-orange-700"
                      >
                        Upload
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="small-div sticky bottom-0">
                <MessagesFooter
                  disabled={selectedChat == null || !fileUploaded}
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
      {uploadLoading && (
        <div className="absolute w-[40%] flex flex-col left-[50%] -translate-x-[50%] -translate-y-[50%] top-[50%]">
          <img src={infinity} className="w-[40%] m-auto" />
        </div>
      )}
    </div>
  );
}

export default FileChatBevinzey;
