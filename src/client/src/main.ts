/* import css */
import "./assets/main.css";
import "../node_modules/flowbite-vue/dist/index.css";
import "../node_modules/highlight.js/styles/stackoverflow-dark.css"

import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
// @ts-ignore
import Wind from "./presets/Wind";

import App from "./App.vue";
import router from "./router";

const piniaStore = createPinia();

const app = createApp(App);
app.use(piniaStore);
app.use(router);
app.use(ToastService);
app.use(PrimeVue, {
	unstyled: true,
	pt: Wind
});

app.mount("#app");
