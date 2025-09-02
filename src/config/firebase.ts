// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithRedirect,
  GoogleAuthProvider,
  GithubAuthProvider,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
  //   measurementId: import.meta.env.VITE_measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// AUTHENTICATION
export const auth = getAuth(app);

export const signInRegister = async (email: string, pass: string, username: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, pass);
    updateProfile(userCredential.user, { displayName: username });
  } catch (error) {}
};

export const GoogleSigninWithPopup = async () => {
  const provider = new GoogleAuthProvider();
  provider.addScope("profile");
  provider.addScope("email");
  await signInWithPopup(auth, provider);
};

export const GithubSigninWithPopoup = async () => {
  const provider = new GithubAuthProvider();
  provider.addScope("profile");
  provider.addScope("email");
  await signInWithPopup(auth, provider);
};

// FIRESTORE
export const db = getFirestore(app);
