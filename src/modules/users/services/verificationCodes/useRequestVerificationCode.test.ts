import { test, vi, afterEach } from 'vitest'
import { VerificationCodeState, VerificationCodeStep } from '../../types'
import { useVerificationCodeStore } from '../../stores/verificationCodesStore'
import useRequestVerificationCode from './useRequestVerificationCode'
import { requestVerificationCode } from '../../api/verificationCodeApi'
import { useI18n } from '@/modules/i18n/'
import { useNotifications } from "@/modules/notifications/"
import { ApiError } from '@/modules/apiClient/types'

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

const API_ERROR_MESSAGE = 'API_ERROR_MESSAGE'

vi.mock('../../api/verificationCodeApi', () => {
  let _cache: any = null
  if (!_cache) {
    _cache = {
      requestVerificationCode: vi.fn((mobile) => {
        if (mobile === 'ERROR_API') {
          throw new ApiError(API_ERROR_MESSAGE, 400)
        } else if (mobile === 'ERROR_UNEXPECTED') {
          throw new Error('UNEXPECTED_ERROR')
        }
        return {
          nextTryInSeconds: 60
        }
      })
    }
  }
  return _cache
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

afterEach(() => {
  vi.clearAllMocks()
})

test('request should call api', async () => {
  // arrange
  const mobile = "+9800000"
  const { request } = useRequestVerificationCode()

  // act
  await request(mobile)

  // assert
  expect(requestVerificationCode).toBeCalledWith(mobile)
})

test('request verification code successfully', async () => {
  // arrange
  const { step, changeToVerify } = useVerificationCodeStore()
  const { request } = useRequestVerificationCode()
  const mobile = "+9800000"

  // act
  await request(mobile)

  // assert
  expect(changeToVerify).toBeCalledWith(expect.objectContaining({ mobile }))
})


test('request failed', async () => {
  // arrange
  const { step, changeToVerify } = useVerificationCodeStore()
  const { request } = useRequestVerificationCode()
  const mobile = "ERROR_API"
  const { error } = useNotifications()

  // act
  await request(mobile)

  // assert
  expect(changeToVerify).not.toBeCalled()
  expect(error).toBeCalled()
})
