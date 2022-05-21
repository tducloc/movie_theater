import { Timestamp } from "firebase/firestore";
import {
  db,
  doc,
  getDoc,
  setDoc,
  query,
  where,
  getDocs,
  commentRef,
  addDoc,
} from "../config/firebase";

export async function addComment(comment) {
  try {
    const date = Timestamp.fromDate(new Date());

    const newDoc = { ...comment, createdAt: date };
    await addDoc(commentRef, newDoc);
    return newDoc;
  } catch (error) {
    
    return null;
  }
}

export async function getCommentOfMovie(id) {
  const result = [];
  const q = query(commentRef, where("film_id", "==", id));
  const res = await getDocs(q);

  res.forEach((item) => result.push(item.data()));
  return result;
}

export async function getCommentOfTv(id, season, episode) {
  const result = [];
  const q = query(
    commentRef,
    where("film_id", "==", id),
    where("episode", "==", episode),
    where("season", "==", season)
  );
  const res = await getDocs(q);

  res.forEach((item) => result.push(item.data()));
  return result;
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
