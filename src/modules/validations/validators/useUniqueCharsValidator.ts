import { Ref } from 'vue'
import { Validator } from '../types'
import useBaseValidator from './useBaseValidator'

const useUniqueCharsValidator = (model: Ref, countOfUniqueChars: number, message: string = `Passwords must use at least ${countOfUniqueChars} different characters.`) : Validator => {
  const isValid = (value: any): boolean => 
    value !== undefined &&
    value !== null &&
    (countOfUniqueChars < 1 || (new Set(value).size >= countOfUniqueChars))

  return useBaseValidator(model, message, isValid)
}

export default useUniqueCharsValidator