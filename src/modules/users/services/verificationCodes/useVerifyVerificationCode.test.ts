import { test, vi, afterEach, Mock } from 'vitest'
import { VerificationCodeState, VerificationCodeStep } from '../../types'
import { useVerificationCodeStore } from '../../stores/verificationCodesStore'
import useVerifyVerificationCode from './useVerifyVerificationCode'
import { verifyVerificationCode } from '../../api/verificationCodeApi'
import { useI18n } from '@/modules/i18n/'
import { useNotifications } from "@/modules/notifications/"
import { ApiError } from '@/modules/apiClient/types'
import useUserAuth from '../useUserAuth'
import useRequestVerificationCode from './useRequestVerificationCode'

vi.mock('./useRequestVerificationCode', () => {
  let _cache: any = null

  const useRequestVerificationCode = () => {
    if (!_cache) {
      _cache = {
        request: vi.fn()
      }
    }
    return _cache
  }
  return { default: useRequestVerificationCode }
})

vi.mock('../../stores/verificationCodesStore', () => {
  let _cache: any = null

  const useStore = () => {
    if (!_cache) {
      _cache = {
        mobile: '',
        lastTry: null,
        nextTryInSeconds: 0,
        step: VerificationCodeStep.Request,
        changeToVerify: vi.fn()
      }
    }
    return _cache
  }
  return { useVerificationCodeStore: useStore }
})

vi.mock('../useUserAuth', () => {
  let _cached: any = null
  const useUserAuth = () => {
    if (!_cached) {
      _cached = {
        setLoggedIn: vi.fn()
      }
    }
    return _cached
  }
  return { default: useUserAuth }
})

vi.mock('../../api/verificationCodeApi', () => {
  return {
    verifyVerificationCode: vi.fn()
  }
})

vi.mock('@/modules/i18n/index.ts', () => {
  let _cache: any = null
  if (!_cache) {
    _cache = {
      useI18n: () => ({
        t: vi.fn((msg) => msg)
      })
    }
  }
  return _cache
})


vi.mock("@/modules/notifications/index.ts", () => {
  let _cache: any = null
  const useNotifications = () => {
    if (!_cache) {
      _cache = {
        error: vi.fn(),
        success: vi.fn()
      }
    }
    return _cache
  }
  return { useNotifications }
})

afterEach(() => {
  vi.clearAllMocks()
})

test('code verified should set user logged in and show success messges', async () => {
  // arrange
  const store = useVerificationCodeStore()
  store.mobile = '+980000'
  const { verify } = useVerifyVerificationCode()
  const code = "VERIFICATION_CODE"
  const { setLoggedIn } = useUserAuth()
  const { success } = useNotifications()

  ;(verifyVerificationCode as Mock).mockImplementation(() => ({
    isAuthenticated: true,
    name: 'username',
    token: 'token'
  }))

  // act
  const result = await verify(code)

  // assert
  expect(verifyVerificationCode).toBeCalledWith(store.mobile, code)
  expect(setLoggedIn).toBeCalled()
  expect(success).toBeCalled()
  expect(result).toBeTruthy()
})

test('verify code failed should show error notification', async () => {
  const store = useVerificationCodeStore()
  store.mobile = '+980000'
  const { verify } = useVerifyVerificationCode()
  const code = "VERIFICATION_CODE"
  const { setLoggedIn } = useUserAuth()
  const { error } = useNotifications()
  const ERORR_MESSAGE = 'API ERROR MESSAGE'

  ;(verifyVerificationCode as Mock).mockImplementation(() => {
    throw new ApiError(ERORR_MESSAGE, 400)
  })

  // act
  const result = await verify(code)

  // assert
  expect(verifyVerificationCode).toBeCalledWith(store.mobile, code)
  expect(setLoggedIn).not.toBeCalled()
  expect(error).toBeCalledWith(ERORR_MESSAGE)
  expect(result).toBeFalsy()
})

test('request resending code before next try time should show error notification', async () => {
  // arrange
  const store = useVerificationCodeStore()
  store.nextTryInSeconds = 60
  store.lastTry = new Date()
  const { resendCode, canResendCode } = useVerifyVerificationCode()
  const requestVerificationCode = useRequestVerificationCode()
  const { error } = useNotifications()

  // act
  await resendCode()

  // assert
  expect(canResendCode.value).toBeFalsy()
  expect(error).toBeCalled()
  expect(requestVerificationCode.request).not.toBeCalled()
})

test('request resending code should call requst code', async () => {
  // arrange
  const store = useVerificationCodeStore()
  store.nextTryInSeconds = 60
  const now = new Date()
  now.setMinutes(now.getMinutes() - 2)
  store.lastTry = now
  const { resendCode, canResendCode } = useVerifyVerificationCode()
  const requestVerificationCode = useRequestVerificationCode()

  // act
  await resendCode()

  // assert
  expect(canResendCode.value).toBeTruthy()
  expect(requestVerificationCode.request).toBeCalled()
})
