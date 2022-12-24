<template>
  <div 
    class="mx-auto rounded-md bg-slate-50 w-96 p-5 py-10 my-20 shadow">
    <router-link to="/" class="block">
      <MainLogo class="h-12" />
    </router-link>

		<TextInput
			dir="ltr"
      v-model="username"
      class="mt-5"
      :validator="usernameValidator"
      :label="$t('Username')"
      :placeholder="$t('Username')" />

		<TextInput
			dir="ltr"
      v-model="password"
      class="mt-5"
      type="password"
      :validator="passwordValidator"
      :label="$t('Password')"
      :placeholder="$t('Password')" />

		<ActionButton
      class="mt-5"
      :type="ButtonTypes.Primary"
      spinner-color="#fff"
      :full="true"
      @click="onClick"
      :is-processing="isProcessing">{{ $t('Log in') }}</ActionButton>
	</div>
</template>
<script lang="ts" setup>
import MainLogo from '@/components/app/MainLogo.vue'
import useLogin from '../services/useLogin'
import TextInput from '@/components/ui/forms/TextInput.vue'
import ActionButton from '@/components/ui/forms/ActionButton.vue'
import ButtonTypes from '@/components/ui/forms/buttonTypes'
import { onMounted } from 'vue'

const {
	username,
	password,
	usernameValidator,
	passwordValidator,
	isProcessing,
	logIn
} = useLogin()

const onClick = () => {
	logIn()
}
</script>
