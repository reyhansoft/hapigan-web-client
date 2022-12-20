import { Ref } from "vue"
import useBaseValidator from "./useBaseValidator"

const useLengthValidator = (model: Ref, minLegnth: number = 0, maxLength: number = Number.MAX_VALUE, message: string = `Text must be at least ${minLegnth}${maxLength < Number.MAX_VALUE ? ` and at most ${maxLength}`:''} characters.`) => {
  const isValid = (value: any) => value != null && value != undefined && value.length >= minLegnth && value.length <= maxLength
  return useBaseValidator(model, message, isValid)
}

export default useLengthValidator
