/* import css */
import "./assets/main.css";
import "../node_modules/flowbite-vue/dist/index.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
// @ts-ignore
import Wind from "./presets/Wind";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue, {
	unstyled: true,
	pt: Wind
});

app.mount("#app");
