import "./profile.scss";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";
import "./profile.scss";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const signUserOut = () => {
    signOut(auth);
    navigate("/");
  };

  return (
    <div className="user">
      {user && (
        <div className="userInfo">
          <img
            src={user?.photoURL || "/blank-profile-picture-973460_1280.webp"}
            width="20"
            height="20"
          ></img>
          <p>{user?.displayName}</p>
          <p>{user?.email}</p>
          <p>{user?.phoneNumber}</p>
          <button onClick={signUserOut}>Logout</button>
        </div>
      )}
    </div>
  );
};
