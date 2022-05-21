import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { addUser, getUser } from "../database/firestore";
import { profileImageUrl } from "../config/componentVariable";
const provider = new GoogleAuthProvider();
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = {
      email: result.user.email,
      uid: result.user.uid,
      displayName: result.user.displayName,
      photoUrl: result.user.photoURL,
    };
    addUser(user);
    return user;
  } catch (err) {
    console.log(err);
    return err.code;
  }
};

export const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = {
      email: result.user.email,
      uid: result.user.uid,
      displayName: name,
      photoUrl: profileImageUrl,
    };
    await addUser(user);
    return user;
  } catch (err) {
    console.error(err);
    return err.code;
  }
};

export const signInWithAccount = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const user = await getUser(result.user.uid);
    console.log(user);
    await addUser(user);
    return user;
  } catch (err) {
    console.log(err.code);
    return err.code;
  }
};

export const googleLogout = () => {
  signOut(auth);
};

export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return {
      message:
        "Check your mail to reset password (If you cannot find the mail, check spam section)",
    };
  } catch (err) {
    console.log(err.code);
    return err.code;
  }
};
