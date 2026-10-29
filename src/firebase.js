
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCTcRpJrIlUpkqTJ3E4-H_ZOr8nIqptJBc",
  authDomain: "recipe-search-app-fabd6.firebaseapp.com",
  projectId: "recipe-search-app-fabd6",
  storageBucket: "recipe-search-app-fabd6.firebasestorage.app",
  messagingSenderId: "262672060990",
  appId: "1:262672060990:web:20208a83cf28bee324376f",
  measurementId: "G-MW9S59QF2C"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
