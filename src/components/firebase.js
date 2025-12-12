// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrFj6lnNq-edCGXomdoAQXmqjpRDWB3cg",
  authDomain: "my-medicine-remminder.firebaseapp.com",
  projectId: "my-medicine-remminder",
  storageBucket: "my-medicine-remminder.firebasestorage.app",
  messagingSenderId: "943004971514",
  appId: "1:943004971514:web:6d4feed1922ab26f31f443"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export default app;