<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import NavBar from './components/NavBar.vue';
import { onBeforeMount, ref } from 'vue';

const showNavBar = ref(true);

onBeforeMount(() => {
  const route = useRoute();
  showNavBar.value = route.meta.showNavBar as boolean;
});

</script>

<template>
  <NavBar v-if="showNavBar" />
  <RouterView />
</template>

<style scoped></style>
