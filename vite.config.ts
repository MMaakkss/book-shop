import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'url';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		AutoImport({
			imports: ['vue', 'vue-router']
		})
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@import "@/assets/style/variables.scss";`
			}
		}
	},
	define: {
		__VUE_I18N_FULL_INSTALL__: true,
		__VUE_I18N_LEGACY_API__: false,
		__INTLIFY_PROD_DEVTOOLS__: false
	}
});
