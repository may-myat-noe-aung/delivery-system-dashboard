
import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Image as ImageIcon,
  StickerIcon,
  User,
  Store,
  Truck,
  Search,
  Check,
  Smile,
  CheckCheck,
} from "lucide-react";

import photo1 from "../../assets/images/sticker/photo_1.jpg"; 
import photo2 from "../../assets/images/sticker/photo_2.jpg"; 
import photo3 from "../../assets/images/sticker/photo_3.jpg"; 
import photo4 from "../../assets/images/sticker/photo_4.jpg"; 
import photo5 from "../../assets/images/sticker/photo_5.jpg"; 
import photo6 from "../../assets/images/sticker/photo_6.jpg";
import photo7 from "../../assets/images/sticker/photo_7.jpg"; 
import photo8 from "../../assets/images/sticker/photo_8.jpg"; 
import photo9 from "../../assets/images/sticker/photo_9.jpg"; 



const TABS = [
  { id: "user", name: "Users", icon: <User size={18} /> },
  { id: "shop", name: "Shops", icon: <Store size={18} /> },
  { id: "delivery", name: "Delivery", icon: <Truck size={18} /> },
];

const CHAT_LISTS = {
  user: [
    {
      id: 1,
      name: "Aye Aye",
      avatar: "https://i.pravatar.cc/150?img=3",
      lastMsg: "Hello admin 👋",
    },
    {
      id: 2,
      name: "Myo Min",
      avatar: "https://i.pravatar.cc/150?img=4",
      lastMsg: "Thanks for your help",
    },
  ],
  shop: [
    {
      id: 1,
      name: "Sweet Night Bakery",
      avatar: "https://i.pravatar.cc/150?img=9",
      lastMsg: "New order issue",
    },
    {
      id: 2,
      name: "Golden Tea House",
      avatar: "https://i.pravatar.cc/150?img=5",
      lastMsg: "Stock update",
    },
  ],
  delivery: [
    {
      id: 1,
      name: "Ko Kyaw",
      avatar: "https://i.pravatar.cc/150?img=7",
      lastMsg: "Delivery completed!",
    },
    {
      id: 2,
      name: "Zaw Zaw",
      avatar: "https://i.pravatar.cc/150?img=8",
      lastMsg: "Need new address",
    },
  ],
};

