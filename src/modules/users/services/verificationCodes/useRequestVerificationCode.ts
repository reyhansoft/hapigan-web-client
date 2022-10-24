import { ApiError } from "../../../apiClient/types"
import { useNotifications } from "@/modules/notifications/"
import { requestVerificationCode } from "../../api/verificationCodeApi"
import { useVerificationCodeStore } from "../../stores/verificationCodesStore"
import { useI18n } from "@/modules/i18n/"

const useRequestVerificationCode = () => {
  const store = useVerificationCodeStore()
  const { t } = useI18n()
  const { error } = useNotifications()
  return {
    mobile: store.mobile,
    request: async (mobile: string) => {
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
    }
  }
}

export default useRequestVerificationCode
