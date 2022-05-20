import { addDoc, onSnapshot } from "firebase/firestore";
import { commentRef, userRef } from "../config/firebase";

export function getAllComment() {
  onSnapshot(commentRef)
    .then((snapshot) => {
      console.log(snapshot.docs.data());
    })
    .catch((err) => console.log(err));
}

export async function addUser(user) {
    return addDoc(userRef, user);
}
