import { useI18n } from '@/modules/i18n'
import { Ref } from 'vue'
import { Validator } from '../types'
import useBaseValidator from './useBaseValidator'

const useContainsUpperCaseValidator = (
  model: Ref,
  name: string = 'This field',
  message: string = useI18n().t('{0} must have at least one uppercase (A-Z).', name)
) : Validator => {
  const isValid = (value: any): boolean => value !== undefined && value !== null && (value.split('').some((t: string) => t >= 'A' && t <= 'Z'))
  
  return useBaseValidator(model, message, isValid)
}

export default useContainsUpperCaseValidator
