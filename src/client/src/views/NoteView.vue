<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {

    },
})
</script>

<template>
    <div class="text-white">
        Note ID is {{ $router.currentRoute.value.params.id }}
    </div>
</template>

<style scoped></style>