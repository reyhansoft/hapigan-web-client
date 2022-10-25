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

<style lang="postcss">
@import 'buttons.css'
</style>