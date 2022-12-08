import { test } from 'vitest'
import { createPinia, Pinia, setActivePinia } from 'pinia'
import { fireEvent, getByText, render, waitFor } from '@testing-library/vue'
import MobileVerificationCodeVerify from './MobileVerificationCodeVerify.vue'
import { i18n } from '@/modules/i18n'
import router from '@/router'
import { useVerificationCodeStore } from '../../stores/verificationCodesStore'
import { requestVerificationCode, verifyVerificationCode } from '../../api/verificationCodeApi'
import { nextTick } from 'vue'

let pinia: Pinia = createPinia()
beforeEach(() => {
  pinia = createPinia()
  setActivePinia(pinia)
})

afterEach(() => {
  vi.clearAllMocks()
})

vi.mock('../../api/verificationCodeApi', () => {
  return {
    requestVerificationCode: vi.fn(),
    verifyVerificationCode: vi.fn()
  }
})

test('should show the mobile number that code sent to it', async () => {
  // arrange
  const store = useVerificationCodeStore()
  store.changeToVerify({
    nextTryInSeconds: 60,
    mobile: '+989123456789',
    token: '1qaz'
  })
  const { findByText } = render(MobileVerificationCodeVerify, {
    global: {
      plugins: [i18n, pinia, router]
    }
  })

  // act
  const el = await findByText(store.mobile)

  // assert
  expect(el).not.toBeNull()
})

test('should update next resend timer', async () => {
  // arrange
  const store = useVerificationCodeStore()
  store.changeToVerify({
    nextTryInSeconds: 60,
    mobile: '+989123456789',
    token: '1qaz'
  })
  const { getByText } = render(MobileVerificationCodeVerify, {
    global: {
      plugins: [i18n, pinia, router]
    }
  })

  // assert
  await waitFor(() => {
    expect(getByText('59')).not.toBeNull()
  })
  
  await waitFor(() => {
    expect(getByText('58')).not.toBeNull()
  })
})

test('should show resend button after next try time passed', async () => {
  // arrange
  const store = useVerificationCodeStore()
  store.changeToVerify({
    nextTryInSeconds: 1,
    mobile: '+989123456789',
    token: '1qaz'
  })
  const { getByText } = render(MobileVerificationCodeVerify, {
    global: {
      plugins: [i18n, pinia, router]
    }
  })

  // assert
  await waitFor(() => {
    expect(getByText('Resend verification code')).not.toBeNull()
  })
})

test('click on resend code should call requestVerificationCode', () => {
  // arrange
  const mobile = '+989123456789'
  const store = useVerificationCodeStore()
  store.changeToVerify({
    nextTryInSeconds: -1,
    mobile,
    token: '1qaz'
  })
  const { getByText } = render(MobileVerificationCodeVerify, {
    global: {
      plugins: [i18n, pinia, router]
    }
  })

  // act
  const el = getByText('Resend verification code')
  el.click()

  // assert
  expect(requestVerificationCode).toBeCalledWith(mobile)
})

test('empty code should not invoke verifyVerificationCode', () => {
  // arrange
  const mobile = '+989123456789'
  const store = useVerificationCodeStore()
  store.changeToVerify({
    nextTryInSeconds: -1,
    mobile,
    token: '1qaz'
  })
  const { getByText } = render(MobileVerificationCodeVerify, {
    global: {
      plugins: [i18n, pinia, router]
    }
  })

  // act
  const el = getByText('Verify')
  el.click()

  // assert
  expect(verifyVerificationCode).not.toBeCalled()
})

test('not empty code should invoke verifyVerificationCode', async () => {
  // arrange
  const mobile = '+989123456789'
  const code = '12345'
  const token = '1qaz2wssx'
  const store = useVerificationCodeStore()
  store.changeToVerify({
    nextTryInSeconds: -1,
    mobile,
    token
  })
  const { getByPlaceholderText, getByText } = render(MobileVerificationCodeVerify, {
    global: {
      plugins: [i18n, pinia, router]
    }
  })

  // act
  const el = getByPlaceholderText('_ _ _ _ _')
  await fireEvent.update(el, code)
  const button = getByText('Verify')
  button.click()
  // assert
  expect(verifyVerificationCode).toBeCalledWith(mobile, code, token)
})

