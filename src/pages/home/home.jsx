import { Chat } from "../chatbot/chatbot";
import { Contact } from "../contact/contact";
import { Faqs } from "../faqs/faqs";
import { Main } from "../main/main";
import { Footer } from "../footer/footer";
import { useContext } from "react";
import { ChatContext } from "../../App";
import "./home.scss";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const { isChatOpen, toggleChat } = useContext(ChatContext);
  const navigate = useNavigate();

  const handleChatButtonClick = () => {
    if (auth.currentUser) {
      toggleChat();
    } else {
      navigate("/login"); // Use navigate to go to the login page
    }
  };

  return (
    <div className="mainBackground">
      <div id="section" className="home">
        <div className="video">
          <video
            src="/k6HfHysp7mvUoBkZdUzRWJ6PdooSorMlbYvYc8bn.mp4"
            autoPlay
            loop
            playsInline
            muted
          >
            Your browser does not support video tag
          </video>
          <div className="darkLayer"></div>
          <div className="homeDetails">
            <img src="/logo.svg" className="logoHome"></img>
            <button onClick={handleChatButtonClick}>
              <a>Chat Now</a>
            </button>
          </div>
        </div>
      </div>
      <div id="mainSection">{<Main />}</div>
      <div id="section2">{<Faqs />}</div>
      <div id="section3">{<Contact />}</div>

      <button onClick={handleChatButtonClick} className="open-chat-button">
        {!isChatOpen && (
          <div className="chatButton shadow-lg">
            <img src="/chat-round-svgrepo-com.svg"></img>
            <p>Chat</p>
          </div>
        )}
      </button>

      {isChatOpen && (
        <div className="chatContainer">
          <Chat />
        </div>
      )}
      <div>
        <Footer />
      </div>
    </div>
  );
};
