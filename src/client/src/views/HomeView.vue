<script lang="ts">
import { defineComponent } from 'vue'
import PrimevueButton from 'primevue/button'
import PrimevueProgressBar from 'primevue/progressbar'
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useNoteStore } from '../stores/Note'



export default defineComponent({
  components: {
    PrimevueButton,
    PrimevueProgressBar,
    RouterLink
  },
  setup() {
    const noteStore = useNoteStore()
    if (noteStore.isLoading) {
      noteStore.load()
    }
    const { isLoading, notes } = storeToRefs(noteStore)
    return {
      isLoading,
      notes
    }
  }
})

</script>

<template>
  <main class="m-6">
    <div class="flex justify-between m-4 p-4">
      <h1 class="text-4xl dark:text-white text-black">
        Notes
      </h1>
      <PrimevueButton type="button" label="Add" severity="info" />
    </div>
    <hr class="mb-4">
    <div v-if="isLoading" class="w-full">
      <PrimevueProgressBar mode="indeterminate" class="w-full" />
    </div>
    <div v-else class="flex flex-row flex-wrap">
      <div
        class="h-fit lg:w-64 md:w-56 mx-1 mb-2 sm:max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        v-for="(note, index) in notes" :key="index">
        <a href="#">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ note.title }}</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400" v-html="note.render.substring(0, 100)">
        </p>
        <div class="flex flex-row justify-end">
          <RouterLink :to="`/note/edit/${note.noteId}`">
            <PrimevueButton type="button" label="Edit" severity="info" class="m-1" />
          </RouterLink>
          <RouterLink :to="`/note/${note.noteId}`">
            <PrimevueButton type="button" label="Show" severity="info" class="m-1" />
          </RouterLink>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped></style>