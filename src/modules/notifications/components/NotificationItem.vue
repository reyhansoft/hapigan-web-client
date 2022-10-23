<template>
  <div
    class="rounded-lg shadow-sm py-3 px-3 mt-4 text-base flex items-center w-full"
    :class="classes">
    <span class="grow">{{ props.notification.message }}</span>
    <button type="button" @click="remove(props.notification.id)"
      class="btn-close box-content w-1 h-1 p-1 mx-2 text-yellow-900 border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-yellow-900 hover:opacity-75 hover:no-underline"
      data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
</template>

<script setup lang="ts">
import useNotifications from "../services/useNotifications";
import { Notification, NotificationType } from '../services/types'
import { onMounted, ref } from 'vue'

const props = defineProps({
  notification: { type: Notification, required: true }
})
const classes = ref({
  'bg-red-100': props.notification.type === NotificationType.Error,
  'text-red-700': props.notification.type === NotificationType.Error,
  'bg-green-100': props.notification.type === NotificationType.Success,
  'text-green-700': props.notification.type === NotificationType.Success
})
const { remove } = useNotifications()

onMounted(() => {
  if (props.notification.closeAfter !== 0) {
    setTimeout(() => remove(props.notification.id), props.notification.closeAfter * 1000)
  }
})
</script>
