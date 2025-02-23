<template>
    <label :for="id" class="block mb-2">{{ labelText }}</label>
    <textarea
      :id="id"
      :class="textareaClass"
      :placeholder="placeholder"
      :rows="rows"
      :cols="cols"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    ></textarea>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'TextArea',
    props: {
      id: {
    type: String,
    required: false,
  },
      textareaClass: {
        type: String,
        default: '',
      },
      labelText: {
        type: String,
        required: true,
      },
      placeholder: {
        type: String,
        default: '',
      },
      rows: {
        type: Number,
        default: 4,
      },
      cols: {
        type: Number,
        default: 50,
      },
      modelValue: {
        type: String,
        default: '',
      },
    },
  });
  </script>