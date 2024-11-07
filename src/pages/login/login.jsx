import { auth, provider } from "../../config/firebase";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import "./login.scss";
import { useState } from "react";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const addUserToFirebase = async (user) => {
    await setDoc(doc(db, "users", user.uid), {
      role: "user",
      name: user.displayName,
      id: user.uid,
      userProfile: user.photoURL,
    });
  };

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    navigate("/");
    addUserToFirebase(user);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists() && userDoc.data().role === "admin") {
        navigate(
          "/Y3a8jT5rL9wZ2nP1vF4bX6yC7kR5mD3sV7jN2zQ4hB9L0qG5tF7rL2xQ3pK7dW8sJ3mZ5nY6vD4tQ9Y3a8jT5rL9wZ2nP1vF4bX6yC7kR5mD3sV7jN2zQ4hB9L0qG5tF7rL2xQ3pK7dW8sJ3mZ5nY6vD4tQ9Y3a8jT5rL9wZ2nP1vF4bX6yC7kR5mD3sV7jN2zQ4hB9L0qG5tF7rL2xQ3pK7dW8sJ3mZ5nY6vD4tQ9"
        );
      }
    } catch (err) {
      console.log(setError(err.message));
    }
  };

  return (
    <div className="loginBtn">
      <button
        type="button"
        className="login-with-google-btn"
        onClick={signInWithGoogle}
      >
        Sign in with Google
      </button>
      <div className="or">OR</div>
      <div className="adminLogin">
        <p>Login as an Admin</p>
        <form onSubmit={handleLogin}>
          <input
            placeholder="email"
            required
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleLogin();
              }
            }}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
          <input
            placeholder="password"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
          <button type="submit">Login</button>
          {error && <p>Wrong email and password</p>}
        </form>
      </div>
    </div>
  );
};
