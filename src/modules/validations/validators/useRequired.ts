import { Ref } from 'vue'
import { Validator } from '../types'
import useBaseValidator from './useBaseValidator'

const useRequired = (model: Ref, message: string = 'This field is required') : Validator => {
  const isValid = (value: any): boolean => value !== undefined && value !== null && (value.trim() !== '')

  return useBaseValidator(model, message, isValid)
}

export default useRequired
