import { test } from 'vitest'
import { ref } from 'vue'
import useLengthValidator from './useLengthValidator'

test.each([
  ['text is longer', 7, true],
  ['text is shorter', 20, false],
  ['text is equal', 13, true]
])('validate text min length', (text, length, result) => {
  // arrange
  const model = ref(text)
  const validator = useLengthValidator(model, length)
  validator.touched()

  // assert
  expect(validator.isValid.value).toBe(result)
})

test.each([
  ['text is longer', 7, false],
  ['text is shorter', 20, true],
  ['text is equal', 13, true]
])('validate text max length', (text, length, result) => {
  // arrange
  const model = ref(text)
  const validator = useLengthValidator(model, 0, length)
  validator.touched()

  // assert
  expect(validator.isValid.value).toBe(result)
})

test.each([
  ['text is shorter', 20, 30, false],
  ['text is between', 3, 20, true],
  ['text is longer', 3, 6, false]
])('validate text max length', (text, minLegnth, maxLength, result) => {
  // arrange
  const model = ref(text)
  const validator = useLengthValidator(model, minLegnth, maxLength)
  validator.touched()

  // assert
  expect(validator.isValid.value).toBe(result)
})
