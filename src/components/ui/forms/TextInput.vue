<template>
  <fieldset class="flex flex-col">
    <label class="font-bold mb-1" v-if="props.label">{{ props.label }}</label>
    <input 
      :placeholder="props.placeholder"
      v-model="model"
      class="input"
      />
  </fieldset>
</template>
<script lang="ts" setup>
import { defineProps, ref, defineEmits, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  placeholder: {
    type: String
  },
  label: {
    type: String
  }
})

const emits = defineEmits(['update:modelValue'])
const model = ref(props.modelValue)

watch(model, () => {
  emits('update:modelValue', model.value)
})

watch(props, (newvalue) => {
  if (model.value !== newvalue.modelValue) {
    model.value = newvalue.modelValue
  }
})
</script>
<style lang="postcss">
.input {
  @apply block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none;
}
</style>