import { ApiError } from "../../../apiClient/types"
import { useNotifications } from "@/modules/notifications/"
import { requestVerificationCode } from "../../api/verificationCodeApi"
import { useVerificationCodeStore } from "../../stores/verificationCodesStore"
import { useI18n } from "@/modules/i18n/"
import { ref } from 'vue'
import { useRegexValidator, useRequired, useValidation, useCompoundValidator } from '@/modules/validations'

const useRequestVerificationCode = () => {
  const store = useVerificationCodeStore()
  const { t } = useI18n()
  const { error } = useNotifications()
  const isProcessing = ref(false)
  const mobile = ref(store.mobile || '')
  const mobileRequiredValidator = useRequired(mobile)
  const mobileNumberValidator = useRegexValidator(mobile, /^\+989[0-9]{9}$/)
  const mobileValidator = useCompoundValidator([mobileRequiredValidator, mobileNumberValidator])
  const validation = useValidation([
    mobileRequiredValidator,
    mobileNumberValidator
  ])

  return {
    mobileValidator,
    isProcessing,
    mobile,
    request: async () => {
      if (!validation.validate()) {
        return
      }
      isProcessing.value = true
      try {
        const result = await requestVerificationCode(mobile.value)
        store.changeToVerify({ mobile: mobile.value, ...result })
      } catch (e: any) {
        if (e instanceof ApiError) {
          error(e.message)
        } else {
          console.log(e)
          error(t('Something went wrong'))
        }
      }
      isProcessing.value = false
    }
  }
}

export default useRequestVerificationCode
