<template>
  <div data-testid="verification-code-verify">
    <div class="mt-3 text-sm">
      <span v-html="topMessage"></span>
      <a href="javascript:" @click="onClickChangePhoneNumber" class="link">{{ $t('Change your phone number') }}</a>
    </div>
    <TextInput 
      v-model="code"
      class="mt-5"
      :label="$t('Verification code')"
      @keypress.enter="onClickVerify"
      :placeholder="$t('_ _ _ _ _')"
      :validator="codeValidator"/>
    <ActionButton
      class="mt-5"
      :type="ButtonTypes.Primary"
      spinner-color="#fff"
      :full="true"
      @click="onClickVerify"
      :is-processing="isProcessing">{{ $t('Verify') }}</ActionButton>
    <span class="mt-2 text-sm text-center" v-if="!canResendCode" v-html="resendMessage"></span>
    <ActionButton
      v-if="canResendCode"
      class="mt-3"
      :type="ButtonTypes.Secondary"
      spinner-color="#fff"
      :full="true"
      @click="onClickResend"
      :is-processing="isResendingVerificationCode">{{ $t('Resend verification code') }}</ActionButton>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from '@/modules/i18n';
import useVerifyVerificationCode from '../../services/verificationCodes/useVerifyVerificationCode'
import TextInput from '@/components/ui/forms/TextInput.vue'
import ButtonTypes from '@/components/ui/forms/buttonTypes'
import ActionButton from '@/components/ui/forms/ActionButton.vue'
import { onMounted, onUnmounted } from 'vue'
import { computed } from '@vue/reactivity';
import { useRouter } from 'vue-router';

const {
  code,
  mobile,
  changePhoneNumber,
  codeValidator,
  verify,
  isProcessing,
  isResendingVerificationCode,
  canResendCode,
  remainingSecondsForResend,
  startTimer,
  resendCode,
  stopTimer
} = useVerifyVerificationCode()
const { t } = useI18n()
const router = useRouter()

const topMessage = t('The verficiation code has been sent to <strong>{0}</strong>. ', mobile)
const resendMessage = computed(() => t('Resend verification code in <strong>{0}</strong> seconds.', remainingSecondsForResend.value.toString()))
onMounted(() => {
  startTimer()
})

onUnmounted(() => {
  stopTimer()
})

const onClickChangePhoneNumber = () => {
  changePhoneNumber()
}

const onClickVerify = async () => {
  const result = await verify()
  if (result.success) {
    if (!result.isCompleted) {
      router.push('/register/completion')
    } else {
      // TODO: reset password
      // router.push('/account/reset-password', { token })
      router.push('/')
    }
  }
}

const onClickResend = () => {
  resendCode()
}

</script>
