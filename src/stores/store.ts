import { defineStore } from "pinia";
import { ref } from "vue";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

export const useAppStore = defineStore("app", () => {
  const user = ref<User | null>(null);

  function setUser(newUser: User | null) {
    user.value = newUser;
  }

  function clearUser() {
    user.value = null;
  }

  async function fetchUser() {
    const auth = getAuth();
    onAuthStateChanged(auth, (firebaseUser) => {
      console.log("Fetched user:", firebaseUser);
      user.value = firebaseUser;
    });
  }

  return { user, setUser, clearUser, fetchUser };
});
