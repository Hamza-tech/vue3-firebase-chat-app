import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDcJX6k_kNS3J8PWJX6UxiDPrloE9XuYnA",
  authDomain: "vue3-firebase-project-29b52.firebaseapp.com",
  projectId: "vue3-firebase-project-29b52",
  storageBucket: "vue3-firebase-project-29b52.firebasestorage.app",
  messagingSenderId: "168371710805",
  appId: "1:168371710805:web:4cc49ec471159dea931ddc"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, app, db };
