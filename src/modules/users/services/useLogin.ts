import useApiErrorHandlingBlock from "@/modules/errors/useApiErrorHandlingBlock"
import { useI18n } from "@/modules/i18n"
import { useRequired, useValidation } from "@/modules/validations"
import { computed, onMounted, ref } from "vue"
import { useRouter } from "vue-router"
import { logIn } from "../api/userApi"
import { useUserStore } from "../stores/userStore"
import useUserAuth from "./useUserAuth"


const useLogin = () => {
  const { t } = useI18n()  
  const router = useRouter()
  const { setLoggedIn } = useUserAuth()

  const store = useUserStore()
  const username = ref('')
  const password = ref('')
  const usernameValidator = useRequired(username, t('Username'))
  const passwordValidator = useRequired(username, t('Password'))
  const validator = useValidation([
    usernameValidator,
    passwordValidator
  ])
  const isProcessing = ref(false)

  onMounted(() => {
    if (store.isAuthenticated) {
      if (store.isCompleted) {
        // TODO: redirect to specified path
        router.push('/')
      } else {
        router.push('/register/completion')
      }
    }
  })

  const logInHandler = async () => {
    if (!validator.validate()) return;

    isProcessing.value = true
    await useApiErrorHandlingBlock(async () => {
      const { success, result, message } = await logIn({
        username: username.value,
        password: password.value,
        isPersistent: false
      })
      if (success) {
        setLoggedIn({
          id: result.id,
          isCompleted: result.isCompleted,
          expirationDateTime: result.expirationDateTime,
          name: result.name || '',
          token: result.token || '',
          username: result.username || ''
        })
        console.log('logged in', result)
        if (result.isCompleted) {
          // TODO: redirect to specified path
          router.push('/')
        } else {
          router.push('/register/completion')
        }
      }
      return { success, message }
    }, undefined, t('You logged in successfully'))
    isProcessing.value = false
  }

  return {
    username,
    password,
    usernameValidator,
    passwordValidator,
    isProcessing,
    logIn: logInHandler
  }
}

export default useLogin