import { defineStore } from 'pinia'
import { Notification, NotificationState } from './types'

const useNotificationStore = defineStore('notifications', {
  state: () => ({
    list: []
  }) as NotificationState,
  actions: {
    add(notification: Notification) {
      this.list.push(notification)
    },
    remove(id: String) {
      const indexOfItem = this.list.findIndex(t => t.id === id)
      if (indexOfItem !== -1) {
        this.list.splice(indexOfItem, 1)
      }
    }
  }
})

export default useNotificationStore
