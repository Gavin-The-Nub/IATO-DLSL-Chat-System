import { useEffect, useState, useRef } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db, auth, database } from "../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ref, push, onValue } from "firebase/database";
import "./admin.scss";

export const Admin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [userChats, setUserChats] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [reply, setReply] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const messagesEndRef = useRef(null);

  // Auto-scroll to the latest message when userChats or selectedUser changes
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [userChats, selectedUser]);

  // Fetch chats in real-time
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const unsubscribeMessages = onValue(
          ref(database, `chats`),
          (snapshot) => {
            setUserChats(snapshot.val() || {});
          }
        );
        return () => unsubscribeMessages();
      }
    });
    return () => unsubscribeAuth();
  }, []);

  // Handle user selection
  const handleSelectUser = (userId) => {
    setSelectedUser(userId);
  };

  // Handle sending a reply
  const sendReply = async (e) => {
    e.preventDefault();
    if (!reply.trim() || !selectedUser) return;
    await push(ref(database, `chats/${selectedUser}`), {
      name: auth.currentUser.displayName || "admin",
      message: reply,
      timestamp: Date.now(),
    });
    setReply(""); // Clear the reply input after sending
  };

  // Auth check
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const adminData = await getDoc(doc(db, "users", user.uid));
        if (adminData.exists() && adminData.data().role === "admin") {
          setIsLoading(false);
        } else {
          navigate("/");
        }
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Filtered user chats based on search term
  const filteredUserChats = Object.keys(userChats).filter((userId) => {
    const firstMessage = Object.values(userChats[userId])[0];
    return firstMessage?.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="admin">
      <div className="adminContainer">
        {!selectedUser && <h2 className="title">Admin Chat Panel</h2>}
        {!selectedUser ? (
          <div>
            <h3>Applicants Messages</h3>
            {/* Search input */}
            <input
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="searchInput"
            />
            {filteredUserChats
              .sort((a, b) => {
                const lastMessageA =
                  Object.values(userChats[a]).slice(-1)[0]?.timestamp || 0;
                const lastMessageB =
                  Object.values(userChats[b]).slice(-1)[0]?.timestamp || 0;
                return lastMessageB - lastMessageA; // Sort by most recent first
              })
              .map((userId) => {
                const messages = Object.values(userChats[userId]);
                const recentMessage = messages[messages.length - 1];
                const firstMessage = messages[0];
                const timeSent = recentMessage
                  ? new Date(recentMessage.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "";
                const firstMessageSender = firstMessage
                  ? firstMessage.name
                  : "Unknown";

                return (
                  <div
                    className="adminChat"
                    key={userId}
                    onClick={() => handleSelectUser(userId)}
                  >
                    <div className="l">
                      <div className="adminChatProfile">
                        <img src={recentMessage.userProfile}></img>
                      </div>
                    </div>
                    <div className="r">
                      <button>
                        <div className="first">
                          <h1>{firstMessageSender}</h1>
                        </div>
                        {recentMessage ? (
                          <div className="recent">
                            <h1>{recentMessage.name}:</h1>
                            <h2>{recentMessage.message}</h2>
                            <h3>{timeSent}</h3>
                          </div>
                        ) : (
                          <span>No messages</span>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        ) : (
          <div className="messages">
            <div className="topProf">
              <div className="prof">
                <div className="adminChatProfile">
                  <img
                    src={Object.values(userChats[selectedUser])[0]?.userProfile}
                  ></img>
                </div>
                <h3>{Object.values(userChats[selectedUser])[0]?.name}</h3>
              </div>
              <button onClick={() => setSelectedUser(null)}>
                <img src="/multiply-svgrepo-com.svg" alt="Close" />
              </button>
            </div>
            <div className="adminMessages">
              {Object.values(userChats[selectedUser]).map((msg, index) => (
                <div
                  key={index}
                  className={`message ${
                    msg.name === "admin" ? "userMessage" : ""
                  }`}
                >
                  <div className="left">
                    {msg.name === "admin" ? (
                      <div className="chatPicBox">A</div>
                    ) : (
                      <div className="adminChatProfile">
                        <img src={msg.userProfile}></img>
                      </div>
                    )}
                  </div>
                  <div className="right">
                    <div className="top">
                      <h1>{msg.name}:</h1>
                      <h3>
                        {new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </h3>
                    </div>
                    <div className="bottom">
                      <h2>{msg.message}</h2>
                    </div>
                  </div>
                </div>
              ))}
              {/* Auto-scroll reference */}
              <div ref={messagesEndRef} />
            </div>
            <div className="chatInput">
              <form onSubmit={sendReply}>
                <textarea
                  value={reply}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      sendReply(e);
                    }
                  }}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Type a reply"
                  onInput={(e) => {
                    e.target.style.height = "auto";
                    e.target.style.height = e.target.scrollHeight + "px";
                  }}
                />
                {reply && (
                  <button type="submit">
                    <img src="/arrow-up-svrepo-com.svg" alt="Send" />
                  </button>
                )}
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
