import { useI18n } from '@/modules/i18n'
import { Ref } from 'vue'
import { Validator } from '../types'
import useBaseValidator from './useBaseValidator'

const useUniqueCharsValidator = (
  model: Ref,
  countOfUniqueChars: number,
  name: string = useI18n().t('This field'),
  message: string = useI18n().t('{0} must use at least {1} different characters.', name, countOfUniqueChars)
) : Validator => {
  const isValid = (value: any): boolean => 
    value !== undefined &&
    value !== null &&
    (countOfUniqueChars < 1 || (new Set(value).size >= countOfUniqueChars))

  return useBaseValidator(model, message, isValid)
}

export default useUniqueCharsValidator