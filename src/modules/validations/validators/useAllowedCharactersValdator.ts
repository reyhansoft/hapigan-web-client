import { Ref } from 'vue'
import { Validator } from '../types'
import useBaseValidator from './useBaseValidator'

const useAllowedCharacters = (model: Ref, chars: string, message: string = `This field should only contains this characters: ${chars}`) : Validator => {
  const isValid = (value: any): boolean =>
    value !== undefined &&
    value !== null &&
    value.split('').every((t: string) => chars.indexOf(t) !== -1)
  
  return useBaseValidator(model, message, isValid)
}

export default useAllowedCharacters