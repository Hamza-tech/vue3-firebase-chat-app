import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import {
  doc,
  setDoc,
  updateDoc,
  serverTimestamp,
  getDoc
} from "firebase/firestore";
import { auth, db } from "./init";


export const signUp = async (name, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;


    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        name: name,
        email: user.email,
        isOnline: true,
        createdAt: serverTimestamp(),
      });
    }

    return user;
  } catch (error) {
    throw error;
  }
};


export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;


    await updateDoc(doc(db, "users", user.uid), {
      isOnline: true,
    });

    return user;
  } catch (error) {
    throw error;
  }
};


export const logOut = async () => {
  try {
    const user = auth.currentUser;

    if (user) {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        await updateDoc(userRef, {
          isOnline: false,
        });
      }
    }

    await signOut(auth);
    return true;
  } catch (error) {
    console.error("Logout failed:", error.message);
    throw error;
  }
};
