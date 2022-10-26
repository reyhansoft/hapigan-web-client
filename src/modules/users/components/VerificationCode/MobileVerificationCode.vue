<template>
  <MobileVerificationCodeRequest v-if="isRegister" />
  <MobileVerificationCodeVerify v-if="isVerify" />
</template>

<script lang="ts" setup>
import MobileVerificationCodeRequest from './MobileVerificationCodeRequest.vue'
import MobileVerificationCodeVerify from './MobileVerificationCodeVerify.vue'

import { useVerificationCodeStore } from '../../stores/verificationCodesStore'
import { computed, onMounted, onUnmounted } from '@vue/runtime-core'
import { VerificationCodeStep } from '../../types'

const store = useVerificationCodeStore()
const { changeToRequest, clear } = useVerificationCodeStore()

const isRegister = computed(() => store.step === VerificationCodeStep.Request)
const isVerify = computed(() => store.step === VerificationCodeStep.Verify)

onMounted(() => {
    changeToRequest()
})
onUnmounted(() => {
    clear()
})
</script>
