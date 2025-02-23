<template>
    <label :for="id">{{ labelText }}</label>
    <input
      :class="inputClass"
      :value="modelValue"
      :placeholder="placeholder"
      :type="type"
      @input="$emit('update:modelValue', $event.target.value)"
      :id="id"
    />
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'InputField',
    props: {
      id: {
        type: String,
        required: true
      },
      inputClass: {
        type: String,
        default: ''
      },
      labelText: {
        type: String,
        required: true
      },
      placeholder: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'text'
      },
      modelValue: {
        type: String,
        default: ''
      }
    }
  });
  </script>