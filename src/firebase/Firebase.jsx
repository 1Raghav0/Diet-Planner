import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBRQX2Ch4Y67j1TmIA7C-2Tk9_iGVJuDY8",
  authDomain: "nutriwise-26c80.firebaseapp.com",
  projectId: "nutriwise-26c80",
  storageBucket: "nutriwise-26c80.firebasestorage.app",
  messagingSenderId: "143775638620",
  appId: "1:143775638620:web:7f7d3c2a0e87d13cb53299",
  measurementId: "G-VDXF4GNWFD"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);