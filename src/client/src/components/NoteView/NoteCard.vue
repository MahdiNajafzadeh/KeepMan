<script lang="ts">
import { defineComponent } from 'vue'
import { FwbButton } from 'flowbite-vue'

export default defineComponent({
    components: {
        FwbButton
    },
    props: {
        title: String,
        content: String,
        shared: Boolean,
        editable: Boolean
    }
})
</script>

<template>
    <div class="card">
        <a href="#">
            <h5 class="card-title">{{ title }}</h5>
        </a>
        <p class="card-content">{{ content }}</p>
        <div class="flex flex-row-reverse">
            <FwbButton class="m-1">Edit</FwbButton>
            <FwbButton class="m-1">Show</FwbButton>
        </div>
    </div>
</template>

