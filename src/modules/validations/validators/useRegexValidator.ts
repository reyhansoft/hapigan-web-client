import { Ref } from "vue"
import useBaseValidator from "./useBaseValidator"

const useRegexValidator = (model: Ref, pattern: RegExp, message: string = 'The pattern of this field is not valid') => {
  const isValid = (value: any) => {
    return pattern.test(value)
  }
  return useBaseValidator(model, message, isValid)
}

export default useRegexValidator
