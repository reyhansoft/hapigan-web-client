import { ApiError } from '@/modules/apiClient/types'
import { useI18n } from '@/modules/i18n'
import { useNotifications } from '@/modules/notifications'
import { useCompoundValidator, useRegexValidator, useRequired, useValidation } from '@/modules/validations'
import useEqualValidator from '@/modules/validations/validators/useEqualValidator'
import { ref } from 'vue'
import { completeRegistration } from '../api/userApi'
import { useUserStore } from '../stores/userStore'

const useRegisterCompletion = () => {
  const { error } = useNotifications()
  const { t } = useI18n()

  const name = ref('')
  const password = ref('')
  const verifyPassword = ref('')
  const isProcessing  = ref(false)

  const nameValidator = useRequired(name, 'Display name is required')
  const passwordValidator = useCompoundValidator([
    useRequired(password, 'Password is required'),
    useRegexValidator(password, /[0-9a-zA-Z]+/, '')
  ])
  const passwordEqualValidator = useEqualValidator(password, verifyPassword, 'Passwords do no match')

  const validation = useValidation([
    passwordEqualValidator,
    passwordValidator,
    nameValidator
  ])
  const completeRegistrationHandler = async () => {
    if (!validation.validate()) {
      return false
    }
    isProcessing.value = true
      try {
        const result = await completeRegistration({
          name: name.value,
          password: password.value
        })
        if (result.success) {
          useUserStore().setRegistrationCompleted()
          return true
        } else {
          error(result.message || '')
        }
      } catch (e: any) {
        if (e instanceof ApiError) {
          error(e.message)
        } else {
          console.log(e)
          error(t('Something went wrong'))
        }
      }
      isProcessing.value = false
      return false
  }

  return {
    name,
    password,
    verifyPassword,
    nameValidator,
    passwordValidator,
    passwordEqualValidator,
    completeRegistrationHandler,
    isProcessing
  }
}

export default useRegisterCompletion