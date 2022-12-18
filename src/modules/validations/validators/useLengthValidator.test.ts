import { test } from 'vitest'
import { ref } from 'vue'
import useLengthValidator from './useLengthValidator'

test.each([
  ['text is longer', 7, true],
  ['text is shorter', 20, false],
  ['text is equal', 13, true]
])('validate text length', (text, length, result) => {
  // arrange
  const model = ref(text)
  const validator = useLengthValidator(model, length)
  validator.touched()

  // assert
  expect(validator.isValid.value).toBe(result)
})