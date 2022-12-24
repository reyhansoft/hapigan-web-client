import { ApiError } from "../apiClient/types"
import { useI18n } from "../i18n"
import { useNotifications } from "../notifications"

const useApiErrorHandlingBlock = async (action: () => Promise<any>, errorMessage: string | undefined = undefined, successMessage: string | undefined = undefined) => {

  const { error, success } = useNotifications()
  const { t } = useI18n()

  try {
    const result = await action()
    if (result.success && successMessage) {
      success(successMessage)
      return true
    } else if (result.error && errorMessage) {
      error(errorMessage)
    }
  } catch(e: any) {
    if (e instanceof ApiError) {
      error(e.message)
    } else {
      console.log(e)
      error(errorMessage || t('Something went wrong'))
    }
  }
  return false
}

export default useApiErrorHandlingBlock
