<script lang="ts">
import { RouterLink } from 'vue-router'
import { defineComponent } from 'vue'

interface NoteData {
    id: number,
    title: string,
    content: string,
    shared: boolean
}

export default defineComponent(
    {
        name: "NoteItem",
        components: {
            RouterLink
        },
        props: {
            note: {
                type: Object as () => NoteData,
                require: true,
            }
        },
    }
)
</script>

<template>
    <div class="card flex-row">
        <div class="card-body">
            <h5 class="card-title">{{ note?.title }}</h5>
            <p class="card-text">{{ note?.content?.slice(0, 150) + " ..." }}</p>
            <p v-if="note?.shared" class="card-text btn m-1">
                <font-awesome-icon :icon="['fas', 'users']" />
            </p>
            <RouterLink :to="`/note/${note?.id}`" class="btn btn-primary m-1">Edit</RouterLink>
            <RouterLink :to="`/note/${note?.id}`" class="btn btn-primary m-1">Show</RouterLink>
        </div>
    </div>
</template>

<style scoped>
.card {
    width: 18rem;
    height: fit-content;
    margin-bottom: 0.5rem;
    margin-left: 0.5rem;
}

/* Style the tooltip text */
.tooltip-inner {
    background-color: #007bff;
    /* Blue background */
    color: #fff;
    /* White text */
    font-size: 14px;
    /* Font size */
    border-radius: 4px;
    /* Border radius */
    padding: 8px 12px;
    /* Padding */
}

/* Style the tooltip arrow */
.arrow::before {
    border-top-color: #007bff !important;
    /* Blue border color */
}
</style>