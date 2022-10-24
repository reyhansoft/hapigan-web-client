import { setActivePinia, createPinia } from 'pinia'
import { test, expect, beforeEach } from 'vitest'
import { VerificationCodeStep } from '../types'
import { useVerificationCodeStore } from './verificationCodesStore'

beforeEach(() => {
  setActivePinia(createPinia())
})

test('change step to verify', () => {
  // arrange
  const store = useVerificationCodeStore()
  const mobile = '+980000'
  const nextTryInSeconds = 60
  // act
  store.changeToVerify({
    nextTryInSeconds,
    mobile
  })

  // assert
  expect(store.nextTryInSeconds).toBe(nextTryInSeconds)
  expect(store.step).toBe(VerificationCodeStep.Verify)
  expect(store.lastTry).lessThanOrEqual(new Date())
  expect(store.mobile).toBe(mobile)
})


test('change step to request', () => {
  // arrange
  const store = useVerificationCodeStore()
  const mobile = '+980000'
  const nextTryInSeconds = 60
  store.changeToVerify({
    nextTryInSeconds,
    mobile
  })

  // act
  store.changeToRequest()

  // assert
  expect(store.step).toBe(VerificationCodeStep.Request)
})

test('clear state', () => {
  // arrange
  const store = useVerificationCodeStore()
  const mobile = '+980000'
  const nextTryInSeconds = 60
  store.changeToVerify({ nextTryInSeconds, mobile })

  // act
  store.clear()

  // assert
  expect(store.mobile).toBe('')
  expect(store.step).toBe(VerificationCodeStep.Request)
  expect(store.lastTry).toBe(null)
  expect(store.nextTryInSeconds).toBe(0)
})
