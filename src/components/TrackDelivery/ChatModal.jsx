

import React, { useState } from "react";
import { Send } from "lucide-react";

const ChatModal = ({ open, onClose, user, messages, onSend }) => {
  const [newMessage, setNewMessage] = useState("");

  if (!open || !user) return null;

  const handleSend = () => {
    if (!newMessage.trim()) return;
    onSend(newMessage);
    setNewMessage("");
  };

  // Handle pressing Enter key
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // prevent newline
      handleSend();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white w-[400px] h-[500px] rounded-2xl shadow-lg flex flex-col">
        {/* Header with profile photo */}
        <div className="flex items-center gap-3 p-4 border-b">
          <img
            src={user.profile}
            alt={user.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <h2 className="font-semibold text-[#B476FF]">Chat with {user.name}</h2>
          <button
            onClick={onClose}
            className="ml-auto text-gray-500 hover:text-black"
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 text-sm">
          {(messages[user.id] || []).map((msg, idx) => (
            <div
              key={idx}
              className={`p-2 rounded-lg max-w-[70%] ${
                msg.sender === "admin"
                  ? "bg-[#B476FF] text-white ml-auto"
                  : "bg-gray-200 text-gray-900"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input */}
     
          <div className="p-3 border-t flex gap-2">
          <input
            type="text"
            value={newMessage}
            onKeyDown={handleKeyPress}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 border rounded-full px-3 py-2 text-sm"
            placeholder="Type a message..."
          />
          <button
            onClick={handleSend}
            className="bg-[#B476FF] text-white px-4 rounded-full flex items-center"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;


