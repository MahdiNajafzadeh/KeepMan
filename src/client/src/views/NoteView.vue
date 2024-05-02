<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router';
import { useNoteStore } from '../stores/Note';
import { storeToRefs } from 'pinia'
import PrimevueButton from 'primevue/button'
import PrimevueProgressBar from 'primevue/progressbar'

interface Note {
    noteId: number;
    userId: number;
    title: string;
    content: string;
    render: string;
    createAt: string;
    updateAt: string;
}

export default defineComponent({
    components: {
        PrimevueButton,
        PrimevueProgressBar
    },
    setup() {
        const router = useRouter()
        const noteStore = useNoteStore()
        const { isLoading } = storeToRefs(noteStore)
        const noteId = ref(Number(router.currentRoute.value.params.id))
        const note = ref({} as Note)

        watchEffect(() => {
            if (!noteId.value) {
                router.push({ name: "home" })
            } else if (isLoading.value) {
                noteStore.load()
            } else if (!isLoading.value) {
                const foundNote = noteStore.getById(noteId.value)
                if (!foundNote) {
                    router.push({ name: "home" })
                } else {
                    note.value = foundNote
                }
            }
        })

        return {
            isLoading,
            noteId,
            note
        }
    },
})
</script>



<template>
    <main class="m-6 dark:text-white text-black">
        <div v-if="isLoading" class="w-full">
            <PrimevueProgressBar mode="indeterminate" class="w-full" />
        </div>
        <div v-else>
            <div class="flex justify-between mb-4 p-4">
                <h1 class="text-4xl">
                    {{ note.title }}
                </h1>
                <RouterLink :to="`/note/edit/${noteId}`">
                    <PrimevueButton type="button" label="Edit" severity="info" />
                </RouterLink>
            </div>
            <hr class="mb-4">
            <p class="text-2xl mx-4" v-html="note.render">
            </p>
        </div>
    </main>
</template>

<style scoped></style>