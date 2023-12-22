import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		alias: {
			$pkg: new URL('./src/', import.meta.url).pathname,
		},
	},
});
