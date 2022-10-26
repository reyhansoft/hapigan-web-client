import { render, waitFor } from '@testing-library/vue'
import MobileVerificationCode from './MobileVerificationCode.vue'
import { expect, test, vi, afterEach } from 'vitest'
import { useVerificationCodeStore } from '../../stores/verificationCodesStore'
import { VerificationCodeStep } from '../../types'
import { ref } from 'vue'
import { setActivePinia, createPinia, Pinia } from 'pinia'
import { i18n } from '@/modules/i18n'
import wait from '@/services/common/wait'
import router from '@/router'

let pinia: Pinia = createPinia()
beforeEach(() => {
  pinia = createPinia()
  setActivePinia(pinia)
})

afterEach(() => {
  vi.clearAllMocks()
})

test('should render regitser step', () => {
  // arrange
  const { queryByTestId } = render(MobileVerificationCode, {
    global: {
      plugins: [i18n, router, pinia]
    }
  })
  // act

  // assert
  expect(queryByTestId("verification-code-request")).not.toBe(null)
  expect(queryByTestId("verification-code-verify")).toBe(null)
})

test('changeToRequest should be called on mount', () => {
  // arrange
  let store = useVerificationCodeStore()
  store.step = VerificationCodeStep.Verify
  render(MobileVerificationCode, {
    global: {
      plugins: [i18n, pinia, router]
    }
  })

  // assert
  expect(store.step).toBe(VerificationCodeStep.Request)
})

test('should render verify step', async () => {
  // arrange
  const store = useVerificationCodeStore()

  // act
  const { queryByTestId } = render(MobileVerificationCode, {
    global: {
      plugins: [i18n, pinia, router]
    }
  })
  store.step = VerificationCodeStep.Verify

  // assert
  await waitFor(() => {
    expect(queryByTestId("verification-code-request")).toBe(null)
    expect(queryByTestId("verification-code-verify")).not.toBe(null)
  })
})
