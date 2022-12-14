import { useUserStore } from "../stores/userStore"
import { setToken } from "./tokenHandler"

type SetLoggedInModel = {
  id: string,
  name: string,
  isCompleted: boolean,
  token: string,
  expirationDateTime: Date,
  username: string
}
const useUserAuth = () => {
  const userStore = useUserStore()

  return {
    setLoggedIn (model: SetLoggedInModel) {
      userStore.setAuthenticatedUser({
        id: model.id,
        name: model.name,
        isCompleted: model.isCompleted,
        username: model.username
      })
      setToken({
        token: model.token,
        expirationDateTime: model.expirationDateTime
      })
    },
    setSignedOut () {}
  }
}

export default useUserAuth