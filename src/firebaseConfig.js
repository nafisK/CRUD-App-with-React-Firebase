// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5AT8t9GTcSO03gbRaojIQjhPDWvi99-s",
  authDomain: "react-with-firebase-d05e6.firebaseapp.com",
  projectId: "react-with-firebase-d05e6",
  storageBucket: "react-with-firebase-d05e6.appspot.com",
  messagingSenderId: "561918613669",
  appId: "1:561918613669:web:62b0d748976def12ea154c",
  measurementId: "G-S94XJDDV03",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
