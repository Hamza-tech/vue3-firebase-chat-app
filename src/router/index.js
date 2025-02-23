import { createRouter, createWebHistory } from "vue-router";
import { useAppStore } from "@/stores/store";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/init";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "home", component: () => import("@/views/HomeView.vue"), meta: { requiresAuth: true } },
    { path: "/chat", name: "about", component: () => import("@/views/Chat.vue") },
    { path: "/signin", name: "signin", component: () => import("@/views/auth/Signin.vue"), meta: { requiresGuest: true } },
    { path: "/signup", name: "signup", component: () => import("@/views/auth/SignupPage.vue"), meta: { requiresGuest: true } },
  ],
});

router.beforeEach(async (to, from, next) => {
  const store = useAppStore();

  await new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      store.setUser(user);
      resolve(true);
    });
  });

  const isAuthenticated = !!store.user;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/signin");
  } else if (to.meta.requiresGuest && isAuthenticated) {
    next("/");
  } else {
    next();
  }
});

export default router;
