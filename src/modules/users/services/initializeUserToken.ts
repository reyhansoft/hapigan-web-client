import { Router } from "vue-router"
import { getMe } from "../api/userApi"
import useUserAuth from "./useUserAuth"

const initializeUserToken = async (router: Router) => {
  
  try {
    const userTokenResult = await getMe()
    const { setLoggedIn, setSignedOut } = useUserAuth()
    if (userTokenResult.isAuthenticated) {
      setLoggedIn({
        expirationDateTime: userTokenResult.expirationDateTime,
        name: userTokenResult.name || '',
        isCompleted: userTokenResult.isCompleted,
        username: userTokenResult.username || '',
        token: userTokenResult.token || ''
      })
      if (!userTokenResult.isCompleted) {
        router.push('/register/completion')
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