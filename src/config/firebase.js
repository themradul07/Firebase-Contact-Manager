// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpjOZQOBfI_qc_8sm4b4axKBLATyC-RiM",
  authDomain: "vite-contact-exp.firebaseapp.com",
  projectId: "vite-contact-exp",
  storageBucket: "vite-contact-exp.firebasestorage.app",
  messagingSenderId: "819403885785",
  appId: "1:819403885785:web:69dc4c836a7394867f42c8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);