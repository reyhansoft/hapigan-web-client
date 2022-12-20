import { useI18n } from '@/modules/i18n'
import { Ref } from 'vue'
import { Validator } from '../types'
import useBaseValidator from './useBaseValidator'

const useRequired = (
  model: Ref,
  name: string = 'This field',
  message: string = useI18n().t('{0} is required', name)
) : Validator => {
  const isValid = (value: any): boolean => value !== undefined && value !== null && (value.trim() !== '')

  return useBaseValidator(model, message, isValid)
}

export default useRequired
