<script lang="ts">
import { defineComponent } from 'vue'
import { FwbButton } from 'flowbite-vue'
// import { resize } from '@/lib/events.js'

export default defineComponent({
    components: {
        FwbButton
    },
    mounted() {

    },
    data() {
        return {
            friends: [
                { username: 'user-1', status: 'accept' },
                { username: 'user-2', status: 'accept' },
                { username: 'user-3', status: 'accept' },
                { username: 'user-4', status: 'accept' },
                { username: 'user-4', status: 'accept' },
                { username: 'user-4', status: 'accept' },
                { username: 'user-4', status: 'accept' },
                { username: 'user-4', status: 'accept' },
                { username: 'user-4', status: 'accept' },
                { username: 'user-4', status: 'accept' },
                { username: 'user-4', status: 'accept' },
                { username: 'user-4', status: 'accept' },
                { username: 'user-4', status: 'accept' },
            ],
        }
    },
    methods: {

    }
})
</script>

<template>
    <main class="m-4">
        <h1 class="text-4xl mb-4 dark:text-white text-black">Friends</h1>
        <hr class="mb-4">
        <div class="flex flex-row flex-wrap ">
            <div v-for="(friend, index) in friends" :key="index"
                class="mx-1 mb-2 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a class="flex flex-row items-center" href="#">
                    <img class="w-12 h-12 m-2" src="/favicon.ico" alt="user-profile-image">
                    <h5 class="mb-2 text-2xl tracking-tight text-gray-900 dark:text-white">{{ friend.username }}</h5>
                </a>
                <div class="flex flex-row-reverse">
                    <FwbButton class="m-1">{{ friend.status }}</FwbButton>
                    <FwbButton class="m-1"> Show </FwbButton>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped></style>