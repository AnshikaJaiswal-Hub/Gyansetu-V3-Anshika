import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoExpandOutline } from "react-icons/io5";
import { Send } from "lucide-react";

const MiniChatbot = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Ask me anything!", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSend = () => {
    if (input.trim()) {
      // Combine user and bot messages in a single state update
      setMessages((prev) => [
        ...prev,
        { id: prev.length + 1, text: input, sender: "user" },
        { id: prev.length + 2, text: `Echo: ${input}`, sender: "bot" },
      ]);
      setInput("");

      // Convert messages to the format expected by MainChatbot
      const mainChatbotMessages = [
        ...messages,
        { id: messages.length + 1, text: input, sender: "user" },
        { id: messages.length + 2, text: `Echo: ${input}`, sender: "bot" }
      ].map(msg => ({
        id: msg.id,
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text,
        timestamp: new Date().toISOString()
      }));
      
      // Store messages in localStorage
      localStorage.setItem('chatbotMessages', JSON.stringify(mainChatbotMessages));
      
      // Navigate to main chatbot
      navigate('/chatbot');
    }
  };

  return (
    <div className="w-[400px] h-[425px] bg-gradient-to-r from-violet-300 to-violet-200 rounded-2xl shadow-[0_0_15px_rgba(147,51,234,0.4)] flex flex-col animate-pulse-slow transition-all duration-300 hover:shadow-[0_0_30px_rgba(147,51,234,0.8)] hover:scale-105">
      {/* Header with Title and Expand Icon */}
      <div className="flex items-center justify-between px-4 py-2 rounded-2xl">
        <span className="font-medium text-gray-700">Your AI Chatbot</span>
        <button onClick={() => navigate('/chatbot')}>
          <IoExpandOutline
            className="text-gray-600 hover:text-purple-700 cursor-pointer"
            size={20}
          />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] p-2 rounded-lg ${
                msg.sender === "user"
                  ? "bg-purple-500 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Image in the Middle, Shifted Upward */}
      <div className="flex justify-center py-2">
        <img
          src="/gyansetu.png"
          alt="Chatbot Image"
          className="w-[150px] h-[150px] object-cover rounded-full transform -translate-y-20"
        />
      </div>

      {/* Input Area */}
      <div className="p-4">
        <div className="flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            className="flex-1 p-2 rounded-xl bg-white focus:outline-none focus:border-purple-500 text-sm"
          />
          <button
            onClick={handleSend}
            className="bg-violet-500 text-white p-2 md:p-3 rounded-full md:ml-2 order-4 md:order-none"
          >
            <Send className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MiniChatbot;
