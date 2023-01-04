<template>
  <header class="w-100 py-3 bg-slate-50 shadow sticky top-0 z-10">
    <nav class="mx-5 flex items-center">
      <a href="/">
        <MainLogo class="h-[32px]" />
      </a>
      <div class="grow"></div>
      <div>
        <RouterLinkButton to="/register" type="light mx-2">{{ $t('Sign up') }}</RouterLinkButton>
        <RouterLinkButton to="/login" type="primary">{{ $t('Log in') }}</RouterLinkButton>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import RouterLinkButton from '@/components/ui/forms/RouterLinkButton.vue'
import MainLogo from './MainLogo.vue'

</script>

<style>
  .cls-1{fill:#6d28d9;}
  .cls-2{fill:#fff;}
  .cls-3{fill:url(#linear-gradient);}
  .cls-4{fill:url(#linear-gradient-2);}
</style>