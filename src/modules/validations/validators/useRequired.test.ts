import { test } from 'vitest'
import useRequired from './useRequired'
import { nextTick, ref } from 'vue'


test('default isValid should be null', () => {
  // arrange
  const model = ref('')
  const { isValid } = useRequired(model)

  // assert
  expect(isValid.value).toBe(null)
})

test('validate model should change isValid', async () => {
  // arrange
  const model = ref('')
  const { validate, isValid } = useRequired(model)

  // act
  const result = validate()
  await nextTick()

  // assert
  expect(isValid.value).toBeFalsy()
  expect(result).toBeFalsy()
})

test('change model should change isValid', async () => {
  // arrange
  const model = ref('')
  const { isValid } = useRequired(model)

  // act
  model.value = 'hello'
  await nextTick()

  // assert
  expect(isValid.value).toBeTruthy()
})
