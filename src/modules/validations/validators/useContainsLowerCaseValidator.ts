import { Ref } from 'vue'
import { Validator } from '../types'
import useBaseValidator from './useBaseValidator'

const useContainsLowerCaseValidator = (model: Ref, message: string = 'Text must have at least one lower case (a-z).') : Validator => {
  const isValid = (value: any): boolean => value !== undefined && value !== null && (value.split('').some((t: string) => t >= 'a' && t <= 'z'))
  
  return useBaseValidator(model, message, isValid)
}

export default useContainsLowerCaseValidator
