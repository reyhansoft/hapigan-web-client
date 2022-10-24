import { render } from '@testing-library/vue'
import MobileVerificationCode from './MobileVerificationCode.vue'
import { expect, test, vi, afterEach } from 'vitest'
import { useVerificationCodeStore } from '../../stores/verificationCodesStore'
import { VerificationCodeStep } from '../../types'
import { ref } from 'vue'

vi.mock('../../stores/verificationCodesStore', () => {
  let _cache: any = null

  const obj = () => {
    if (!_cache) {
      _cache = {
        clear: vi.fn(),
        changeToRequest: vi.fn(),
        step: VerificationCodeStep.Request
      }
    }
    return _cache
  }
  return { useVerificationCodeStore: obj }
})

afterEach(() => {
  vi.clearAllMocks()
})

test('should render regitser step', () => {
  // arrange
  const { getByTestId } = render(MobileVerificationCode, {})
  // act

  // assert
  expect(getByTestId("verification-code-request")).not.toBe(null)
})

test('changeToRequest should be called on mount', () => {
  // arrange
  const { getByTestId } = render(MobileVerificationCode, {})
  const { changeToRequest } = useVerificationCodeStore()

  // assert
  expect(changeToRequest).toBeCalled()
})

test('should render verify step', () => {
  // arrange
  const store = useVerificationCodeStore()

  // act
  store.step = VerificationCodeStep.Verify
  const { getByTestId } = render(MobileVerificationCode, {})

  // assert
  expect(getByTestId("verification-code-verify")).not.toBe(null)
})
