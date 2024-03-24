// import css
import './assets/main.css';
import 'bootstrap/dist/css/bootstrap.css';

// import js
import 'bootstrap';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// import icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUsers, faEye, faEyeSlash, faCirclePlus } from '@fortawesome/free-solid-svg-icons';

library.add(faUsers, faEye, faEyeSlash, faCirclePlus);

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

const app = createApp(App);
app.component('FontAwesomeIcon', FontAwesomeIcon);
app.use(router);
app.use(store);
app.mount('#app');
