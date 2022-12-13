<template>
    <div
      v-if="!isInited && !isInitFailed"
      class="flex items-center w-fit absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <LogoSpinner class="h-10 w-10" />
      <h1 class="font-bold text-2xl text-center mx-2">{{ $t('Loading...') }}</h1>
    </div>
  <div
    v-if="!isInited && isInitFailed"
    class="max-w-max items-center p-8 w-fit text-center flex flex-col rounded bg-slate-50 shadow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <WarningIcon fill="red" class="w-16" />
    <span class="text-xl font-bold mt-3">{{ $t('Oops!') }}</span>
    <span class="mx-2 whitespace-nowrap">{{ $t('Unfortunately initialization failed!') }}</span>
    <LinkButton class="w-fit mx-auto mt-3" @click="init">{{ $t('Try again') }}</LinkButton>
  </div>
  <router-view v-if="isInited"></router-view>
  <NotificationsContainer />
</template>

<script setup lang="ts">
import NotificationsContainer from '@/modules/notifications/components/NotificationsContainer.vue'
import LogoSpinner from '@/components/ui/LogoSpinner.vue'
import LinkButton from '@/components/ui/forms/LinkButton.vue'
import WarningIcon from '@/modules/icons/Warning.vue'

import { onMounted } from 'vue'
import appLifeCycleService from './services/common/appLifeCycleService'
import { ref } from 'vue'

const isInited = ref(false)
const isInitFailed = ref(false)
const init = async () => {
  let result = true
  isInitFailed.value = false
  for(const hook of appLifeCycleService.getOnMountHooks()) {
    result &&= await hook()
  }
  if (!result) {
    isInitFailed.value = true
  } else {
    isInited.value = true
  }
}

onMounted(async () => {
  await init()
})
</script>
