import { ApiError } from "@/modules/apiClient/types"
import { useI18n } from "@/modules/i18n"
import { useNotifications } from "@/modules/notifications"
import { verifyVerificationCode } from "../../api/verificationCodeApi"
import { useVerificationCodeStore } from "../../stores/verificationCodesStore"
import useUserAuth from "../useUserAuth"

const useVerifyVerificationCode = () => {
  const { setLoggedIn } = useUserAuth()
  const { mobile } = useVerificationCodeStore()
  const { success, error } = useNotifications()
  const { t } = useI18n()

  return { 
    async verify (code: string) {
      try {
        const result = await verifyVerificationCode(mobile, code)
        setLoggedIn(result)
        success(t('You logged in successfully'))
        return true
      } catch(err) {
        if (err instanceof ApiError) {
          error(err.message)
        } else {
          console.log(err)
          error(t('Something went wrong'))
        }
      }
      return false
    }
  }
}

export default useVerifyVerificationCode
