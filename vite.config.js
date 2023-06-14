import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server:{
		port:4200,
		strictPort:false,
	},
	preview:{
		port:4173,
		strictPort:false,
	}
});
