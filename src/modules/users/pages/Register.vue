<template>
  <div 
    class="mx-auto rounded-md bg-slate-50 w-96 p-5 py-10 my-20 shadow">
    <router-link to="/" class="block">
      <MainLogo class="h-12" />
    </router-link>

    <h1 class="mt-5 text-lg font-bold">{{ $t('Create your Hapigan Account') }}</h1>
    <div class="text-sm">{{ $t('By continuing, you are agree to our') }} <a class="link" href="/terms" target="_blank">{{ $t('Terms of Service') }}</a> {{ $t('and')}} <a class="link" href="/privacy" target="_blank">{{ $t('Privacy Policy') }}</a></div>  
    <MobileVerificationCodeVue />
    <div class="mt-5">{{ $t('Already have an account?') }} <router-link class="link" to="/login"><strong>{{ $t('Log in')}}</strong></router-link></div>
  </div>
</template>

<script lang="ts" setup>
import MainLogo from '@/components/app/MainLogo.vue'
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import MobileVerificationCodeVue from '../components/VerificationCode/MobileVerificationCode.vue'
import { useUserStore } from '../stores/userStore';

const store = useUserStore()
const router = useRouter()

onMounted(() => {
  if (store.isAuthenticated) {
    router.push('/')
  }
})
</script>
