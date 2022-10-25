<template>
  <div 
    class="mx-auto rounded-md bg-slate-50 w-96 p-5 py-10 my-20 shadow"
    data-testid="verification-code-request">
    <router-link to="/" class="block">
      <MainLogo class="h-12" />
    </router-link>
    <TextInput
      v-model="mobile"
      class="mt-10"
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
import MainLogo from '@/components/app/MainLogo.vue'
import TextInput from '@/components/ui/forms/TextInput.vue'
import Spinner from '@/components/ui/BallSpinner.vue'
import ActionButton from '@/components/ui/forms/ActionButton.vue'

import { ref } from 'vue'
import ButtonTypes from '@/components/ui/forms/buttonTypes'
import useRequestVerificationCode from '../../services/verificationCodes/useRequestVerificationCode'

const { 
  mobile: currentMobile,
  request,
  isProcessing
} = useRequestVerificationCode()

const mobile = ref(currentMobile)
const onClick = () => {
  request(mobile.value)
}
</script>
