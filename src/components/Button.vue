<template>
    <button
      :class="buttonClass"
      @click="handleClick"
      :type="type"
      :disabled="isDisable"
    >
    <span v-if="isLoading" class="loader border-t-2 border-white border-solid rounded-full w-4 h-4 animate-spin inline-block mr-2"></span>
      {{ buttonText }}
    </button>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'Button',
    props: {
      buttonClass: {
        type: String,
        default: '',
      },
      buttonText: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        default: 'button',
      },
      icon: {
        type: String,
        default: '',
      },
      isDisable: {
        type: Boolean,
        default: false,
      },
      isLoading: {
      type: Boolean,
      default: false,
    },
    },

    emits: ['click'],
    setup(props, { emit }) {
      const handleClick = () => {
        emit('click');
      };
  
      return {
        handleClick,
      };
    },
  });
  </script>
  
  <style scoped>

  </style>