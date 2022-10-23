import { Notification, NotificationOptions } from "./types"
import { computed  } from "vue"
import useNotificationStore from "./store"

const useNotifications = () => {
  const store = useNotificationStore()
  const notifications = computed(() => store.list)
  return {
    notifications,
    success(
      message: string,
      closeAfter: Number = 5
    ): void {
      store.add(Notification.Success(message, closeAfter))
    },
    error(
      message: string,
      closeAfter: Number = 5
    ): void {
      store.add(Notification.Error(message, closeAfter))
    },
    remove(id: String) {
      store.remove(id)
    }
  }
}

export default useNotifications
