<template>
  <header class="w-100 py-3 bg-slate-50 shadow sticky top-0">
    <nav class="mx-5 flex items-center">
      <a href="/">
        <MainLogo class="h-[32px]" />
      </a>
      <div class="grow"></div>
      <div>
        <LinkButton type="light mx-2">Sign up</LinkButton>
        <LinkButton type="primary">log in</LinkButton>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import LinkButton from '@/components/ui/forms/LinkButton.vue'
import MainLogo from './MainLogo.vue'
</script>

<style>
  .cls-1{fill:red;}
  .cls-2{fill:#fff;}
  .cls-3{fill:url(#linear-gradient);}
  .cls-4{fill:url(#linear-gradient-2);}
</style>