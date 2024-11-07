import "./main.scss";
import { auth } from "../../config/firebase";

export const Main = () => {
  return (
    <div className="main">
      <div className="top">
        <h1>Be a Lasallian!</h1>
        <h2>Take the first step here. Discover your possibilities.</h2>
      </div>
      <div className="bottom grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <a href={auth.currentUser ? "/chat" : "/login"}>
          <div className="links">
            <div className="icon">
              <img src="/chat-dots-svgrepo-com.svg" alt="Chat Icon" />
            </div>
            <div className="text">
              <h1>CHAT</h1>
              <p>Ask about Application Process.</p>
            </div>
          </div>
        </a>

        <a href="#section2">
          <div className="links">
            <div className="icon">
              <img src="/half-star-svgrepo-com.svg" alt="FAQs Icon" />
            </div>
            <div className="text">
              <h1>FAQS</h1>
              <p>See Frequently Asked Questions</p>
            </div>
          </div>
        </a>

        <a href="#section3">
          <div className="links">
            <div className="icon">
              <img src="/phone-svgrepo-com.svg" alt="Contact Icon" />
            </div>
            <div className="text">
              <h1>CONTACT INFO</h1>
              <p>See DLSL Contact Information here</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};
