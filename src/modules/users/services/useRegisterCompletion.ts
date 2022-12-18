import { ApiError } from '@/modules/apiClient/types'
import { useI18n } from '@/modules/i18n'
import { useNotifications } from '@/modules/notifications'
import { useCompoundValidator, useRegexValidator, useRequired, useValidation } from '@/modules/validations'
import useAllowedCharacters from '@/modules/validations/validators/useAllowedCharactersValdator'
import useContainsDigitValidator from '@/modules/validations/validators/useContainsDigitValidator'
import useContainsLowerCaseValidator from '@/modules/validations/validators/useContainsLowerCaseValidator'
import useContainsUpperCaseValidator from '@/modules/validations/validators/useContainsUppercaseValidator'
import useEqualValidator from '@/modules/validations/validators/useEqualValidator'
import useLengthValidator from '@/modules/validations/validators/useLengthValidator'
import useUniqueCharsValidator from '@/modules/validations/validators/useUniqueCharsValidator'
import { ref } from 'vue'
import { completeRegistration } from '../api/userApi'
import { useUserStore } from '../stores/userStore'
import useUserOptions from './useUserOptions'
import useUserAuth from './useUserAuth'

const useRegisterCompletion = () => {
  const { error } = useNotifications()
  const { t } = useI18n()
  const userOptions = useUserOptions()

  const name = ref('')
  const username = ref('')
  const password = ref('')
  const verifyPassword = ref('')
  const isProcessing  = ref(false)

  const usernameValidator = useCompoundValidator([
    useRequired(username, 'Username is required'),
    useAllowedCharacters(username, userOptions.user.allowedUserNameCharacters, userOptions.user.allowedUserNameCharactersMessage)
  ])
  const nameValidator = useRequired(name, 'Name is required')
  const passwordValidators = [
    useRequired(password, 'Password is required'),
    useRegexValidator(password, /[0-9a-zA-Z]+/, ''),
    useUniqueCharsValidator(password, userOptions.password.requiredUniqueChars),
    useLengthValidator(password, userOptions.password.requiredLength)
  ]
  if (userOptions.password.requireUppercase) {
    passwordValidators.push(useContainsUpperCaseValidator(password))
  }
  if (userOptions.password.requireLowercase) {
    passwordValidators.push(useContainsLowerCaseValidator(password))
  }
  if (userOptions.password.requireDigit) {
    passwordValidators.push(useContainsDigitValidator(password))
  }
  if (userOptions.password.requireNonAlphanumeric) {
    passwordValidators.push(useRegexValidator(password, /[^a-zA-Z0-9]+/, 'Passwords must have at least one non alphanumeric character.'))
  }
  const passwordValidator = useCompoundValidator(passwordValidators)
  
  const passwordEqualValidator = useEqualValidator(password, verifyPassword, 'Passwords do no match')

  const validation = useValidation([
    passwordEqualValidator,
    passwordValidator,
    nameValidator,
    usernameValidator
  ])
  const completeRegistrationHandler = async () => {
    if (!validation.validate()) {
      return false
    }
    isProcessing.value = true
      try {
        const model = {
          username: username.value,
          displayName: name.value,
          password: password.value
        }
        const result = await completeRegistration({
          username: username.value,
          displayName: name.value,
          password: password.value
        })
        if (result.success) {
          useUserAuth().setLoggedIn({
            isCompleted: true,
            expirationDateTime: result.expirationDateTime,
            name: result.name || '',
            token: result.token || '',
            username: result.username || ''
          })
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
    username,
    name,
    password,
    verifyPassword,
    usernameValidator,
    nameValidator,
    passwordValidator,
    passwordEqualValidator,
    completeRegistrationHandler,
    isProcessing
  }
}

export default useRegisterCompletion