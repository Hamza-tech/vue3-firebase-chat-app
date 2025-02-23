import { defineStore } from "pinia";
import { getAuth, type User } from "firebase/auth";

export const useAppStore = defineStore("app", {
  state: () => ({
    user: null as User | null,
  }),
  actions: {
    setUser(user: User | null) {
      this.user = user;
    },
    clearUser() {
      this.user = null;
    },
    async fetchUser() {
      const auth = getAuth();
      this.user = auth.currentUser;
    },
  },
});