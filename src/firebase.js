// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVv9nDcvIVpK8EWvOjTmXvGG-LdEMQZRM",
  authDomain: "movie-library-1df81.firebaseapp.com",
  projectId: "movie-library-1df81",
  storageBucket: "movie-library-1df81.appspot.com",
  messagingSenderId: "743623404428",
  appId: "1:743623404428:web:81491a6e0b25f504e5c4a9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);