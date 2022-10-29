// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "mapata-367015.firebaseapp.com",
  databaseURL: "https://mapata-367015-default-rtdb.firebaseio.com/",
  projectId: "mapata-367015",
  storageBucket: "mapata-367015.appspot.com",
  appId: "1:638375278193:web:75742518a2a92cffd14dd0",
  measurementId: "G-4Y0GMEHL7L",
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);

export default app;
