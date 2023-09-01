// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQW9zw_7qi7r8nvgNKsYPFfi6lf8vldNg",
  authDomain: "myblog-4b368.firebaseapp.com",
  projectId: "myblog-4b368",
  storageBucket: "myblog-4b368.appspot.com",
  messagingSenderId: "281987847157",
  appId: "1:281987847157:web:fa27105a7546eb196946bc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };