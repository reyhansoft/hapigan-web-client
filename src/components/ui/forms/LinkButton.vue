<template>
  <a :class="classes"><slot /></a>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps({
  type: { type: String, default: 'primary'}
})
const classes = computed(() => ([
  `button-${props.type}`
]))
</script>

<style lang="postcss" scoped>
.button {
  @apply cursor-pointer inline-block px-6 py-2.5  font-medium text-xs leading-tight uppercase rounded shadow hover:shadow-md focus:shadow-md focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out
}
.button-primary {
  @apply button bg-indigo-700 text-white hover:bg-indigo-600
}
.button-secondary {
  @apply button bg-slate-600 text-white hover:bg-slate-500
}
.button-light {
  @apply button bg-slate-100 text-slate-800 hover:bg-slate-50
}
</style>