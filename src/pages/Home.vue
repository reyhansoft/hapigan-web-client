<template>
    <ul>
        <li>is authenicated: {{ userStore.isAuthenticated }}</li>
        <li>is completed: {{ userStore.isCompleted }}</li>
        <li>name: {{ userStore.name }}</li>
        <li>username: {{ userStore.username }}</li>
    </ul>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/modules/users/stores/userStore';

const userStore = useUserStore()
</script>

<style>

</style>