import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";
import { db } from "./init";

export const sendMessage = async (senderId, senderName, receiverId, text) => {
  try {
    await addDoc(collection(db, "messages"), {
      senderId,
      senderName,
      receiverId,
      text,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error sending message:", error);
  }
};


export const listenForMessages = (userId1, userId2, callback) => {
  const messagesRef = collection(db, "messages");

  const messagesQuery = query(
    messagesRef,
    orderBy("createdAt", "asc")
  );

  return onSnapshot(messagesQuery, (snapshot) => {
    const messages = snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter(
        (msg) =>
          (msg.senderId === userId1 && msg.receiverId === userId2) ||
          (msg.senderId === userId2 && msg.receiverId === userId1)
      );

    callback(messages);
  });
};
