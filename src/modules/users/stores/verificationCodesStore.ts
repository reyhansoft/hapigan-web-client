import { defineStore } from 'pinia'
import { ChangeToVerifyArg, VerificationCodeState, VerificationCodeStep } from '../types'

export const useVerificationCodeStore = defineStore('verification-code', {
  state: () => ({
    mobile: '',
    nextTryInSeconds: 0,
    lastTry: null,
    step: VerificationCodeStep.Request
  }) as VerificationCodeState,
  actions: {
    clear() {
      this.mobile = ''
      this.nextTryInSeconds = 0
      this.lastTry = null
      this.step = VerificationCodeStep.Request
    },
    changeToRequest() {
      this.step = VerificationCodeStep.Request
    },
    changeToVerify({ nextTryInSeconds, mobile } : ChangeToVerifyArg) {
      this.step = VerificationCodeStep.Verify
      this.lastTry = new Date()
      this.nextTryInSeconds = nextTryInSeconds
      this.mobile = mobile
    }
  }
})
