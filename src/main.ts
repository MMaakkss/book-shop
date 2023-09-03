import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { plugin, defaultConfig } from '@formkit/vue';
import { createMetaManager } from 'vue-meta';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import App from './App.vue';
import router from './router';

//style
import './assets/style/main.css';

const pinia = createPinia();

createApp(App)
	.use(plugin, defaultConfig())
	.use(createMetaManager())
	.use(pinia)
	.use(router)
	.component("font-awesome-icon", FontAwesomeIcon)
	.mount('#app');
