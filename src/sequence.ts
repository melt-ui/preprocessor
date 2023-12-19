// Originally sourced and modified from https://github.com/pchynoweth/svelte-sequential-preprocessor

import { preprocess } from 'svelte/compiler';
import { PreprocessorGroup, Processed } from 'svelte/types/compiler/preprocess';

/**
 * A Svelte preprocessor that wraps other preprocessors and forces them to run sequentially.
 *
 * @example
 * ```js
 * // svelte.config.js
 * import { preprocessMeltUI, sequence } from '@melt-ui/pp';
 *
 * const config = {
 * 	// ... other svelte config options
 * 	preprocess: sequence([
 * 		// ... other preprocessors (e.g. `vitePreprocess()`)
 * 		preprocessMeltUI()
 * 	])
 * 	// ...
 * };
 * ```
 */
export function sequence(preprocessors: PreprocessorGroup[]): PreprocessorGroup {
	return {
		async markup({ content, filename }): Promise<Processed> {
			const dependencies = [];
			let code = content;
			let map: Processed['map'];
			let attributes: Processed['attributes'];
			let toString: Processed['toString'];

			for (const pp of preprocessors) {
				const processed = await preprocess(code, pp, { filename });
				if (processed && processed.dependencies) {
					dependencies.push(...processed.dependencies);
				}
				code = processed ? processed.code : code;
				map = processed.map ?? map;
				attributes = processed.attributes ?? attributes;
				toString = processed.toString ?? toString;
			}

			return {
				code,
				dependencies,
				map,
				attributes,
			};
		},
	};
}
