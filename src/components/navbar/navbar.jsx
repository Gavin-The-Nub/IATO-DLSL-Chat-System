import { Link, useLocation } from "react-router-dom";
import { auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState, useEffect } from "react";
import "./navbar.scss";

export const Navbar = () => {
  const [user] = useAuthState(auth);
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else setIsScrolled(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {location.pathname !== "/profile" &&
        location.pathname !== "/chat" &&
        location.pathname !==
          "/Y3a8jT5rL9wZ2nP1vF4bX6yC7kR5mD3sV7jN2zQ4hB9L0qG5tF7rL2xQ3pK7dW8sJ3mZ5nY6vD4tQ9Y3a8jT5rL9wZ2nP1vF4bX6yC7kR5mD3sV7jN2zQ4hB9L0qG5tF7rL2xQ3pK7dW8sJ3mZ5nY6vD4tQ9Y3a8jT5rL9wZ2nP1vF4bX6yC7kR5mD3sV7jN2zQ4hB9L0qG5tF7rL2xQ3pK7dW8sJ3mZ5nY6vD4tQ9" && (
          <div
            className="logo"
            onClick={() => {
              //window.location.reload();
            }}
          >
            <img src="/I1sDKo6avwcQsqVTrfH4rld2QTSf4Gp2gyfdj8Uy.png"></img>
          </div>
        )}

      <div className={`navbar ${isScrolled ? "Scrolled" : ""}`}>
        <div
          className="burgerContainer shadow-lg"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <div className="burger w-20 h-20 lg:w-[5vw]h-[5vw]">
            <img src="/hamburger.svg"></img>
          </div>
        </div>
        {isOpen && (
          <div className="sidebar w-screen sm:w-screen lg:w-[20vw]">
            <div className="upperSidebar">
              <div className="links2">
                {" "}
                {!user ? (
                  <Link
                    to="/login"
                    onClick={() => {
                      setIsOpen(!isOpen);
                    }}
                  >
                    Login
                  </Link>
                ) : (
                  <>
                    {location.pathname === "/profile" ? (
                      auth.currentUser.uid ===
                      "v1kfhFuXGugHJUY1yTqRgPKORUA2" ? (
                        <Link
                          to="/Y3a8jT5rL9wZ2nP1vF4bX6yC7kR5mD3sV7jN2zQ4hB9L0qG5tF7rL2xQ3pK7dW8sJ3mZ5nY6vD4tQ9Y3a8jT5rL9wZ2nP1vF4bX6yC7kR5mD3sV7jN2zQ4hB9L0qG5tF7rL2xQ3pK7dW8sJ3mZ5nY6vD4tQ9Y3a8jT5rL9wZ2nP1vF4bX6yC7kR5mD3sV7jN2zQ4hB9L0qG5tF7rL2xQ3pK7dW8sJ3mZ5nY6vD4tQ9"
                          onClick={() => {
                            setIsOpen(false);
                          }}
                        >
                          back to Admin
                        </Link>
                      ) : (
                        <Link
                          to="/"
                          onClick={() => {
                            setIsOpen(false);
                          }}
                        >
                          back to Home
                        </Link>
                      )
                    ) : (
                      <Link
                        to="/profile"
                        onClick={() => {
                          setIsOpen(false);
                        }}
                      >
                        {user.displayName || "ADMIN"}
                      </Link>
                    )}
                  </>
                )}
              </div>
              <img
                src="/ic-xmark.svg"
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              ></img>
            </div>
            <div className="bottomSidebar ml-10">
              <div>
                <ul>
                  {location.pathname === "/faqs" ? (
                    <li>
                      <Link to="/" onClick={() => setIsOpen(false)}>
                        Back to Home
                      </Link>
                    </li>
                  ) : (
                    location.pathname === "/" && (
                      <>
                        {isScrolled && (
                          <li>
                            {location.pathname === "/" ? (
                              <>
                                <a href="#section">Home</a>
                                <a className="arrow" href="#section">
                                  {" "}
                                  &#8594;
                                </a>
                              </> // Scrolling to section if on home page
                            ) : (
                              location.pathname === "/faqs" ||
                              (location.pathname === "/" && (
                                <Link to="/">Home</Link>
                              )) // Redirecting to homepage if not
                            )}
                          </li>
                        )}
                        <li>
                          {user && location.pathname !== "/faqs" && (
                            <>
                              <a href="#section1">Chat</a>{" "}
                              <a href="#section1" className="arrow">
                                {" "}
                                &#8594;
                              </a>
                            </>
                          )}
                        </li>
                        <li>
                          {user && location.pathname !== "/faqs" && (
                            <>
                              <a href="#section2">FAQs</a>
                              <a href="#section2" className="arrow">
                                {" "}
                                &#8594;
                              </a>
                            </>
                          )}
                        </li>
                        <li>
                          {user && location.pathname !== "/faqs" && (
                            <>
                              <a href="#section3">Contacts</a>
                              <a href="#section3" className="arrow">
                                {" "}
                                &#8594;
                              </a>
                            </>
                          )}
                        </li>
                      </>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
