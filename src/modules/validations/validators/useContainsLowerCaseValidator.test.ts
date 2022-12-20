import { test, beforeEach } from 'vitest'
import { ref } from 'vue'
import useContainsLowerCaseValidator from './useContainsLowerCaseValidator'
import { createPinia, Pinia, setActivePinia } from 'pinia'

let pinia: Pinia = createPinia()
beforeEach(() => {
  pinia = createPinia()
  setActivePinia(pinia)
})

test.each([
  ['TEXT WITH LOWER CaSE', true],
  ['TEXT WITHOUT LOWER CASE', false],
  ['text with MulTiple upper cases', true],
])('has lower case', (text, result) => {
  // arrange
  const model = ref(text)
  const validator  = useContainsLowerCaseValidator(model)
  validator.touched()
  
  // assert
  expect(validator.isValid.value).toBe(result)
})
