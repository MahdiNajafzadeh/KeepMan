<script lang="ts">
import { defineComponent, computed } from 'vue';
import NoteItem from '@/components/NoteItem.vue';
import { useStore } from 'vuex';

export default defineComponent({
  components: {
    NoteItem
  },
  setup() {
    const store = useStore();
    const notes = computed(() => store.state.notes);
    return {
      notes
    };
  }
});
</script>

<template>
	<main class="mx-3">
		<h1 class="m-4">Notes</h1>
		<div class="d-flex flex-row flex-wrap justify-content-start">
			<NoteItem v-for="(note, index) in notes" :key="index" :note="note" />
		</div>
	</main>
</template>

<style scoped></style>
