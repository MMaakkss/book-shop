import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createMetaManager } from 'vue-meta';
import App from './App.vue';
import router from './router';

//style
import './assets/style/main.css';

const pinia = createPinia();

createApp(App)
	.use(createMetaManager())
	.use(pinia)
	.use(router)
	.mount('#app');
