<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: "NoteView",

})
</script>

<template>
    <main class="mx-3">
        <h1 class="m-4">Note View</h1>
        <section class="m-4">
            <p>ID: {{ $route.params.id }}</p>
        </section>
    </main>
</template>