<script lang="ts">
// Vue Imported Modules
import { defineComponent, ref, watch, watchEffect } from "vue";
import { useRouter } from "vue-router";
// Store Component
import { useNoteStore } from "../stores/Note";
import { storeToRefs } from "pinia";
// Primevue Component
import PrimevueButton from "primevue/button";
import PrimevueProgressBar from "primevue/progressbar";
import PrimevueInputText from "primevue/inputtext";
// import PrimevueTextarea from "primevue/textarea";
import PrimevueSplitter from "primevue/splitter";
import PrimevueSplitterPanel from "primevue/splitterpanel";
import Toast from "primevue/toast";
// Markdown-it
import md from '../lib/markdown'
// Request
import request from "../lib/request";
import { AxiosError } from "axios";


// ---------------------

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
		Toast,
		PrimevueButton,
		PrimevueProgressBar,
		PrimevueInputText,
		PrimevueSplitter,
		PrimevueSplitterPanel
	},
	setup() {
		const router = useRouter();
		const noteStore = useNoteStore();
		const { isLoading } = storeToRefs(noteStore);
		const noteId = ref(Number(router.currentRoute.value.params.id));
		const note = ref({} as Note);
		const content = ref("");
		const render = ref("");

		watchEffect(() => {
			if (!noteId.value) {
				router.push({ name: "home" });
			} else if (isLoading.value) {
				noteStore.load();
			} else if (!isLoading.value) {
				const foundNote = noteStore.getById(noteId.value);
				if (!foundNote) {
					router.push({ name: "home" });
				} else {
					note.value = foundNote;
					content.value = note.value.content;
				}
			}
		});

		watch(content, (value: string) => {
			render.value = md.render(value);
		});

		return {
			isLoading,
			noteId,
			note,
			content,
			render
		};
	},
	methods: {
		async saveNote() {
			try {
				const response = await request.put(`http://localhost:3000/api/note/${this.noteId}`, {
					title: this.note.title,
					content: this.content,
					render: this.render
				});
				if (response.data.status) {
					this.$toast.add({ severity: "success", summary: "Success", detail: "Note is Saved", life: 3000 });
				}
			} catch (error) {
				if (error instanceof AxiosError) {
					const data = error.response?.data;
					this.$toast.add({
						severity: "error",
						summary: "Error to save note",
						detail: `${data?.message}`,
						life: 3000
					});
				}
			}
		}
	},
	mounted() {
		this.render = md.render(this.content);
	}
});
</script>

<template>
	<Toast />
	<main class="m-6 dark:text-white text-black">
		<div v-if="isLoading" class="w-full">
			<PrimevueProgressBar mode="indeterminate" class="w-full" />
		</div>
		<div v-else>
			<div class="flex justify-between mb-4 p-4">
				<PrimevueInputText size="large" class="dark:text-4xl text-4xl p-2" v-model="note.title" />
				<PrimevueButton type="button" label="Save" severity="info" @click="saveNote" />
			</div>
			<hr class="mb-4" />
			<PrimevueSplitter class="w-full p-0 min-h-1/2" :gutter-size="10">
				<PrimevueSplitterPanel class="flex align-items-center justify-content-center" :size="51">
					<textarea class="hljs language-markdown w-full p-6" v-model="content"></textarea>
				</PrimevueSplitterPanel>
				<PrimevueSplitterPanel class="flex align-items-center justify-content-center" :size="51">
					<span v-html="render" class="w-full p-6"></span>
				</PrimevueSplitterPanel>
			</PrimevueSplitter>
		</div>
	</main>
</template>

<style scoped></style>
