<template>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 143.95"><g data-name="Layer 2"><g data-name="Layer 1"><ellipse :class="colorClass1" cx="72" cy="71.98" rx="72" ry="71.98"/><path :class="colorClass2" d="M60.18,42.9a16.47,16.47,0,0,1,0,22.73h0a16.37,16.37,0,1,0,23.64,0h0a16.47,16.47,0,0,1,0-22.73h0a16.37,16.37,0,1,0-23.64,0Z"/><circle :class="colorClass2" cx="72.11" cy="113.82" r="14.96"/><circle :class="colorClass1" cx="72.58" cy="113.66" r="8.74"/></g></g></svg>
</template>
<script setup lang="ts">
const props = defineProps({
    colorClass1: { type: String, default: 'cls-1'},
    colorClass2: { type: String, default: 'cls-2'}
})
</script>