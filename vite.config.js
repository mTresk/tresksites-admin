import { URL, fileURLToPath } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	css: {
		devSourcemap: true,
		preprocessorOptions: {
			scss: {
				additionalData: '@use "@/assets/scss/globals.scss" as *;',
			},
		},
	},
	server: {
		open: true,
	},
})
