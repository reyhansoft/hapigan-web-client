import { test } from 'vitest'
import useEqualValidator from './useEqualValidator'
import { nextTick, ref } from 'vue'

test('values do not match', async () => {
  // arrange
  const first = ref(1)
  const second = ref(2)

  const validator = useEqualValidator(first, second)

  // act
  validator.touched()
  await nextTick()

  // assert
  expect(validator.isValid.value).toBe(false)
})

test('values do match', async () => {
  // arrange
  const first = ref(1)
  const second = ref(2)

  const validator = useEqualValidator(first, second)

  // act
  validator.touched()
  second.value = 1
  await nextTick()

  // assert
  expect(validator.isValid.value).toBe(true)
})