const AdminChat = () => {
  const [activeTab, setActiveTab] = useState("user");
  const [selectedChat, setSelectedChat] = useState(CHAT_LISTS.user[0]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [search, setSearch] = useState("");
  const [showStickers, setShowStickers] = useState(false);
  const fileInputRef = useRef(null);
  const chatEndRef = useRef(null);

  const STICKERS = [photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8, photo9];

  useEffect(() => {
    if (selectedChat) {
      setMessages([
        {
          from: "client",
          type: "text",
          text: selectedChat.lastMsg,
          seen: true,
        },
        {
          from: "admin",
          type: "text",
          text: "Hi! How can I assist you?",
          seen: true,
        },
      ]);
    }
  }, [selectedChat]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const playSendSound = () => {
    const audio = new Audio(
      "https://cdn.pixabay.com/download/audio/2022/03/15/audio_3b8b6b7047.mp3?filename=pop-94319.mp3"
    );
    audio.play();
  };

  const simulateTyping = () => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "client", type: "text", text: "Okay, thank you!", seen: true },
      ]);
      setIsTyping(false);
    }, 2000);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage = {
      from: "admin",
      type: "text",
      text: input,
      seen: false,
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    playSendSound();
    simulateTyping();
    setTimeout(
      () => setMessages((prev) => prev.map((m) => ({ ...m, seen: true }))),
      1500
    );
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const newMessage = {
        from: "admin",
        type: "image",
        text: url,
        seen: false,
      };
      setMessages((prev) => [...prev, newMessage]);
      playSendSound();
      simulateTyping();
    }
  };

  const handleSendSticker = (sticker) => {
    const newMessage = {
      from: "admin",
      type: "image",
      text: sticker,
      seen: false,
      isSticker: true,
    };
    setMessages((prev) => [...prev, newMessage]);
    setShowStickers(false);
    playSendSound();
    simulateTyping();
  };

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
    setMessages([
      { from: "client", type: "text", text: chat.lastMsg, seen: true },
      {
        from: "admin",
        type: "text",
        text: "Hi! How can I assist you?",
        seen: true,
      },
    ]);
  };

  const filteredChats = CHAT_LISTS[activeTab].filter((chat) =>
    chat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-[683px] bg-gradient-to-br from-purple-50 to-pink-50 overflow-hidden rounded-2xl">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md border-r border-purple-100 rounded-tl-2xl rounded-bl-2xl ">
        <div className="h-[70px] text-lg font-semibold text-purple-600 flex items-center justify-start px-5 border-b border-purple-300 rounded-bl-2xl mb-2">
          Admin Chat
        </div>
        <ul className="space-y-2">
          {TABS.map((tab) => (
            <li
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSelectedChat(CHAT_LISTS[tab.id][0]);
              }}
              className={`flex items-center gap-2 px-5 py-3 cursor-pointer rounded-lg transition ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-600 font-medium shadow-sm"
                  : "text-gray-600 hover:bg-purple-50"
              }`}
            >
              {tab.icon}
              <span>{tab.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat List */}
      <div className="w-80 bg-white border-r  border-purple-100 flex flex-col ">
        <div className="h-[70px] border-b border-purple-300 px-3">
          {/* <div className="flex items-center bg-gradient-to-r from-purple-50 to-pink-50 rounded-full px-3 py-1 shadow-inner border border-purple-100">
            <Search size={18} className="text-purple-400 mr-2" />
            <input
              type="text"
              placeholder="Search chats..."
              className="flex-1 text-sm outline-none bg-transparent text-gray-700"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div> */}
          <div className="relative flex items-center w-full max-w-sm h-[70px]   ">
            <Search
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#B476FF]"
            />
            <input
              type="text"
              placeholder="Search chats..."
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-[#B476FF] focus:ring-2 focus:ring-[#B476FF] focus:outline-none text-sm shadow-sm"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filteredChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => handleSelectChat(chat)}
              className={`flex items-center gap-3 px-4 py-3 border-b border-purple-50 cursor-pointer transition ${
                selectedChat?.id === chat.id
                  ? "bg-gradient-to-r from-purple-50 to-pink-50"
                  : "hover:bg-purple-50"
              }`}
            >
              <img
                src={chat.avatar}
                alt={chat.name}
                className="w-10 h-10 rounded-full border-2 border-purple-200"
              />
              <div className="flex-1">
                <h4 className="font-medium text-gray-800">{chat.name}</h4>
                <p className="text-sm text-gray-500 truncate">{chat.lastMsg}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex flex-col flex-1 bg-white rounded-tr-2xl relative">
        {selectedChat && (
          <>
            {/* Header */}
            <div className="flex items-center justify-between px-6 h-[70px]  text-white border-b border-purple-300 rounded-tr-2xl rounded-br-2xl">
              <div className="flex items-center gap-3">
                <img
                  src={selectedChat.avatar}
                  alt={selectedChat.name}
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <div>
                  <h2 className="font-semibold flex items-center gap-2">
                 <div className="flex flex-col items-top justify-center gap-2">
                     <div className="font-semibold text-[#B476FF]">{selectedChat.name}</div>
                    <div>
                      {isTyping && (
                        <span className="flex gap-1 items-center">
                          <span className="size-1 bg-[#B476FF] rounded-full animate-bounce"></span>
                          <span className="size-1 bg-[#B476FF]  rounded-full animate-bounce delay-150"></span>
                          <span className="size-1 bg-[#B476FF] rounded-full animate-bounce delay-300"></span>
                          {/* <span className=" animate-bounce delay-300">typing</span> */}

                        </span>
                      )}
                    </div>
                 </div>
                  </h2>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-3 bg-purple-50/40">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex transition-all duration-300 ${
                    msg.from === "admin" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${
                      msg.type === "text"
                        ? msg.from === "admin"
                          ? "bg-[#B476FF] text-white rounded-br-none"
                          : "bg-white border border-purple-100 text-gray-800 rounded-bl-none"
                        : "bg-transparent p-0"
                    }`}
                  >
                    {msg.type === "image" ? (
                      <img
                        src={msg.text}
                        alt="sent"
                        className={`rounded-lg ${
                          msg.isSticker
                            ? "w-20 object-contain" // 👈 smaller for sticker only
                            : "w-48 object-cover" // 👈 normal for photos
                        }`}
                      />
                    ) : (
                      <p>{msg.text}</p>
                    )}
                    {msg.type === "text" && (
                      <div className="flex items-center justify-end gap-1 mt-1">
                        {msg.from === "admin" &&
                          (msg.seen ? (
                            <CheckCheck size={12} className="text-blue-200" />
                          ) : (
                            <Check size={12} className="text-gray-300" />
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef}></div>
            </div>

            {/* Sticker Picker */}
            {showStickers && (
              <div className="absolute bottom-16 left-5 bg-white border border-purple-200 rounded-2xl shadow-lg p-3 grid grid-cols-4 gap-2">
                {STICKERS.map((sticker, i) => (
                  <img
                    key={i}
                    src={sticker}
                    alt="sticker"
                    onClick={() => handleSendSticker(sticker)}
                    className="w-16 h-16 cursor-pointer hover:scale-110 transition rounded-lg"
                  />
                ))}
              </div>
            )}

            {/* Input */}
            <div className="bg-white px-5 py-3 border-t border-purple-100 flex items-center gap-3 sticky bottom-0 shadow-md rounded-br-2xl">
              <button
                onClick={() => fileInputRef.current.click()}
                className="text-gray-500 hover:text-purple-600"
              >
                <ImageIcon size={22} />
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
              />

              <button
                onClick={() => setShowStickers(!showStickers)}
                className="text-gray-500 hover:text-purple-600"
              >
                <Smile size={22} />
              </button>

              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 border border-purple-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />

              <button
                onClick={handleSend}
                className="bg-[#B476FF] text-white px-4 py-2 rounded-full hover:opacity-90 transition"
              >
                <Send size={18} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminChat;
