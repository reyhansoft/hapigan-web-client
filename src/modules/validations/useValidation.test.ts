import { test } from 'vitest'
import useValidation from './useValidation'
import { ref } from 'vue'
const createFakeValidator = () => ({
  validate: vi.fn(),
  isValid: ref(null),
  isTouched: ref(false),
  message: '',
  touched: () => {}
})

test('should call validate on validators', () => {
  // arrange
  const validators = [
    createFakeValidator(),
    createFakeValidator()
  ]
  const { validate } = useValidation(validators)

  // act
  validate()

  // assert
  validators.forEach(validator => {
    expect(validator.validate).toBeCalled()
  });
})
