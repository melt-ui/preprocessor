// Originally sourced and modified from https://github.com/sveltejs/vite-plugin-svelte/blob/main/packages/vite-plugin-svelte/src/utils/load-svelte-config.js

import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

// used to require cjs config in esm.
// NOTE dynamic import() cjs technically works, but timestamp query cache bust
// have no effect, likely because it has another internal cache?
let esmRequire: NodeRequire;

const svelteConfigNames = ['svelte.config.js', 'svelte.config.cjs', 'svelte.config.mjs'];

async function dynamicImportDefault(filePath: string, timestamp: number) {
	return await import(filePath + '?t=' + timestamp).then((m) => m.default);
}

type SvelteConfig = {
	compilerOptions?: { runes?: boolean };
};

export async function loadSvelteConfig(
	svelteConfigPath?: string | false
): Promise<SvelteConfig | undefined> {
	if (svelteConfigPath === false) {
		return;
	}
	const configFile = findConfigToLoad(svelteConfigPath);
	if (configFile) {
		let err;
		// try to use dynamic import for svelte.config.js first
		if (configFile.endsWith('.js') || configFile.endsWith('.mjs')) {
			try {
				const result = await dynamicImportDefault(
					pathToFileURL(configFile).href,
					fs.statSync(configFile).mtimeMs
				);
				if (result != null) {
					return {
						...result,
						configFile,
					};
				} else {
					throw new Error(`invalid export in ${configFile}`);
				}
			} catch (e) {
				console.error(`failed to import config ${configFile}`, e);
				err = e;
			}
		}
		// cjs or error with dynamic import
		if (!configFile.endsWith('.mjs')) {
			try {
				// identify which require function to use (esm and cjs mode)
				const _require = import.meta.url
					? esmRequire ?? (esmRequire = createRequire(import.meta.url))
					: require;

				// avoid loading cached version on reload
				delete _require.cache[_require.resolve(configFile)];
				const result = _require(configFile);
				if (result != null) {
					return {
						...result,
						configFile,
					};
				} else {
					throw new Error(`invalid export in ${configFile}`);
				}
			} catch (e) {
				console.error(`failed to require config ${configFile}`, e);
				if (!err) {
					err = e;
				}
			}
		}
		// failed to load existing config file
		throw err;
	}
}

function findConfigToLoad(svelteConfigPath?: string): string | undefined {
	const root = process.cwd();
	if (svelteConfigPath) {
		const absolutePath = path.isAbsolute(svelteConfigPath)
			? svelteConfigPath
			: path.resolve(root, svelteConfigPath);
		if (!fs.existsSync(absolutePath)) {
			throw new Error(`failed to find svelte config file ${absolutePath}.`);
		}
		return absolutePath;
	} else {
		const existingKnownConfigFiles = svelteConfigNames
			.map((candidate) => path.resolve(root, candidate))
			.filter((file) => fs.existsSync(file));
		if (existingKnownConfigFiles.length === 0) {
			console.debug(`no svelte config found at ${root}`, undefined, 'config');
			return;
		} else if (existingKnownConfigFiles.length > 1) {
			console.warn(
				`found more than one svelte config file, using ${existingKnownConfigFiles[0]}. you should only have one!`,
				existingKnownConfigFiles
			);
		}
		return existingKnownConfigFiles[0];
	}
}
