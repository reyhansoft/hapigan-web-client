import { useI18n } from '@/modules/i18n'
import { Ref } from 'vue'
import { Validator } from '../types'
import useBaseValidator from './useBaseValidator'

const useAllowedCharacters = (
  model: Ref,
  chars: string,
  name: string = "This field",
  message: string = useI18n().t('{0} should only contains this characters: {1}', name, chars)
) : Validator => {
  const isValid = (value: any): boolean =>
    value !== undefined &&
    value !== null &&
    value.split('').every((t: string) => chars.indexOf(t) !== -1)
  
  return useBaseValidator(model, message, isValid)
}

export default useAllowedCharacters