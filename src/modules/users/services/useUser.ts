import { useUserStore } from "../stores/userStore"

const useUser = () => {
  const store = useUserStore()
  return {
    isCompleted: store.isCompleted,
    isAuthenticated: store.isAuthenticated,
    id: store.id,
    username: store.username,
    name: store.username,
  }
}

export default useUser
