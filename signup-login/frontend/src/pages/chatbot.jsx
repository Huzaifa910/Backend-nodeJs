import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/chatbot.css";
import { formatAIResponse } from "../utils/formatAIResponse";


const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5500";

  const quickSuggestions = [
    "Hello 👋",
    "What is JavaScript?",
    "Explain React hooks",
    "Tell me a programming joke",
  ];

  // auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const userMessage = {
      id: crypto.randomUUID(),
      sender: "user",
      text: messageText,
      time: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first");
        navigate("/login");
        return;
      }

      const res = await axios.post(
        `${API_URL}/api/chatbot`,
        { message: messageText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

    //   console.log("API RESPONSE:", res.data);
// console.log("FULL RESPONSE:", res);
// console.log("DATA:", res.data.ai);

const botMessage = {
  id: crypto.randomUUID(),
  sender: "bot",
  text: formatAIResponse(res.data.ai),
  time: new Date(),
};

setMessages((prev) => [...prev, botMessage]);


// console.log(res.data.ai)
console.log("botMessage" , botMessage)

// setMessages(prev => [...prev, botMessage]);

    } catch (err) {
      console.error(err);

      const errorMsg = {
        id: crypto.randomUUID(),
        sender: "bot",
        text: "⚠️ Something went wrong. Please try again.",
        time: new Date(),
      };

      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className={styles.chatbotContainer}>
      <div className={styles.chatWindow}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.title}>
            🤖 Gemini AI Assistant
          </div>
          <button onClick={() => navigate("/dashboard")} className={styles.backBtn}>
            Back
          </button>
        </div>

        {/* Suggestions */}
        <div className={styles.suggestions}>
          {quickSuggestions.map((q, i) => (
            <button key={i} onClick={() => sendMessage(q)}>
              {q}
            </button>
          ))}
        </div>

        {/* Messages */}
        <div className={styles.messages}>
          {messages.length === 0 && (
            <div className={styles.empty}>
              Start chatting with AI 🤖
            </div>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`${styles.message} ${
                msg.sender === "user"
                  ? styles.userMessage
                  : styles.botMessage
              }`}
            >
              <div className={styles.bubble}>{msg.text}</div>
              <span className={styles.time}>
                {new Date(msg.time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          ))}

          {loading && (
            <div className={`${styles.message} ${styles.botMessage}`}>
              <div className={styles.bubble}>Typing...</div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className={styles.inputBox}>
          <textarea
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={() => sendMessage()} disabled={loading}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
