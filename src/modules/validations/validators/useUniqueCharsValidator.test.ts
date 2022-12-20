import { test, beforeEach } from 'vitest'
import { nextTick, ref } from 'vue'
import useUniqueCharsValidator from './useUniqueCharsValidator'
import { createPinia, Pinia, setActivePinia } from 'pinia'

let pinia: Pinia = createPinia()
beforeEach(() => {
  pinia = createPinia()
  setActivePinia(pinia)
})

test('required unique chars greater than zero', async () => {
  // arrange
  const model = ref('test')
  const countOfUniqueChars = 4
  const validator = useUniqueCharsValidator(model, countOfUniqueChars)
  
  // act
  validator.touched()
  const firstResult = validator.isValid.value
  model.value = 'Test'
  await nextTick()

  // assert
  expect(firstResult).toBeFalsy()
  expect(validator.isValid.value).toBeTruthy()
})

test('required unique chars greater is zero', async () => {
  // arrange
  const model = ref('test')
  const countOfUniqueChars = 0
  const validator = useUniqueCharsValidator(model, countOfUniqueChars)

  // act
  validator.touched()
  
  // assert
  expect(validator.isValid.value).toBeTruthy()
})

test('message should contains count', async () => {
  // arrange
  const model = ref('test')
  const countOfUniqueChars = 5
  const name = 'Passwords'
  const validator = useUniqueCharsValidator(model, countOfUniqueChars, name)
  const expectedMessage = `${name} must use at least ${countOfUniqueChars} different characters.`
  // act
  validator.touched()
  
  // assert
  expect(validator.isValid.value).toBeFalsy()
  expect(validator.message.value[0]).toBe(expectedMessage)
})