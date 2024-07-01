// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-3158b.firebaseapp.com",
  projectId: "mern-blog-3158b",
  storageBucket: "mern-blog-3158b.appspot.com",
  messagingSenderId: "988243965239",
  appId: "1:988243965239:web:e05e65e6df9bc990bdd6b2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);