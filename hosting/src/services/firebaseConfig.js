import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage"; 


const firebaseConfig = {
  apiKey: "AIzaSyAmtydjbKruZ0Ao5vauDQtkQw2mBLjSGiI",
  authDomain: "hackathon-substitutiva.firebaseapp.com",
  projectId: "hackathon-substitutiva",
  storageBucket: "hackathon-substitutiva.firebasestorage.app",
  messagingSenderId: "193490713115",
  appId: "1:193490713115:web:67e67f068efd70cd8456be",
  measurementId: "G-RSVYH7XM1S"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

export const db = getFirestore(app);

export const auth = getAuth(app);
