<script lang="ts">
import { defineComponent } from 'vue'
import PrimevueButton from 'primevue/button'
import { RouterLink } from 'vue-router'

export default defineComponent({
  components: {
    PrimevueButton,
    RouterLink
  },
  data() {
    return {
      notes: [
        { id: 1, title: '1', content: 'this is content 1 , this is content 1 , this is content 1 , this is content 1 , this is content 1 , this is content 1 , this is content 1 , this is content 1 , this is content 1 , this is content 1 , this is content 1 , this is content 1 , ', shared: true, editable: false },
        { id: 2, title: '2', content: 'this is content 2 , this is content 2 , this is content 2 , this is content 2 , this is content 2 , this is content 2 , this is content 2 , this is content 2 , this is content 2 , this is content 2 , this is content 2 , this is content 2 , ', shared: true, editable: false },
        { id: 3, title: '3', content: 'this is content 3 , this is content 3 , this is content 3 , this is content 3 , this is content 3 , this is content 3 , this is content 3 , this is content 3 , this is content 3 , this is content 3 , this is content 3 , this is content 3 , ', shared: true, editable: false },
        { id: 4, title: '4', content: 'this is content 4 , this is content 4 , this is content 4 , this is content 4 , this is content 4 , this is content 4 , this is content 4 , this is content 4 , this is content 4 , this is content 4 , this is content 4 , this is content 4 , ', shared: true, editable: false },
        { id: 5, title: '5', content: 'this is content 5 , this is content 5 , this is content 5 , this is content 5 , this is content 5 , this is content 5 , this is content 5 , this is content 5 , this is content 5 , this is content 5 , this is content 5 , this is content 5 , ', shared: true, editable: false },
        { id: 6, title: '6', content: 'this is content 6 , this is content 6 , this is content 6 , this is content 6 , this is content 6 , this is content 6 , this is content 6 , this is content 6 , this is content 6 , this is content 6 , this is content 6 , this is content 6 , ', shared: true, editable: false },
        { id: 7, title: '7', content: 'this is content 7 , this is content 7 , this is content 7 , this is content 7 , this is content 7 , this is content 7 , this is content 7 , this is content 7 , this is content 7 , this is content 7 , this is content 7 , this is content 7 , ', shared: true, editable: false },
        { id: 8, title: '8', content: 'this is content 8 , this is content 8 , this is content 8 , this is content 8 , this is content 8 , this is content 8 , this is content 8 , this is content 8 , this is content 8 , this is content 8 , this is content 8 , this is content 8 , ', shared: true, editable: false },
        { id: 9, title: '9', content: 'this is content 9 , this is content 9 , this is content 9 , this is content 9 , this is content 9 , this is content 9 , this is content 9 , this is content 9 , this is content 9 , this is content 9 , this is content 9 , this is content 9 , ', shared: true, editable: false },
      ]
    }
  }
})
</script>

<template>
  <main class="m-4">
    <h1 class="text-4xl mb-4 dark:text-white text-black">Notes</h1>
    <hr class="mb-4">
    <div class="flex flex-row flex-wrap">
      <div
        class="h-fit lg:w-64 md:w-56 mx-1 mb-2 sm:max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        v-for="(note, index) in notes" :key="index">
        <a href="#">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ note.title }}</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ note.content }}</p>
        <div class="flex flex-row justify-end">
          <PrimevueButton type="button" label="Edit" severity="info" class="m-1" />
          <RouterLink :to="`/note/${note.id}`">
            <PrimevueButton type="button" label="Show" severity="info" class="m-1" />
          </RouterLink>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped></style>