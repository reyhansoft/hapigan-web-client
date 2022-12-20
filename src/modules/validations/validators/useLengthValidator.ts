import { useI18n } from "@/modules/i18n"
import { Ref } from "vue"
import useBaseValidator from "./useBaseValidator"

const useLengthValidator = (
  model: Ref,
  minLegnth: number = 0,
  maxLength: number = Number.MAX_VALUE,
  name: string = 'This field',
  message: string = useI18n().t(
    minLegnth > 0 && maxLength < Number.MAX_VALUE 
      ? '{0} must be at least {1} and at most {2} characters'
      : minLegnth == 0 && maxLength < Number.MAX_VALUE
      ? '{0} must be at most {2} characters'
      : minLegnth > 0 && maxLength == Number.MAX_VALUE
      ? '{0} must be at least {1} characters'
      : ''
  , name, minLegnth, maxLength) 
) => {
  const isValid = (value: any) => value != null && value != undefined && value.length >= minLegnth && value.length <= maxLength
  return useBaseValidator(model, message, isValid)
}

export default useLengthValidator
