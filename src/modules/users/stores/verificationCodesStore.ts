import { defineStore } from 'pinia'
import { ChangeToVerifyArg, VerificationCodeState, VerificationCodeStep } from '../types'

export const useVerificationCodeStore = defineStore('verification-code', {
  state: () => ({
    mobile: '',
    nextTryInSeconds: 0,
    lastTry: null,
    step: VerificationCodeStep.Request,
    token: null
  }) as VerificationCodeState,
  actions: {
    clear() {
      this.mobile = ''
      this.nextTryInSeconds = 0
      this.lastTry = null
      this.step = VerificationCodeStep.Request
      this.token = null
    },
    changeToRequest() {
      this.step = VerificationCodeStep.Request
    },
    changeToVerify({ nextTryInSeconds, mobile, token } : ChangeToVerifyArg) {
      this.step = VerificationCodeStep.Verify
      this.lastTry = new Date()
      this.nextTryInSeconds = nextTryInSeconds
      this.mobile = mobile
      this.token = token
    }
  }
})
