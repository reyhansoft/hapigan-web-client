import { ApiError } from "../../../apiClient/types"
import { useNotifications } from "@/modules/notifications/"
import { requestVerificationCode } from "../../api/verificationCodeApi"
import { useVerificationCodeStore } from "../../stores/verificationCodesStore"
import { useI18n } from "@/modules/i18n/"
import { ref } from 'vue'

const useRequestVerificationCode = () => {
  const store = useVerificationCodeStore()
  const { t } = useI18n()
  const { error } = useNotifications()
  const isProcessing = ref(false)
  return {
    isProcessing,
    mobile: store.mobile,
    request: async (mobile: string) => {
      isProcessing.value = true
      try {
        const result = await requestVerificationCode(mobile)
        store.changeToVerify({ mobile, ...result })
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
