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
import { onMounted, ref } from 'vue'
import { completeRegistration } from '../api/userApi'
import { useUserStore } from '../stores/userStore'
import useUserOptions from './useUserOptions'
import useUserAuth from './useUserAuth'
import { useRouter } from 'vue-router'

const useRegisterCompletion = () => {
  const { error } = useNotifications()
  const { t } = useI18n()
  const userOptions = useUserOptions()
  const store = useUserStore()
  const router = useRouter()

  onMounted(() => {
    if(!store.isAuthenticated || store.isCompleted) {
      // TODO: redirect to the specified page
      router.push('/')
    }
  })

  const name = ref('')
  const username = ref('')
  const password = ref('')
  const verifyPassword = ref('')
  const isProcessing  = ref(false)

  const usernameValidator = useCompoundValidator([
    useRequired(username, t('Username')),
    useAllowedCharacters(username, userOptions.user.allowedUserNameCharacters, t('Username'), userOptions.user.allowedUserNameCharactersMessage),
    useLengthValidator(username, userOptions.user.minUsernameLength, userOptions.user.maxUsernameLength, t('Username')),
    useUniqueCharsValidator(username, userOptions.user.usernameRequiredUniqueChars, t('Username'))
  ])
  const nameValidator = useCompoundValidator([
    useRequired(name, t('Name')),
    useLengthValidator(name, 0, userOptions.user.maxDisplayNameLength, t('Name'))
  ]) 
  const passwordValidators = [
    useRequired(password, t('Password')),
    useUniqueCharsValidator(password, userOptions.password.requiredUniqueChars, t('Password')),
    useLengthValidator(password, userOptions.password.requiredLength, Number.MAX_VALUE, t('Password'))
  ]
  if (userOptions.password.requireUppercase) {
    passwordValidators.push(useContainsUpperCaseValidator(password, t('Password')))
  }
  if (userOptions.password.requireLowercase) {
    passwordValidators.push(useContainsLowerCaseValidator(password, t('Password')))
  }
  if (userOptions.password.requireDigit) {
    passwordValidators.push(useContainsDigitValidator(password, t('Password')))
  }
  if (userOptions.password.requireNonAlphanumeric) {
    passwordValidators.push(useRegexValidator(password, /[^a-zA-Z0-9]+/, t('Password')))
  }
  const passwordValidator = useCompoundValidator(passwordValidators)
  
  const passwordEqualValidator = useEqualValidator(password, verifyPassword, t('Passwords do no match'))

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