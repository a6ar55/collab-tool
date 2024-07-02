// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB0BQ9G1GoSQrj5lWqTyHxxHgoaXRsKews",
  authDomain: "collab-auth-e1ca8.firebaseapp.com",
  projectId: "collab-auth-e1ca8",
  storageBucket: "collab-auth-e1ca8.appspot.com",
  messagingSenderId: "352177836952",
  appId: "1:352177836952:web:0fbc52f45460114b8951ed",
  measurementId: "G-7WW5G7X6BH"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);