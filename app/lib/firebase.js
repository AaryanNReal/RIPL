import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCR4famAbyp2PdFAIe4xx3m2rfUBBjlcsk",
  authDomain: "ripl-94859.firebaseapp.com",
  projectId: "ripl-94859",
  storageBucket: "ripl-94859.appspot.com",
  messagingSenderId: "911545039810",
  appId: "1:911545039810:web:2010534f63bff75baef45b",
  measurementId: "G-Z37078BL7T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };