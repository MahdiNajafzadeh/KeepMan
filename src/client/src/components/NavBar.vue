<script lang="ts">
import { defineComponent, ref } from 'vue'
import UserProfileDropdown from './NavBar/UserProfileDropdown.vue'
import NavBrand from './NavBar/NavBrand.vue';
import { useProfileStore } from '../stores/Profile';

export default defineComponent({
    setup() {
        const profileStore = useProfileStore()
        const username = ref('')
        username.value = profileStore.profile.username
        return {
            username
        }
    },
    props: {
        showUsername: {
            type: Boolean,
            default: true
        }
    },
    components: {
        UserProfileDropdown,
        NavBrand
    }
})
</script>

<template>
    <!-- <nav class="bg-white border-gray-200 dark:bg-gray-900"> -->
    <nav class="border border-b border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-800">
        <div class="max-w-screen-xl flex items-center justify-between mx-auto p-4">
            <!-- Nav-brand -->
            <NavBrand />
            <!-- Search-Bar -->
            <!-- md >= -->
            <div class="hidden md:block w-1/2">
                <div class="relative">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-300" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                        <span class="sr-only">Search icon</span>
                    </div>
                    <input type="text" id="search-navbar"
                        class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-200 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search...">
                </div>
            </div>

            <!-- User-Profile -->
            <!-- md >= -->
            <div class="hidden md:block">
                <UserProfileDropdown :username="username" />
            </div>

            <!-- Search-Bar & User-Profile -->
            <!-- <= sm -->
            <div class="block md:hidden">
                <div class="flex flex-row items-center">
                    <!-- Search-Bar -->
                    <button type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search"
                        aria-expanded="false"
                        class="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1">
                        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                        <span class="sr-only">Search</span>
                    </button>
                    <!-- User-Profile -->
                    <UserProfileDropdown :username="username" />
                </div>
            </div>
        </div>
    </nav>
</template>

<style scoped></style>