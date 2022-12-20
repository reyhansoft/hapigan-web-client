import { test, beforeEach } from 'vitest'
import { ref } from 'vue'
import useContainsDigitValidator from './useContainsDigitValidator'
import { createPinia, Pinia, setActivePinia } from 'pinia'

let pinia: Pinia = createPinia()
beforeEach(() => {
  pinia = createPinia()
  setActivePinia(pinia)
})

test.each([
  ['Contains digit 1', true],
  ['Text without any digit', false],
  ['contains multiple 0 digits 9', true],
])('has lower case', (text, result) => {
  // arrange
  const model = ref(text)
  const validator  = useContainsDigitValidator(model)
  validator.touched()
  
  // assert
  expect(validator.isValid.value).toBe(result)
})
