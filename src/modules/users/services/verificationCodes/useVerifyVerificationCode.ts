import { ApiError } from "@/modules/apiClient/types"
import { useI18n } from "@/modules/i18n"
import { useNotifications } from "@/modules/notifications"
import { useRequired, useValidation } from "@/modules/validations"
import { storeToRefs } from "pinia"
import { computed, Ref, ref } from "vue"
import { verifyVerificationCode } from "../../api/verificationCodeApi"
import { useVerificationCodeStore } from "../../stores/verificationCodesStore"
import useUserAuth from "../useUserAuth"
import useRequestVerificationCode from "./useRequestVerificationCode"

const useVerifyVerificationCode = () => {
  const { setLoggedIn } = useUserAuth()
  const { lastTry, nextTryInSeconds, mobile, token } = storeToRefs(useVerificationCodeStore())

  const { changeToRequest } = useVerificationCodeStore()
  const { success, error } = useNotifications()
  const { request, isProcessing: isResendingVerificationCode } = useRequestVerificationCode()
  const { t } = useI18n()
  const now = ref(new Date().getTime())
  const timerFlag: Ref<any> = ref(-1)
  const canResendCode = computed(() => lastTry.value !== null && (((now.value - lastTry.value.getTime()) / 1000) >= nextTryInSeconds.value))
  const remainingSecondsForResend = computed(() => {
    if (lastTry.value === null || canResendCode.value ) return 0
    return Math.floor(nextTryInSeconds.value - (now.value - lastTry.value.getTime()) / 1000)
  })

  const code = ref('')
  const codeRequiredValidator = useRequired(code)
  const validation = useValidation([
    codeRequiredValidator
  ])

  const isProcessing = ref(false)
  return {
    isProcessing,
    isResendingVerificationCode,
    code,
    codeValidator: codeRequiredValidator,
    mobile: mobile.value,
    remainingSecondsForResend,
    canResendCode,
    changePhoneNumber () {
      changeToRequest()
    },
    startTimer () {
      timerFlag.value = setInterval(() => {
        now.value = new Date().getTime()
      }, 1000)
    },
    stopTimer () {
      clearInterval(timerFlag.value)
    },
    async resendCode () {
      if (!canResendCode.value) {
        error(t('You can request sending verification code'))
        return
      }
      await request()
    },
    async verify () {
      if (!validation.validate()) {
        return { success: false }
      }
      isProcessing.value = true
      try {
        const { result, success: isSuccess, message } = await verifyVerificationCode(mobile.value, code.value, token.value || '')
        if (isSuccess){
          setLoggedIn({
            name: result.name || '',
            expirationDateTime: result.expirationDateTime,
            isCompleted: result.isCompleted,
            token: result.token
          })
          success(t('You logged in successfully'))
          return { 
            success: true,
            isCompleted: result.isCompleted
          }
        } else {
          error(message || t('Something went wrong'))
        }
      } catch(err) {
        if (err instanceof ApiError) {
          error(err.message)
        } else {
          console.log(err)
          error(t('Something went wrong'))
        }
      } finally {
        isProcessing.value = false
      }
      return { success: false }
    }
  }
}

export default useVerifyVerificationCode
