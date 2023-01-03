import { Router } from "vue-router"
import { getMe } from "../api/userApi"
import useUserAuth from "./useUserAuth"

const initializeUserToken = async (router: Router) => {
  
  try {
    const { success, result } = await getMe()
    const { setLoggedIn, setSignedOut } = useUserAuth()
    if (success) {
      if (result.isAuthenticated) {
        setLoggedIn({
          id: result.id,
          expirationDateTime: result.expirationDateTime,
          name: result.name || '',
          isCompleted: result.isCompleted,
          username: result.username || '',
          token: result.token || ''
        })
        if (!result.isCompleted) {
          router.push('/register/completion')
        }
      }
    } else {
      setSignedOut()
    }
    return true
  } catch (e) {
    console.log(e)
    return false
  }
}

export default initializeUserToken