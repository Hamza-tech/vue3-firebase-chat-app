import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "./init";


export const getLoggedInUsers = (callback) => {
  const q = query(collection(db, "users"), where("isOnline", "==", true));

  return onSnapshot(q, (snapshot) => {
    const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(users);
  });
};
