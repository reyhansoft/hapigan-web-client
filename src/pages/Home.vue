<template>
    <MainMenu />

    <div class="max-w-[740px] m-auto">
        <TabBar :items="tabs" />
        <SearchRepositories></SearchRepositories>
    </div>
    <ul>
        <li>is authenicated: {{ userStore.isAuthenticated }}</li>
        <li>is completed: {{ userStore.isCompleted }}</li>
        <li>name: {{ userStore.name }}</li>
        <li>username: {{ userStore.username }}</li>
    </ul>
</template>

<script lang="ts" setup>
import MainMenu from '@/components/app/MainMenu.vue'
import { useUserStore } from '@/modules/users/stores/userStore'
import TabBar from '@/components/ui/TabBar.vue'
import { useI18n } from '@/modules/i18n'
import SearchRepositories from '@/modules/repositories/components/SearchRepositories.vue';

const { t } = useI18n()

const tabs = [
    { id: 'following', title: t('Following'), selected: true },
    { id: 'popular', title:  t('Popular'), selected: false },
    { id: 'repositories', title:  t('Repositories'), selected: false }
]
const userStore = useUserStore()
</script>

<style>

</style>