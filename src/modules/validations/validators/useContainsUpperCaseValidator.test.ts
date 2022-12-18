import { test } from 'vitest'
import { ref } from 'vue'
import useContainsUppercaseValidator from './useContainsUppercaseValidator'

test.each([
  ['text With upper case', true ],
  ['text without upper case', false],
  ['text With Multiple upper cases', true],
])('has uppercase', (text, result) => {
  // arrange
  const model = ref(text)
  const validator  = useContainsUppercaseValidator(model)
  validator.touched()
  
  // assert
  expect(validator.isValid.value).toBe(result)
})
