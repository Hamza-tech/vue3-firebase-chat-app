<template>
    <p v-if="message" :class="errorClass">{{ message }}</p>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'ErrorMessage',
    props: {
      message: {
        type: String,
        required: false,
        default: '',
      },
      errorClass: {
        type: String,
        required: false,
        default: 'text-red-500 text-sm',
      },
    },
  });
  </script> 