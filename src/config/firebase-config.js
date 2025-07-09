// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1vwAaB0QMdb194ZkvpUYlnxmC7I2kO0Y",
  authDomain: "expense-tracker-dbf11.firebaseapp.com",
  projectId: "expense-tracker-dbf11",
  storageBucket: "expense-tracker-dbf11.firebasestorage.app",
  messagingSenderId: "342859224295",
  appId: "1:342859224295:web:86b7ce34c8e01895d9be42",
  measurementId: "G-E0VNKVRLQG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
