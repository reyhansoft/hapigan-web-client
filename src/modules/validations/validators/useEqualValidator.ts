import { useI18n } from '@/modules/i18n'
import { Ref } from 'vue'
import { Validator } from '../types'
import useBaseValidator from './useBaseValidator'
import useCompoundValidator from './useCompoundValidator'

const useEqualValidator = (
  first: Ref,
  second: Ref,
  message: string = useI18n().t('Values do not match')
) : Validator => {
  const isValid = (value: any): boolean => first.value === second.value

  return useCompoundValidator([
    useBaseValidator(first, message, isValid),
    useBaseValidator(second, message, isValid),
  ])
}

export default useEqualValidator
