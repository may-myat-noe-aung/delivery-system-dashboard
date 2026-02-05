import React, { useState } from "react";
import {
  Bell,
  LogOut,
  MessageCircleMore,
  Search,
  Send,
  Settings,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "./ThemeProvider";

const Header = () => {
  const { dark, toggleTheme } = useTheme();

  const [search, setSearch] = useState("");
  const [showMessages, setShowMessages] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const [activeChat, setActiveChat] = useState({
    group: "Customers",
    name: "May",
  });

  const users = {
    Customers: ["May", "Customer B", "Customer C"],
    Shopkeepers: ["Shopkeeper X", "Shopkeeper Y"],
    Delivery: ["Delivery Man 1", "Delivery Man 2", "Delivery Man 3"],
  };

  const [chats, setChats] = useState({
    May: [{ from: "May", text: "Hello Admin!", self: false }],
    "Customer B": [],
    "Customer C": [],
    "Shopkeeper X": [],
    "Shopkeeper Y": [],
    "Delivery Man 1": [],
    "Delivery Man 2": [],
    "Delivery Man 3": [],
  });

  const [newMessage, setNewMessage] = useState("");
  const [recipientSearch, setRecipientSearch] = useState("");

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    setChats((prev) => ({
      ...prev,
      [activeChat.name]: [
        ...(prev[activeChat.name] || []),
        { from: "Admin", text: newMessage, self: true },
      ],
    }));
    setNewMessage("");
  };

  const [notifications] = useState([
    { id: 1, type: "Order", text: "New order #101 received 🍔" },
    { id: 2, type: "Payment", text: "Payment confirmed 💳" },
  ]);

  return (
    <>
      {/* HEADER */}
      <header
        className="
          flex items-center justify-between py-3 px-4 w-full relative rounded-full
          bg-white dark:bg-gray-800
          text-gray-800 dark:text-gray-100
          shadow-sm
        "
      >
        {/* Search */}
        <div className="relative flex items-center w-full max-w-sm">
          <Search className="absolute left-3 h-4 w-4 text-gray-500 dark:text-gray-300" />
          <input
            type="text"
            placeholder="Search dashboard..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              pl-9 pr-3 py-2 rounded-full w-full text-sm
              bg-gray-100 dark:bg-gray-700
              text-gray-800 dark:text-gray-100
              placeholder-gray-500 dark:placeholder-gray-300
              focus:ring-0 focus:outline-none
            "
          />
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          {/* THEME TOGGLE */}
          <button
            onClick={toggleTheme}
            className="
              p-2 rounded-full
              bg-gray-100 dark:bg-gray-700
              hover:bg-gray-200 dark:hover:bg-gray-600
            "
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* MESSAGES */}
          <div className="relative">
            <button
              onClick={() => {
                setShowMessages(!showMessages);
                setShowNotifications(false);
                setShowProfile(false);
              }}
              className="border rounded-full p-1.5 border-[#B476FF]"
            >
              <MessageCircleMore className="w-4 h-4 text-[#B476FF]" />
            </button>

            {showMessages && (
              <div className="absolute right-0 mt-2 w-[600px] h-[420px] bg-white dark:bg-gray-800 shadow-lg rounded-lg flex z-20">
                {/* LEFT */}
                <div className="w-1/3 border-r dark:border-gray-700 p-2">
                  <input
                    placeholder="Search recipient..."
                    value={recipientSearch}
                    onChange={(e) => setRecipientSearch(e.target.value)}
                    className="w-full mb-2 px-2 py-1 text-xs rounded bg-gray-100 dark:bg-gray-700"
                  />
                  {Object.keys(users).map((group) => (
                    <div key={group}>
                      <p className="text-xs font-bold text-gray-500 dark:text-gray-400">
                        {group}
                      </p>
                      {users[group]
                        .filter((n) =>
                          n.toLowerCase().includes(recipientSearch.toLowerCase())
                        )
                        .map((name) => (
                          <button
                            key={name}
                            onClick={() => setActiveChat({ group, name })}
                            className={`block w-full text-left px-2 py-1 rounded text-sm ${
                              activeChat.name === name
                                ? "bg-[#B476FF] text-white"
                                : "hover:bg-gray-100 dark:hover:bg-gray-700"
                            }`}
                          >
                            {name}
                          </button>
                        ))}
                    </div>
                  ))}
                </div>

                {/* CHAT */}
                <div className="w-2/3 flex flex-col">
                  <div className="flex-1 p-3 overflow-y-auto space-y-2">
                    {chats[activeChat.name]?.map((msg, i) => (
                      <div
                        key={i}
                        className={`flex ${
                          msg.self ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`px-3 py-2 rounded-lg text-sm max-w-[70%] ${
                            msg.self
                              ? "bg-[#B476FF] text-white"
                              : "bg-gray-200 dark:bg-gray-700"
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-2 border-t dark:border-gray-700 flex gap-2">
                    <input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1 px-3 py-2 rounded bg-gray-100 dark:bg-gray-700"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="bg-[#B476FF] text-white px-3 rounded"
                    >
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* NOTIFICATIONS */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowMessages(false);
                setShowProfile(false);
              }}
              className="border rounded-full p-1.5 border-[#B476FF]"
            >
              <Bell className="w-4 h-4 text-[#B476FF]" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-3">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
                  >
                    {n.text}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* PROFILE */}
          <div className="relative">
            <button
              onClick={() => {
                setShowProfile(!showProfile);
                setShowMessages(false);
                setShowNotifications(false);
              }}
              className="flex items-center gap-2"
            >
              <img
                className="w-9 h-9 rounded-full"
                src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2"
              />
              <div>
                <p className="text-sm font-bold text-[#B476FF]">
                  Su Su Khin
                </p>
                <p className="text-xs text-[#B476FF]">Admin</p>
              </div>
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-2">
                <button className="flex gap-2 p-2 w-full hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Settings size={16} /> Settings
                </button>
                <button className="flex gap-2 p-2 w-full text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
