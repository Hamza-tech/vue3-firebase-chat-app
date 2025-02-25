<template>
  <div>
    <ConfirmModal />
    <div>
      <div v-if="store.user">
        <Navbar />
        <main class="pt-20">
          <RouterView />
        </main>
      </div>
      <div v-else>
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import { useAppStore } from "@/stores/store";
import Navbar from "@/components/Navbar.vue";

export default defineComponent({
  components: {
    Navbar,
  },
  setup() {
    const store = useAppStore();

    onMounted(() => {
      store.fetchUser();
    });

    return { store };
  },
});
</script>
