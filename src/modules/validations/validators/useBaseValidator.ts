import { computed, Ref, ref, watch } from 'vue'
import { Validator } from '../types'

const useBaseValidator = (model: Ref, message: string, getIsValid: (value: any) => boolean ) : Validator => {
  const isValid = computed(() => {
    if (!_isTouched.value) return null
    return getIsValid(model.value)
  })
  const _isTouched = ref(false)
  const isTouched = computed(() => _isTouched.value)

  watch(model, (newValue) => {
    _isTouched.value = true
  })

  return {
    validate: () => {
      _isTouched.value = true
      const result = getIsValid(model.value)
      return result
    },
    touched: () => {
      _isTouched.value = true
    },
    isTouched,
    isValid,
    message: computed(() => [message])
  }
}

export default useBaseValidator
