import { initializeApp } from "firebase/app";
import "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  getFirestore,
  doc,
  getDoc,
  setDoc,
  query,
  where,
  getDocs,
  addDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAWv9XhdgWGeZ4JXvynI0nqDR5WcZlSKd8",
  authDomain: "movie-theater-api.firebaseapp.com",
  projectId: "movie-theater-api",
  storageBucket: "movie-theater-api.appspot.com",
  messagingSenderId: "238552908416",
  appId: "1:238552908416:web:e395627e2690f05d869c65",
  measurementId: "G-2PMXKVD3PL",
};

// Init app
const app = initializeApp(firebaseConfig);

// Init auth
const auth = getAuth(app);

// Init db service
const db = getFirestore();

// collection ref
const commentRef = collection(db, "comment");
const userRef = collection(db, "user");
export {
  auth,
  commentRef,
  userRef,
  onAuthStateChanged,
  db,
  doc,
  getDoc,
  setDoc,
  query,
  where,
  getDocs,
  addDoc,
};
