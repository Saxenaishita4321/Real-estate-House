// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APT_KEY,
  authDomain: "mern-estate-34c22.firebaseapp.com",
  projectId: "mern-estate-34c22",
  storageBucket: "mern-estate-34c22.firebasestorage.app",
  messagingSenderId: "181694609567",
  appId: "1:181694609567:web:1d7e755ed49c6c77778aaa"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);