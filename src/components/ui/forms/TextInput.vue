<template>
  <fieldset class="flex flex-col">
    <label class="font-bold mb-1" v-if="props.label">{{ props.label }}</label>
    <input 
      :placeholder="props.placeholder"
      v-model="model"
      class="input"
      :class="classes"
      @focus=""
      />
      <div 
        class="text-red-500 text-sm mt-1"
        v-if="props.validator && props.validator.isValid.value === false"
        v-for="(message, i) of props.validator.message.value"
        :key="i">{{ message }}</div>
  </fieldset>
</template>
<script lang="ts" setup>
import { Validator } from '@/modules/validations/types';
import { computed } from '@vue/reactivity';
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
  },
  validator: {
    type: Object
  }
})

const classes = computed(() => ({
  '!border-red-500': props.validator != null && props.validator.isValid.value === false,
  '!focus:border-red-500': props.validator != null && props.validator.isValid.value === false
}))

const onFocus = () => {
  if (props.validator) {
    (props.validator as Validator).touched()
  }
}

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