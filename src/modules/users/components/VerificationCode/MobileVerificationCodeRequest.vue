<template>
  <div 
    class="mx-auto rounded-md bg-slate-50 w-96 p-5 py-10 my-20 shadow"
    data-testid="verification-code-request">
    <router-link to="/" class="block">
      <MainLogo class="h-12" />
    </router-link>

    <h1 class="mt-5 text-lg font-bold">{{ $t('Create your Hapigan Account') }}</h1>
    <div class="text-sm">{{ $t('By continuing, you are agree to our') }} <a class="link" href="/terms" target="_blank">{{ $t('Terms of Service') }}</a> {{ $t('and')}} <a class="link" href="/privacy" target="_blank">{{ $t('Privacy Policy') }}</a></div>
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
    
    <div class="mt-5">{{ $t('Already have an account?') }} <router-link class="link" to="/login"><strong>{{ $t('Log in')}}</strong></router-link></div>
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
  mobileValidator,
  mobile,
  request,
  isProcessing
} = useRequestVerificationCode()

const onClick = () => {
  request()
}
</script>
