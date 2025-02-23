<template>
    <div
      v-if="visible"
      class="fixed bottom-5 left-1/2 transform -translate-x-1/2 px-4 py-3 rounded shadow-lg transition duration-300 ease-in-out"
      :class="toastClass"
    >
      {{ message }}
    </div>
  </template>
  
  <script>
  import { defineComponent, computed, ref, onMounted } from "vue";
  
  export default defineComponent({
    name: "Toast",
    props: {
      type: {
        type: String,
        default: "info",
      },
      message: {
        type: String,
        required: true,
      },
      duration: {
        type: Number,
        default: 3000, // 3 seconds
      },
    },
    setup(props) {
      const visible = ref(false);
  
      const show = () => {
        visible.value = true;
        setTimeout(() => {
          visible.value = false;
        }, props.duration);
      };
  
      const toastClass = computed(() => {
        switch (props.type) {
          case "success":
            return "bg-green-500 text-white";
          case "error":
            return "bg-red-500 text-white";
          case "warning":
            return "bg-yellow-500 text-black";
          default:
            return "bg-gray-800 text-white";
        }
      });
  
      onMounted(() => {
        show();
      });
  
      return {
        visible,
        toastClass,
      };
    },
  });
  </script>