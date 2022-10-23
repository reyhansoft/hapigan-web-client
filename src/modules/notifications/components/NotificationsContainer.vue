<template>
  <div class="fixed w-full bottom-0 p-5 left-1/2 -translate-x-1/2 max-w-xl flex columns-1 flex-col">
    <NotificationItem
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"></NotificationItem>
  </div>
</template>

<script setup lang="ts">
import NotificationItem from './NotificationItem.vue'

import useNotifications from '../services/useNotifications'

const { notifications } = useNotifications()
</script>
