<template>
  <a href="javascript:" class="flex p-2">
    <div class="grow">
      <div class="flex flex-col mb-2 only:mb-0">
        <a class="font-bold flex items-center" href="javascript:">
          {{ props.repository.title }}
          <span class="mx-2" v-if="props.visibilityType === 'icon'">
            <PrivateIcon v-if="props.repository.visibility.id === 2" class="w-4 ltr:mr-2 rtl:ml-2 fill-red-600" />
            <PublicIcon v-if="props.repository.visibility.id === 1" class="w-4 ltr:mr-2 rtl:ml-2 fill-green-600" />
          </span>
        </a>
        <span class="text-sm">{{ props.repository.name }}</span>
        <span v-if="props.showDescription">{{ props.repository.description }}</span>
      </div>
      <div class="flex" v-if="showBadgesBar">
        <div class="repository-badge" v-if="props.visibilityType === 'badge'">
          <PrivateIcon v-if="props.repository.visibility.id === 2" class="w-4 ltr:mr-2 rtl:ml-2 fill-red-600" />
          <PublicIcon v-if="props.repository.visibility.id === 1" class="w-4 ltr:mr-2 rtl:ml-2 fill-green-600" />
          {{ props.repository.visibility.name }}
        </div>
        <div class="repository-badge" v-if="props.showMembersCount">
          <UserIcon class="w-4 ltr:mr-2 rtl:ml-2" />
          <span>{{ props.repository.membersCount }}</span>
        </div>
        <div class="repository-badge" v-if="props.showPostsCount">
          <PostIcon class="w-4 ltr:mr-2 rtl:ml-2" />
          <span>{{ props.repository.postsCount }}</span>
        </div>
      </div>
    </div>
    <div v-if="props.showActionButton">
      <LinkButton>{{ props.repository.members.length === 0 ? $t('Join') : $t('Leave') }}</LinkButton>
    </div>
  </a>
</template>
<script lang="ts" setup>
import LinkButton from '@/components/ui/forms/LinkButton.vue';
import UserIcon from '@/modules/icons/User.vue'
import PostIcon from '@/modules/icons/Post.vue'
import PublicIcon from '@/modules/icons/Public.vue'
import PrivateIcon from '@/modules/icons/Private.vue'

import { defineProps, PropType, computed } from 'vue'
import { Repository } from '../types'

const props = defineProps({
  repository: { type: Object as PropType<Repository>, required: true },
  showActionButton: { type: Boolean, default: true },
  showMembersCount: { type: Boolean, default: true },
  showPostsCount: { type: Boolean, default: true },
  visibilityType: { type: String, default: 'badge' },
  showDescription: { type: Boolean, default: true }
})

const showBadgesBar = computed(() => props.showPostsCount || props.showMembersCount || props.visibilityType === 'badge')
</script>

<style lang="postcss" scoped>
.repository-badge {
  @apply flex p-2 bg-slate-100 rounded-sm text-sm ltr:mr-2 rtl:ml-2 shadow-sm;
}
</style>