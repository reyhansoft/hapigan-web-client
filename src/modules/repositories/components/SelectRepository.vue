<template>
  <div class="relative" @click.stop>
    <label class="font-bold mb-1 text-sm" v-if="props.label">{{ props.label }}</label>
    <div class="input cursor-pointer !flex flex-row items-center" @click="onClick">
      <a href="javascript:" class="grow overflow-hidden text-ellipsis whitespace-nowrap">{{ placeholder }}</a>
      <ChevronDown class="w-3 h-3 rtl:mr-2 ltr:ml-2" v-if="props.modelValue === null" />
      <CloseIcon class="w-4 h-4 rtl:mr-2 ltr:ml-2" @click="onUnselect" v-else />
    </div>
    <div class="absolute w-full rounded shadow p-3 mt-2 bg-gray-50 max-h-60 overflow-y-auto" v-if="searchMode">
      <SearchRepositories
        type="summary"
        :allowed-actions="props.allowedActions"
        @select="onSelectItem" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import ChevronDown from '@/modules/icons/ChevronDown.vue'
import { defineProps, defineEmits, computed, ref, onMounted, onUnmounted, PropType } from 'vue'
import { Repository } from '../types';
import SearchRepositories from './SearchRepositories.vue'
import CloseIcon from '@/modules/icons/Close.vue'

const props = defineProps({
  label: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  allowedActions: { type: Array<string>, default: []},
  modelValue: {
    type: Object as PropType<Repository | null>,
    required: true
  }
})
const emits = defineEmits(['update:modelValue'])
const searchMode = ref(false)

const toggleSearchMode = (mode: boolean) => {
  searchMode.value = mode
}

const handleWindowClick = () => toggleSearchMode(false)
const onClick = () => toggleSearchMode(!searchMode.value)

onMounted(() => {
  window.addEventListener('click', handleWindowClick)
})

onUnmounted(() => {
  window.removeEventListener('click', handleWindowClick)
})

const onSelectItem = (item: Repository) => {
  emits('update:modelValue', { ...item })
  toggleSearchMode(false)
}

const onUnselect = () => {
  emits('update:modelValue', null)
}

const placeholder = computed(() => !props.modelValue ? props.placeholder : props.modelValue?.name)
</script>