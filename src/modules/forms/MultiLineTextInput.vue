<template>
  <fieldset class="flex flex-col">
    <label class="font-bold mb-1 text-sm" v-if="props.label">{{ props.label }}</label>
    <span v-if="props.description" class="text-sm mb-1">{{ props.description }}</span>
    <textarea 
      :placeholder="props.placeholder"
      v-model="model"
      class="input"
      :class="classes"
      @focus=""
      ref="el"
      :dir="props.dir"
      ></textarea>
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
import { defineProps, ref, defineEmits, watch, Ref, TextareaHTMLAttributes, onMounted } from 'vue'

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
  },
  description: {
    type: String
  },
  dir: {
    type: String,
    default: undefined
  },
  autoHieght:{
    type: Boolean,
    default: true
  },
  minLines: {
    type: Number,
    default: 3
  },
  maxLines: {
    type: Number,
    default: 5
  }
})
const el: Ref<TextareaHTMLAttributes | null> = ref(null)

const classes = computed(() => ({
  '!border-red-500': props.validator != null && props.validator.isValid.value === false,
  '!focus:border-red-500': props.validator != null && props.validator.isValid.value === false
}))

const onFocus = () => {
  if (props.validator) {
    (props.validator as Validator).touched()
  }
}

const makeAutoHeight = () => {
  if (props.autoHieght && el.value) {
    let lines = 1 + (model.value.match(/\n/g) || []).length
    if (lines < props.minLines) {
      lines = props.minLines
    }
    if (lines > props.maxLines) {
      lines = props.maxLines
    }
    el.value.rows = lines
    // const currentLineNumber = (el.value.value?.toString() || '').substr(0, (el.value as any).selectionStart).split("\n").length
  }
}

const emits = defineEmits(['update:modelValue'])
const model = ref(props.modelValue)

watch(model, () => {
  emits('update:modelValue', model.value)
  makeAutoHeight()
})

watch(props, (newvalue) => {
  if (model.value !== newvalue.modelValue) {
    model.value = newvalue.modelValue
    makeAutoHeight()
  }
})
onMounted(() => {
  makeAutoHeight()
})
</script>