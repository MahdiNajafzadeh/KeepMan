<script lang="ts">
import { defineComponent } from 'vue';
import { RouterView } from 'vue-router'
import NavaBar from './components/NavBar.vue'

export default defineComponent({
  components: {
    RouterView,
    NavaBar,
  },
  computed: {
    showNavBar() {
      return this.$route.meta.showNavBar
    },
    showSearchBar() {
      return Boolean(this.$route.meta.showSearchBar)
    }
  }
})
</script>

<template>
  <NavaBar v-if="showNavBar" :showSearchBar="showSearchBar" />
  <RouterView />
</template>

<style scoped></style>
