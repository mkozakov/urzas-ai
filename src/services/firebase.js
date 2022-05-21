// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB63rwRQvLlFky-_jQwB5t40ylx9Zt4S0s",
  authDomain: "magic-the-gathering-673e8.firebaseapp.com",
  projectId: "magic-the-gathering-673e8",
  storageBucket: "magic-the-gathering-673e8.appspot.com",
  messagingSenderId: "1054623001762",
  appId: "1:1054623001762:web:ff0accf86b8c1f77d0fbfb",
  measurementId: "G-QW44D7MYWG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const db = getFirestore(app);
