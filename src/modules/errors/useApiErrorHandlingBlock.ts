import { ApiError } from "../apiClient/types"
import { useI18n } from "../i18n"
import { useNotifications } from "../notifications"

const useApiErrorHandlingBlock = async (action: () => Promise<any>, errorMessage: string | undefined = undefined, successMessage: string | undefined = undefined) => {

  const { error, success } = useNotifications()
  const { t } = useI18n()

  let message = t('Something went wrong')
  try {
    const result = await action()
    if (result.success && successMessage) {
      success(successMessage)
    } else if (result.message || errorMessage) {
      error(result.message || errorMessage || t('Failed to complete the action'))
    }
    return result
  } catch(e: any) {
    if (e instanceof ApiError) {
      message = e.message
      error(e.message)
    } else {
      error(errorMessage || message)
    }
  }
  return { success: false, message }
}

export default useApiErrorHandlingBlock
