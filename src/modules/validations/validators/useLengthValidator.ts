import { Ref } from "vue"
import useBaseValidator from "./useBaseValidator"

const useLengthValidator = (model: Ref, length: number, message: string = `Text must be at least ${length} characters.`) => {
  const isValid = (value: any) => value != null && value != undefined && value.length >= length
  return useBaseValidator(model, message, isValid)
}

export default useLengthValidator
