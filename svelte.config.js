import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		alias: {
			'$components': 'src/components'
		},
		adapter: adapter({
			fallback: 'index.html' // may differ from host to host
		})
	},
	preprocess: vitePreprocess()
};

export default config;
