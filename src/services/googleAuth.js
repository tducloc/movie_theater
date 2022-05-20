import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { addUser } from "../database/firestore";

const provider = new GoogleAuthProvider();
export const signInWithGoogle = async () => {
  try {
    const results = await signInWithPopup(auth, provider);
    console.log(results.user);
    return results;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addUser(user);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export const googleLogout = () => {
  signOut(auth);
};
