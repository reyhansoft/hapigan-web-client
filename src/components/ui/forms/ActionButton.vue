<template>
  <button
    class="flex items-center"
    :class="classes"
    :disabled="props.isProcessing"
    @click="emits('click')">
    <span v-if="!props.isProcessing"><slot /></span>
    <Spinner size="sm" :color="props.spinnerColor" v-else />
  </button>
</template>

<script lang="ts" setup>
import { computed } from '@vue/reactivity';
import { defineProps, defineEmits } from 'vue'
import Spinner from '../BallSpinner.vue'
import ButtonTypes from './buttonTypes';

const props = defineProps({
  type: {
    type: String,
    default: ButtonTypes.Primary
  },
  isProcessing: {
    type: Boolean,
    required: true
  },
  spinnerColor: {
    type: String
  },
  full: {
    type: Boolean,
    default: false
  }
})

const classes = computed(() => ({
  'button-primary': props.type === ButtonTypes.Primary,
  'button-secondary': props.type === ButtonTypes.Secondary,
  'w-full': props.full
}))

const emits = defineEmits(['click'])
</script>
