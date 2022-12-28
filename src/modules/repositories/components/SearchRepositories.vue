<template>
  <TextInput
    v-model="query"
    class="mt-5 mb-2"
    :placeholder="$t('Search repository')" />
  <div v-for="item in items" :key="item.id" class="border mb-2 rounded">
    <RepositoryListCard :repository="item"></RepositoryListCard>
  </div>
  <div v-if="!isProcessing && items.length === 0" class="text-center mt-5">
    <WarningIcon class="w-16 h-16 m-auto" />
    <h2 class="mt-3 mb-3 font-bold">{{ $t('No repositories found') }}</h2>
    <div v-if="lastQuery.trim() !== ''">{{ $t('Check your spelling or search for a different keyword')  }}</div>
    <div v-if="lastQuery.trim() === ''">
      <div>{{ $t('You still need to follow a repository! You can create or join existing repositories.')  }}</div>
      <div class="mt-5">
        <LinkButton class="!inline">Create a repository</LinkButton> <span>or</span> <a class="underline text-blue-600" href="javascript:">Join a repository</a>
      </div>
    </div>
  </div>
  <a href="javascript:" @click="onClickMore" v-if="!isProcessing && hasMore">{{ $t('Load more') }}</a>
  <LogoSpinner v-show="isProcessing" class="h-8 w-8 mx-auto"></LogoSpinner>
  
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import useSearchRepositories from '../services/useSearchRepositories'
import TextInput from '@/components/ui/forms/TextInput.vue'
import RepositoryListCard from './RepositoryListCard.vue'
import LogoSpinner from '@/components/ui/LogoSpinner.vue';
import OopsIcon from '@/modules/icons/Oops.vue'
import WarningIcon from '@/modules/icons/Warning.vue'
import LinkButton from '@/components/ui/forms/LinkButton.vue';

const props = defineProps({
  onlyMyRepositories: { type: Boolean, default: true }
})

const {
  lastQuery,
  isProcessing,
  hasMore,
  items,
  query,
  start,
  search
} = useSearchRepositories()

onMounted(async () => {
  await search()
})

const onClickMore = () => {
  start.value = items.value.length
}
</script>
