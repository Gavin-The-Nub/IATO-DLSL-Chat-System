import "./App.scss";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Login } from "./pages/login/login";
import { Home } from "./pages/home/home";
import { Navbar } from "./components/navbar/navbar";
import { Profile } from "./pages/profile/profile";
import { FaqsMain } from "./pages/faqs/faqsMain/faqsMain";
import { Admin } from "./pages/admin/admin";
import { Chat } from "./pages/chatbot/chatbot";
import { createContext, useState } from "react";
export const ChatContext = createContext();
function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };
  return (
    <ChatContext.Provider value={{ isChatOpen, toggleChat }}>
      {" "}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/faqs" element={<FaqsMain />}></Route>
          <Route
            path="/Y3a8jT5rL9wZ2nP1vF4bX6yC7kR5mD3sV7jN2zQ4hB9L0qG5tF7rL2xQ3pK7dW8sJ3mZ5nY6vD4tQ9Y3a8jT5rL9wZ2nP1vF4bX6yC7kR5mD3sV7jN2zQ4hB9L0qG5tF7rL2xQ3pK7dW8sJ3mZ5nY6vD4tQ9Y3a8jT5rL9wZ2nP1vF4bX6yC7kR5mD3sV7jN2zQ4hB9L0qG5tF7rL2xQ3pK7dW8sJ3mZ5nY6vD4tQ9"
            element={<Admin />}
          ></Route>
          <Route path="/chat" element={<Chat />}></Route>
        </Routes>
      </Router>{" "}
    </ChatContext.Provider>
  );
}

export default App;
