<template>
  <div class="mb-5">
    <h1 class="text-2xl">{{ $t('Create a new repository') }}</h1>
    <div class="mt-3">
      {{ $t('A repository is a place users can share their knowledge') }}
    </div>
    <div class="mt-8 flex flex-row" dir="ltr">
      <SelectRepository 
        class="grow"
        :label="$t('Parent')"
        :placeholder="$t('Without parent')"
        v-model="parent"
        :allowed-actions="['repository.create_sub']" />
      <div class="flex flex-col px-2 pb-1"><div>&nbsp;</div><div class="text-3xl">/</div></div>
      <TextInput
        class="grow"
        v-model="name"
        :validator="nameValidator"
        :label="$t('Repository name')"></TextInput>
    </div>
    <div class="mt-5 flex flex-row">
      <TextInput
        class="w-full"
        v-model="title"
        :validator="titleValidator"
        :label="$t('Title')"></TextInput>
    </div>
    <div class="mt-5">
      <MultiLineTextInput
        :label="$t('Description')"
        :validator="descriptionValidator"
        :description="$t('Short description of what you would share in your repository')"
        v-model="description" />
    </div>
    <div class="mt-5">
      <MultiLineTextInput
        :label="$t('Rules')"
        :validator="rulesValidator"
        :max-lines="8"
        :description="$t('Rules help you create a better repository. These are rules that members must follow to participate.')"
        v-model="rules" />
    </div>
    <div class="mt-5">
      <label class="font-bold block mb-1 text-sm">{{ $t('Visibility') }}</label>
      <div 
        @click="changeVisibility(1)"
        class="visibility" :class="{'visibility-selected': visibility === 1 }">
        <PublicIcon class="w-8 h-8 rtl:ml-3 ltr:mr-3 fill-green-600" />
        <div class="flex flex-col">
          <strong>{{ $t('Public') }}</strong>
          <span class="text-sm">{{ $t('Anyone can see this repository. You choose who can post.')}}</span>
        </div>
      </div>
      <div 
        @click="changeVisibility(2)"
        class="visibility mt-3"
        :class="{'visibility-selected': visibility === 2 }">
        <PrivateIcon class="w-8 h-8 rtl:ml-3 ltr:mr-3 fill-red-600" />
        <div class="flex flex-col">
          <strong>{{ $t('Private') }}</strong>
          <span class="text-sm">{{ $t('You choose who can see and post to this repository.')}}</span>
        </div>
      </div>
    </div>
    <div class="mt-8">
      <ActionButton @click="onCreate" :is-processing="isProcessing">{{ $t('Create') }}</ActionButton> 
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import TextInput from '@/components/ui/forms/TextInput.vue'
import SelectRepository from '../components/SelectRepository.vue';
import useCreateRepository from '../services/useCreateRepository'
import MultiLineTextInput from '@/modules/forms/MultiLineTextInput.vue'
import PublicIcon from '@/modules/icons/Public.vue';
import PrivateIcon from '@/modules/icons/Private.vue';
import ActionButton from '@/components/ui/forms/ActionButton.vue';
import { useRouter } from 'vue-router';
const {
  name,
  nameValidator,
  parent,
  description,
  descriptionValidator,
  title,
  titleValidator,
  visibility,
  isProcessing,
  changeVisibility,
  create,
  rules,
  rulesValidator
} = useCreateRepository()
const router = useRouter()

const onCreate = async () => {
  const result = await create()
  if (result.success) {
    router.push(`/r/${result.result.name}`)
  }
}

/* /^[~\P{Cc}\P{Cn}\P{Cs}]*$/u, /^[\p{L}\p{Nd}\p{P}\s]*$/u*/
</script>

<style lang="postcss" scoped>
.visibility {
  @apply flex cursor-pointer flex-row items-center p-3 rounded border bg-gray-50;
}
.visibility-selected {
  @apply bg-purple-50 border-purple-600
}
</style>