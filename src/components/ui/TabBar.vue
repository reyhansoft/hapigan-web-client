<template>
	<ul class="flex border-b-2 border-solid border-indigo-100">
		<li v-for="item in props.items" :class="classes[item.id]" :key="item.id">{{  item.title }}</li>
	</ul>
</template>
<script setup lang="ts">
import { defineProps, computed } from 'vue'

interface TabItem {
	id: string
	title: string
	selected: boolean
}

const props = defineProps({
	items: { type: Array<TabItem>, required: true }
})

const classes = computed(() => {
	const result: { [key:string]: Array<string> } = {}
	for (const item of props.items) {
		const classes: Array<string> = ['py-1 p-2 m-2 rounded cursor-pointer hover:bg-indigo-50']
		if (item.selected) {
			classes.push('bg-indigo-100 hover:bg-indigo-100')
		}
		result[item.id] = classes
	}
	return result
})

</script>