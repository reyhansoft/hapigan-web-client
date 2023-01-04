<template>
  <TextInput
    v-model="query"
    class="mb-2"
    :placeholder="$t('Search repository')" />
  <div>
    <div
      v-for="item in items"
      :key="item.id"
      class="border mb-2 last:mb-0 rounded bg-white" @click="onSelectItem(item)">
      <RepositoryListCard
        :repository="item"
        :show-description="full"
        :show-action-button="full"
        :show-members-count="full"
        :show-posts-count="full"
        visibility-type="icon"></RepositoryListCard>
    </div>
  </div>
  <div v-if="!isProcessing && items.length === 0 && full" class="text-center mt-5">
    <WarningIcon class="w-16 h-16 m-auto" />
    <h2 class="mt-3 mb-3 font-bold">{{ $t('No repositories found') }}</h2>
    <div v-if="lastQuery.trim() !== ''">{{ $t('Check your spelling or search for a different keyword')  }}</div>
    <div v-if="lastQuery.trim() === ''">
      <div>{{ $t('You still need to follow a repository! You can create or join existing repositories.')  }}</div>
      <div class="mt-5">
        <RouterLinkButton to="/repositories/new" class="!inline">Create a repository</RouterLinkButton> <span>or</span> <a class="underline text-blue-600" href="javascript:">Join a repository</a>
      </div>
    </div>
  </div>
  <div v-if="!isProcessing && items.length === 0 && !full" class="text-center mt-4">
    <h2 class="mb-2 text-sm font-bold">{{ $t('No repositories found') }}</h2>
  </div>  
  <a href="javascript:" @click="onClickMore" v-if="!isProcessing && hasMore">{{ $t('Load more') }}</a>
  <LogoSpinner v-show="isProcessing" class="h-8 w-8 mx-auto"></LogoSpinner>
</template>
<script setup lang="ts">
import { onMounted, computed, useAttrs } from 'vue'
import useSearchRepositories from '../services/useSearchRepositories'
import TextInput from '@/components/ui/forms/TextInput.vue'
import RepositoryListCard from './RepositoryListCard.vue'
import LogoSpinner from '@/components/ui/LogoSpinner.vue';
import WarningIcon from '@/modules/icons/Warning.vue'
import RouterLinkButton from '@/components/ui/forms/RouterLinkButton.vue';
import { Repository } from '../types';

const props = defineProps({
  onlyMyRepositories: { type: Boolean, default: true },
  allowedActions: { type: Array<string>, default: [] },
  type: { type: String, default: 'full' }
})

const emits = defineEmits(['select'])
const full = computed(() => props.type === 'full')

const {
  lastQuery,
  isProcessing,
  hasMore,
  items,
  query,
  start,
  search
} = useSearchRepositories({
  onlyMyRepositories: props.onlyMyRepositories,
  allowedActions: props.allowedActions
})

onMounted(async () => {
  await search()
})

const onClickMore = () => {
  start.value = items.value.length
}
const onSelectItem = (item: Repository) => {
  emits('select', item)
}
</script>
