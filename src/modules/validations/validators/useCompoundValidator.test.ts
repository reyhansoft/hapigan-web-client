import { test } from 'vitest'
import useCompoundValidator from './useCompoundValidator'
import { ref } from 'vue'
import { Validator } from '../types'
const createFakeValidator = () => ({
  validate: vi.fn(),
  isValid: ref(null),
  isTouched: ref(false),
  message: ref([]),
  touched: vi.fn()
}) as Validator
 
test('touch should call touch function of all validators', () => {
  // arrange
  const validators = [
    createFakeValidator(),
    createFakeValidator()
  ]
  const validator = useCompoundValidator(validators)

  // act
  validator.touched()

  // assert
  validators.forEach(validator => {
    expect(validator.touched).toBeCalled()
  })
})

test('validate should call validate function of all validators', () => {
  // arrange
  const validators = [
    createFakeValidator(),
    createFakeValidator()
  ]
  const validator = useCompoundValidator(validators)

  // act
  validator.validate()

  // assert
  validators.forEach(validator => {
    expect(validator.validate).toBeCalled()
  })
})

test('isValid should be null if all isValids are null', () => {
  // arrange
  const validators = [
    createFakeValidator(),
    createFakeValidator()
  ]
  const validator = useCompoundValidator(validators)

  // assert
  expect(validator.isValid.value).toBe(null)
})

test('isValid should be true if all of not null isValids are true', () => {
  // arrange
  const validators = [
    createFakeValidator(),
    createFakeValidator(),
    createFakeValidator()
  ]
  validators[0].isValid.value = true
  validators[1].isValid.value = true

  const validator = useCompoundValidator(validators)

  // assert
  expect(validator.isValid.value).toBe(true)
})

test('isValid should be false if any of not null isValids are true', () => {
  // arrange
  const validators = [
    createFakeValidator(),
    createFakeValidator(),
    createFakeValidator()
  ]
  validators[0].isValid.value = true
  validators[1].isValid.value = false

  const validator = useCompoundValidator(validators)

  // assert
  expect(validator.isValid.value).toBe(false)
})

test('isTouched should be true if any of isToucheds are true', () => {
  // arrange
  const validators = [
    createFakeValidator(),
    createFakeValidator(),
    createFakeValidator()
  ]
  validators[0].isTouched.value = true

  const validator = useCompoundValidator(validators)

  // assert
  expect(validator.isTouched.value).toBe(true)
})

test('message should only contains invalid validators', () => {
  // arrange
  const validators = [
    createFakeValidator(),
    createFakeValidator(),
    createFakeValidator()
  ]
  validators[0].isValid.value = true
  validators[1].isValid.value = false
  validators[1].message.value = ['Hello']

  const validator = useCompoundValidator(validators)

  // assert
  expect(validator.message.value.length).toBe(1)
})
