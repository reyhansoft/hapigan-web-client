import { createPinia, Pinia, setActivePinia } from 'pinia'
import { test, beforeEach } from 'vitest'
import { ref } from 'vue'
import useAllowedCharacters from './useAllowedCharactersValdator'

let pinia: Pinia = createPinia()
beforeEach(() => {
  pinia = createPinia()
  setActivePinia(pinia)
})

test('contains invalid characters', () => {
  // arrange
  const model = ref('Ab cd 2321')
  const validChars = 'abcd'
  const validator = useAllowedCharacters(model, validChars)
  // act
  validator.touched()

  // assert
  expect(validator.isValid.value).toBeFalsy()
})

test('contains valid characters', () => {
  // arrange
  const model = ref('aBcde182')
  const validChars = 'abcdefABCDEF0123456789'
  const validator = useAllowedCharacters(model, validChars)

  // act
  validator.touched()

  // assert
  expect(validator.isValid.value).toBeTruthy()
})