<template>
  <nav class="bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg p-4 fixed top-0 left-0 w-full z-10">
    <div class="container mx-auto flex justify-between items-center">
      <div class="text-white text-2xl font-bold">
        <span v-if="user">
          Welcome, {{ user.email ? user.email : user.displayName }}
        </span>
      </div>
      <ul class="flex items-center space-x-6">
        <li>
          <RouterLink to="/" class="text-white hover:text-gray-200 transition duration-300">
            Home
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/profile" class="text-white hover:text-gray-200 transition duration-300">
            Profile
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/chat" class="text-white hover:text-gray-200 transition duration-300">
            Chats
          </RouterLink>
        </li>
        <li>
          <button @click="handleLogout" class="text-white hover:text-gray-200 transition duration-300 cursor-pointer">
            Logout
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { defineComponent, computed } from "vue";
import { useRouter } from "vue-router";
import { logOut } from "@/firebase/auth.js";
import { useAppStore } from "@/stores/store";

export default defineComponent({
  name: "NavBar",
  setup() {
    const store = useAppStore();
    const router = useRouter();
    const user = computed(() => store.user);
    console.log(user)

    const handleLogout = async () => {
      try {
        await logOut();
        store.clearUser();
        router.push("/signin");
      } catch (error) {
        console.error("Logout failed:", error.message);
      }
    };

    return {
      user,
      handleLogout,
    };
  },
});
</script>