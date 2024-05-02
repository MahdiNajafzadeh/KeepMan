<script lang="ts">
// Vue Imported Modules
import { defineComponent, ref, watch, watchEffect } from 'vue'
import { useRouter } from 'vue-router';
// Store Component
import { useNoteStore } from '../stores/Note';
import { storeToRefs } from 'pinia'
// Primevue Component 
import PrimevueButton from 'primevue/button'
import PrimevueProgressBar from 'primevue/progressbar'
import PrimevueInputText from 'primevue/inputtext';
import PrimevueTextarea from 'primevue/textarea'
import PrimevueSplitter from 'primevue/splitter'
import PrimevueSplitterPanel from 'primevue/splitterpanel'
import Toast from 'primevue/toast';
// Markdown-it
import MarkdownIt from 'markdown-it'
// @ts-ignore
import MarkdownItAbbr from "markdown-it-abbr";
// @ts-ignore
import MarkdownItAnchor from "markdown-it-anchor";
// @ts-ignore
import MarkdownItFootnote from "markdown-it-footnote";
// @ts-ignore
import MarkdownItHighlightjs from "markdown-it-highlightjs";
// @ts-ignore
import MarkdownItSub from "markdown-it-sub";
// @ts-ignore
import MarkdownItSup from "markdown-it-sup";
// @ts-ignore
import MarkdownItTasklists from "markdown-it-task-lists";
// @ts-ignore
import MarkdownItTOC from "markdown-it-toc-done-right";

// INIT Markdown-it
const md = new MarkdownIt({
    html: true
})
    .use(MarkdownItAbbr)
    .use(MarkdownItAnchor)
    .use(MarkdownItFootnote)
    .use(MarkdownItHighlightjs)
    .use(MarkdownItSub)
    .use(MarkdownItSup)
    .use(MarkdownItTasklists)
    .use(MarkdownItTOC);

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
        PrimevueTextarea,
        PrimevueSplitter,
        PrimevueSplitterPanel
    },
    setup() {
        const router = useRouter()
        const noteStore = useNoteStore()
        const { isLoading } = storeToRefs(noteStore)
        const noteId = ref(Number(router.currentRoute.value.params.id))
        const note = ref({} as Note)
        const content = ref('')
        const render = ref('')

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
                    content.value = note.value.content
                }
            }
        })

        watch(content, (value: string) => {
            render.value = md.render(value)
        })

        return {
            isLoading,
            noteId,
            note,
            content,
            render
        }
    },
    methods: {
        saveNote() {
            this.$toast.add({ severity: "success", "summary": "note saved !", "life": 3000 })
        },
        renderContent() {

        }
    }
})
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
            <hr class="mb-4">
            <PrimevueSplitter class="w-full p-0 min-h-1/2" :gutter-size="10">
                <PrimevueSplitterPanel class="flex align-items-center justify-content-center" :size="51">
                    <PrimevueTextarea size="large" auto-resize class="w-full dark:text-xl text-xl" v-model="content" />
                </PrimevueSplitterPanel>
                <PrimevueSplitterPanel class="flex align-items-center justify-content-center" :size="51">
                    <span v-html="render" class="p-2"></span>
                </PrimevueSplitterPanel>
            </PrimevueSplitter>
        </div>
    </main>
</template>

<style scoped></style>