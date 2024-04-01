<script lang="ts">
import { defineComponent } from 'vue';
import { RouterView } from 'vue-router'
import NavaBar from './components/NavBar.vue'

export default defineComponent({
  components: {
    RouterView,
    NavaBar,
  }
})
</script>

<template>
  <NavaBar />
  <RouterView />
</template>

<style scoped></style>
