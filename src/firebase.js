import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your config
const firebaseConfig = {
  apiKey: "AIzaSyC7FF36MmVtRarOWQEN2H0kOynM6oSNvkc",
  authDomain: "gundeep-2acc1.firebaseapp.com",
  projectId: "gundeep-2acc1",
  storageBucket: "gundeep-2acc1.firebasestorage.app",
  messagingSenderId: "820672322024",
  appId: "1:820672322024:web:b531ff73ed4122d57bac5d",
  measurementId: "G-8NWDHDYK44"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔥 Exports
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();