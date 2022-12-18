import { Ref } from 'vue'
import { Validator } from '../types'
import useBaseValidator from './useBaseValidator'

const useContainsUpperCaseValidator = (model: Ref, message: string = 'Text must have at least one uppercase (A-Z).') : Validator => {
  const isValid = (value: any): boolean => value !== undefined && value !== null && (value.split('').some((t: string) => t >= 'A' && t <= 'Z'))
  
  return useBaseValidator(model, message, isValid)
}

export default useContainsUpperCaseValidator
