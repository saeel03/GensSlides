// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDe309iQQAhTtTZ0kB6ZHSdjlIa91DI6OY",
  authDomain: "text2ppt2.firebaseapp.com",
  projectId: "text2ppt2",
  storageBucket: "text2ppt2.firebasestorage.app",
  messagingSenderId: "975204004931",
  appId: "1:975204004931:web:0bd1ece499c8b186e490f6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth= getAuth(app)

export {auth}