import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAEkF0N2V0ddUYUscaAPKVIxIqNeMchwV4",
  authDomain: "putfruitsonmycake.firebaseapp.com",
  projectId: "putfruitsonmycake",
  storageBucket: "putfruitsonmycake.firebasestorage.app",
  messagingSenderId: "451859039394",
  appId: "1:451859039394:web:c976ce86005ef3d0dcc3fb",
  measurementId: "G-ES19PN0S2K"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const googleProvider = new GoogleAuthProvider();

export default app;