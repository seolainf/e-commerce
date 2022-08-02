import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBgtbZ36FelSKxkrge0Z3UYIeNnamvSVZo",
  authDomain: "shopping-2d14f.firebaseapp.com",
  databaseURL:
    "https://shopping-2d14f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "shopping-2d14f",
  storageBucket: "shopping-2d14f.appspot.com",
  messagingSenderId: "355081589753",
  appId: "1:355081589753:web:24e776b7a69434bf79e328",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
