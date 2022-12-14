import { useUserStore } from "../stores/userStore"
import { setToken } from "./tokenHandler"

type SetLoggedInModel = {
  name: string,
  isCompleted: boolean,
  token: string,
  expirationDateTime: Date
}
const useUserAuth = () => {
  const userStore = useUserStore()

  return {
    setLoggedIn (model: SetLoggedInModel) {
      userStore.setAuthenticatedUser({
        name: model.name,
        isCompleted: model.isCompleted
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