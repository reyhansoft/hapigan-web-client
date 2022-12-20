import { useI18n } from "@/modules/i18n"
import { Ref } from "vue"
import useBaseValidator from "./useBaseValidator"

const useRegexValidator = (
  model: Ref,
  pattern: RegExp,
  name: string = useI18n().t('This field'),
  message: string = useI18n().t('{0} pattern is not valid', name)
) => {
  const isValid = (value: any) => {
    return pattern.test(value)
  }
  return useBaseValidator(model, message, isValid)
}

export default useRegexValidator
