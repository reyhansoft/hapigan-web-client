import { ApiError } from "@/modules/apiClient/types"
import { useI18n } from "@/modules/i18n"
import { useNotifications } from "@/modules/notifications"
import { computed } from "vue"
import { verifyVerificationCode } from "../../api/verificationCodeApi"
import { useVerificationCodeStore } from "../../stores/verificationCodesStore"
import useUserAuth from "../useUserAuth"
import useRequestVerificationCode from "./useRequestVerificationCode"

const useVerifyVerificationCode = () => {
  const { setLoggedIn } = useUserAuth()
  const { mobile, lastTry, nextTryInSeconds } = useVerificationCodeStore()
  const { success, error } = useNotifications()
  const { request } = useRequestVerificationCode()
  const { t } = useI18n()
  const canResendCode = computed(() => lastTry !== null && ((new Date().getTime() - lastTry.getTime()) / 1000) >= nextTryInSeconds)
  const remainingSecondsForResend = computed(() => {
    if (lastTry === null || canResendCode.value) return 0
    return Math.floor((new Date().getTime() - lastTry.getTime()) / 1000)
  })
  return {
    remainingSecondsForResend,
    canResendCode,
    async resendCode () {
      if (!canResendCode.value) {
        error(t('You can request sending verification code'))
        return
      }
      await request(mobile)
    },
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
