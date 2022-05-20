import { onSnapshot, doc, getDoc, setDoc } from "firebase/firestore";
import { commentRef, db } from "../config/firebase";

export function getAllComment() {
  onSnapshot(commentRef)
    .then((snapshot) => {
      console.log(snapshot.docs.data());
    })
    .catch((err) => console.log(err));
}

export async function addUser(user) {
  const docRef = doc(db, "user", user.uid);
  const res = await getDoc(docRef);

  if (!res.exists()) {
    return setDoc(docRef, user);
  }
  return null;
}

export async function getUser(userId) {
  const docRef = doc(db, "user", userId);
  const res = await getDoc(docRef);

  if (res.exists()) {
    return res.data();
  }
  return null;
}
