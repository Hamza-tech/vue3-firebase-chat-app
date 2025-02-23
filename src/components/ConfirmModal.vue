<template>
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div class="bg-white rounded-lg shadow-lg max-w-sm w-full p-5">
        <h3 class="text-lg font-semibold text-gray-800">{{ modalData.header }}</h3>
        <p class="mt-3 text-gray-600">{{ modalData.message }}</p>
        <div class="mt-5 flex justify-end gap-3">
          <button
            class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            @click="rejectAction"
          >
            {{ modalData.rejectLabel }}
          </button>
          <button
            class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            @click="acceptAction"
          >
            {{ modalData.acceptLabel }}
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
import { defineComponent } from "vue";
import { useConfirmModal } from "@/composable/useConfirmModal";
import Button from "./Button.vue";
  
  export default defineComponent({
    name: "ConfirmModal",
    setup() {
      const { isOpen, modalData, acceptAction, rejectAction } = useConfirmModal();
  
      return {
        isOpen,
        modalData,
        acceptAction,
        rejectAction,
      };
    },
  });
  </script>
  
  <style scoped>
  /* Optional styles */
  </style>
  