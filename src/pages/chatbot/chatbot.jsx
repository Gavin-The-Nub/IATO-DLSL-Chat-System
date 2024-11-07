import { useEffect, useState } from "react";
import "./chatbot.scss";
import { onValue, push, ref } from "firebase/database";
import { auth, database } from "../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useContext, useRef } from "react";
import { ChatContext } from "../../App";
import { useLocation } from "react-router-dom";

export const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { isChatOpen, toggleChat } = useContext(ChatContext);
  const [suggestions, setSuggestions] = useState([]);
  const messagesEndRef = useRef(null);
  const location = useLocation();
  const isFullScreenChat = location.pathname === "/chat";

  const allSuggestions = [
    "Pogi ba ako?",
    "Ano ang tagalog sa jupiter?",
    "Sino pinaka malakas mag valo?",
    "Ano magandang gupit?",
    "Are you racist?",
  ];

  const suggestionResponses = {
    "Pogi ba ako?": "Oo, Muka kang burat! (this is auto response)",
    "Ano ang tagalog sa jupiter?": "Kupal kaba?. (this is auto response)",
    "Sino pinaka malakas mag valo?":
      "Tinatanong paba yan, sympre yung gumawa neto. (this is auto response)",
    "Ano magandang gupit?":
      "V-cut bagay sayo, para di ka mag mukhang talong! (this is auto response)",
    "Are you racist?":
      "Yes, because sometimes we need to be fast to win in life! (this is auto response)",
  };

  const generateSuggestions = (input) => {
    if (!input) {
      return [];
    }
    return allSuggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(input.toLowerCase())
    );
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const unsubscribeMessages = onValue(
          ref(database, `chats/${user.uid}`),
          (snapshot) => {
            const data = snapshot.val();
            const messagesArray = data ? Object.values(data) : [];
            setMessages(messagesArray);
          }
        );
        // Cleanup the listener on unmount
        return () => unsubscribeMessages();
      }
    });
    // Cleanup auth listener on unmount
    return () => unsubscribeAuth();
  }, []);

  const sendMessage = async (e, msg) => {
    if (e) e.preventDefault();
    const user = auth.currentUser;
    const messageToSend = msg || message;
    if (user && messageToSend.trim()) {
      console.log("sending msg");
      await push(ref(database, `chats/${user.uid}`), {
        name: user.displayName,
        message: messageToSend.trim(),
        timestamp: Date.now(),
        userProfile: user.photoURL,
      });
      setMessage("");
      setSuggestions([]);

      // Check if there's an auto-response for the suggestion
      if (suggestionResponses[messageToSend.trim()]) {
        await push(ref(database, `chats/${user.uid}`), {
          name: "admin",
          message: suggestionResponses[messageToSend.trim()],
          timestamp: Date.now(),
        });
      }
    }
  };

  return (
    <div className={`chat ${isFullScreenChat ? "fullscreen-chat" : ""}`}>
      <div className="container">
        <div className="chatProfile">
          <div className="chatPic">A</div>
          <h1>ADMIN</h1>
          <button className="fs">
            <a href={isFullScreenChat ? "/" : "/chat"}>
              <img src="/fullscreen-svgrepo-com.svg"></img>
            </a>
          </button>
          <button onClick={toggleChat} className="exit">
            <a href={isFullScreenChat && "/"}>
              <img src="/multiply-svgrepo-com.svg"></img>
            </a>
          </button>
        </div>

        <div className="messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chatbox ${msg.name !== "admin" ? "userMessage" : ""}`}
            >
              <div className="left">
                {msg.name !== "admin" ? (
                  <img src={auth.currentUser.photoURL}></img>
                ) : (
                  <div className="chatPicBox">A</div>
                )}
              </div>
              <div className="right">
                <div className="up">
                  <h1>{msg.name}</h1>
                  <h3>
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </h3>
                </div>
                <div className="down">
                  <h2>{msg.message}</h2>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} /> {/* Reference for auto-scroll */}
        </div>

        <div className="chatInput">
          <form onSubmit={sendMessage}>
            <textarea
              rows="1"
              value={message}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              onChange={(e) => {
                setMessage(e.target.value);
                setSuggestions(generateSuggestions(e.target.value));
                console.log(suggestions);
              }}
              placeholder="Message..."
              onInput={(e) => {
                e.target.style.height = "auto"; // Reset the height
                e.target.style.height = e.target.scrollHeight + "px"; // Set to scroll height
              }}
            />
            <div className="suggestions">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="suggestion"
                  onClick={() => {
                    setMessage(suggestion); // Set clicked suggestion as the message
                    setSuggestions([]); // Clear suggestions after selecting one
                    sendMessage(null, suggestion);
                  }}
                >
                  {suggestion}
                </div>
              ))}
            </div>
            {message && (
              <button type="submit">
                <img src="/arrow-up-svgrepo-com.svg" />
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
