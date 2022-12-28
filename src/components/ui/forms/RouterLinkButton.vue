<template>
    <router-link :to="props.to" :class="classes"><slot /></router-link>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  const props = defineProps({
    type: { type: String, default: 'primary'},
    to: { type: String, required: true }
  })
  const classes = computed(() => ([
    `button-${props.type}`
  ]))
  </script>
  
  <style lang="postcss">
  @import 'buttons.css'
  </style>