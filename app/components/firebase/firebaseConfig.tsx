import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDc-EoJW5Zp2A_8ceE05EE5TP1R5cjm968",
  authDomain: "todo-app-with-email-password.firebaseapp.com",
  projectId: "todo-app-with-email-password",
  storageBucket: "todo-app-with-email-password.appspot.com",
  messagingSenderId: "653978358574",
  appId: "1:653978358574:web:5b190158a38a767aeba0bf",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db =getFirestore()
export default app;
