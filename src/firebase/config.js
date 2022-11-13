// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
export const firebaseConfig = {
  apiKey: "AIzaSyAyHskBgN3a-10f4uDLbi5fqXkxFjyTBBY",
  authDomain: "mapata-367015.firebaseapp.com",
  databaseURL: "https://mapata-367015-default-rtdb.firebaseio.com",
  projectId: "mapata-367015",
  storageBucket: "mapata-367015.appspot.com",
  messagingSenderId: "638375278193",
  appId: "1:638375278193:web:75742518a2a92cffd14dd0",
  measurementId: "G-4Y0GMEHL7L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Servicios
export const auth = getAuth(app);

export default app;
