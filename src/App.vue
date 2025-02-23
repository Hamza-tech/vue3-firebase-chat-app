<template>
  <div>
    <ConfirmModal />
    <div>
      <div v-if="store.user">
        <Navbar />
        <main class="pt-20">
         <router-view />
        </main>
      </div>
      <router-view v-else />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Navbar from "@/components/Navbar.vue";
import { useAppStore } from "@/stores/store";

export default defineComponent({
  components: {
    Navbar
  },
  setup() {
    const store = useAppStore();
    return {
      store,
    };
  },
});
</script>