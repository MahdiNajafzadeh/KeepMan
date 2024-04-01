<script lang="ts">
import { RouterLink } from 'vue-router'
import { FwbDropdown, FwbListGroup, FwbListGroupItem, FwbButton } from 'flowbite-vue'
import { defineComponent } from 'vue';

export default defineComponent({
    components: {
        RouterLink,
        FwbButton,
        FwbDropdown,
        FwbListGroup,
        FwbListGroupItem
    },
    props: {
        username: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        logout() {
            console.log('logout');
        }
    }
})
</script>

<template>
    <div class="flex flex-row items-center">
        <div class="items-center">
            <FwbDropdown placement="bottom">
                <template #trigger>
                    <FwbButton color="alternative">
                        <div class="flex flex-row items-center justify-between">
                            <img src="/favicon.ico" class="h-8 pr-1" alt="user-img-profile">
                            <span v-if="username" class="text-black dark:text-white"> Username </span>
                        </div>
                    </FwbButton>
                </template>
                <FwbListGroup>
                    <RouterLink to="/profile">
                        <FwbListGroupItem>
                            Profile
                        </FwbListGroupItem>
                    </RouterLink>
                    <RouterLink to="/friends">
                        <FwbListGroupItem>
                            Friends
                        </FwbListGroupItem>
                    </RouterLink>
                    <RouterLink to="/">
                        <FwbListGroupItem>
                            Notes
                        </FwbListGroupItem>
                    </RouterLink>
                    <button @click="logout">
                        <FwbListGroupItem>
                            logout
                        </FwbListGroupItem>
                    </button>
                </FwbListGroup>
            </FwbDropdown>
        </div>
    </div>
</template>