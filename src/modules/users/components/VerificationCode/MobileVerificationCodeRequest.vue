<template>
  <div data-testid="verification-code-request">
    <TextInput
      v-model="mobile"
      class="mt-5"
      :validator="mobileValidator"
      :label="$t('Phone number')"
      :placeholder="$t('+9891xxxxxxxx')" />
    <ActionButton
      class="mt-5"
      :type="ButtonTypes.Primary"
      spinner-color="#fff"
      :full="true"
      @click="onClick"
      :is-processing="isProcessing">Send verification code</ActionButton>
  </div>
</template>

<script lang="ts" setup>
import TextInput from '@/components/ui/forms/TextInput.vue'
import ActionButton from '@/components/ui/forms/ActionButton.vue'

import { ref } from 'vue'
import ButtonTypes from '@/components/ui/forms/buttonTypes'
import useRequestVerificationCode from '../../services/verificationCodes/useRequestVerificationCode'

const {
  mobileValidator,
  mobile,
  request,
  isProcessing
} = useRequestVerificationCode()

const onClick = () => {
  request()
}
</script>
