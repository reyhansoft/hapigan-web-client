<template>
	<div 
    class="mx-auto rounded-md bg-slate-50 w-96 p-5 py-10 my-20 shadow">
		<h1 class="font-bold text-lg">{{ $t('Complete your registration') }}</h1>
		<TextInput
      v-model="name"
      class="mt-5"
      :validator="nameValidator"
      :label="$t('Display name')"
      :placeholder="$t('Display name')" />

		<TextInput
      v-model="password"
      class="mt-5"
      :validator="passwordValidator"
      :label="$t('Password')"
      :placeholder="$t('Password')" />

		<TextInput
      v-model="verifyPassword"
      class="mt-5"
      :validator="passwordEqualValidator"
      :label="$t('Confirm password')"
      :placeholder="$t('Confirm password')" />

		<ActionButton
      class="mt-5"
      :type="ButtonTypes.Primary"
      spinner-color="#fff"
      :full="true"
      @click="onClick"
      :is-processing="isProcessing">{{ $t('Complete registration') }}</ActionButton>
	</div>
</template>

<script setup lang="ts">
import TextInput from '@/components/ui/forms/TextInput.vue'
import ActionButton from '@/components/ui/forms/ActionButton.vue'
import ButtonTypes from '@/components/ui/forms/buttonTypes'

import useRegisterCompletion from '../services/useRegisterCompletion'
import { useRouter } from 'vue-router';

const router = useRouter()

const { 
	name,
	password,
	verifyPassword,
	nameValidator,
	passwordValidator,
	passwordEqualValidator,
	completeRegistrationHandler,
	isProcessing
 } = useRegisterCompletion()

const onClick = async () => {
	const result = await completeRegistrationHandler()
   if (result) {
      router.push('/')
   }
}

</script>
