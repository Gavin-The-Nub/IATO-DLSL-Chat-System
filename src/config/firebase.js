// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // ---------- IMPORTANTT------ need to import this
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFlfCryXjO1FSfjZWA5oRpKMR_m0o4jZU",
  authDomain: "iato-dlsl.firebaseapp.com",
  projectId: "iato-dlsl",
  storageBucket: "iato-dlsl.appspot.com",
  messagingSenderId: "925310258298",
  appId: "1:925310258298:web:16e0e2e12f3318f46e3fc3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); // contains all the details of the user who logged in
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const database = getDatabase(
  app,
  "https://iato-dlsl-default-rtdb.asia-southeast1.firebasedatabase.app"
);
