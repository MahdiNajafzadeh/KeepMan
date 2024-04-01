<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        showIcon: {
            type: Boolean,
            default: true,
        },
        showTitle: {
            type: Boolean,
            default: true,
        }
    }
})
</script>

<template>
    <div>
        <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
            <!-- Brand-Title -->
            <!-- md >= -->
            <img v-if="showIcon" src="/favicon.ico" class="md:block hidden h-9" alt="Keepman-Logo" />
            <!-- Brand Icon -->
            <span v-if="showTitle" class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Keepman
            </span>
        </a>
    </div>
</template>