import MagicString from 'magic-string';
import { parse, type PreprocessorGroup, VERSION } from 'svelte/compiler';
import { getMeltBuilderName, isRuneMode, walk } from './helpers.js';
import { traverse } from './traverse/index.js';

import type { TemplateNode } from 'svelte/types/compiler/interfaces';
import type { Config, Node } from './types.js';

export * from './sequence.js';

export type PreprocessOptions = {
	/**
	 * For aliasing the name of the `melt` action.
	 *
	 * When configured, the PP will __only__ process action names
	 * that are passed to this field.
	 *
	 * @example
	 * ```ts
	 * // ONLY process actions named `_melt`
	 * preprocessMeltUI({ alias: ["_melt"] })
	 *
	 * // process actions named `_melt` or `melt`
	 * preprocessMeltUI({ alias: ["melt", "_melt"] })
	 *
	 * ```
	 *
	 * @default "melt"
	 */
	alias?: string | string[];
};

/**
 * A preprocessor for Melt UI.
 *
 * Intelligently replaces all instances of `use:melt={$builder}` with the correct spread syntax,
 * providing a sleeker developer experience.
 *
 * Simply add it to the end of your array of preprocessors.
 * @example
 * ```js
 * // svelte.config.js
 * import { preprocessMeltUI } from '@melt-ui/pp';
 *
 * const config = {
 * 	// ... other svelte config options
 * 	preprocess: [
 * 		// ... other preprocessors
 * 		preprocessMeltUI() // add to the end!
 * 	]
 * 	// ...
 * };
 * ```
 */
export function preprocessMeltUI(options?: PreprocessOptions): PreprocessorGroup {
	return {
		name: 'MeltUI Preprocess',
		markup: async ({ content, filename }) => {
			const config: Config = {
				alias: options?.alias ?? 'melt',
				markup: new MagicString(content, { filename }),
				builders: [],
				builderCount: 0,
				content,
			};

			let scriptContentNode: { start: number; end: number } | undefined;
			const ast = parse(content, { css: false, filename });
			const runesMode = VERSION.startsWith('5') && isRuneMode(ast);

			// Grab the Script node so we can inject any hoisted expressions later
			if (ast.instance) {
				walk(ast.instance, {
					enter(node) {
						if (node.type === 'Script' && node.context === 'default') {
							scriptContentNode = node.content as { start: number; end: number };
						}
					},
				});
			}

			const leftOverActions = traverse({ baseNode: ast.html, config });

			// Any action that couldn't find a home within a scoped block will
			// bubble up to the top, indicating that these actions need
			// their expressions hoisted.
			leftOverActions.forEach((action) => {
				handleTopLevelAction({ actionNode: action, config });
			});

			// Build the identifiers to later inject into the script tag
			let identifiersToInsert = '';
			for (const builder of config.builders) {
				let identifier = '';
				if ('identifierName' in builder) {
					// if the user just passed in an identifier, just use that
					identifier = builder.identifierName;
				} else {
					// otherwise, we'll take the expression and hoist it into the script node
					identifier = getMeltBuilderName(config.builderCount++);
					if (runesMode) {
						identifiersToInsert += `\tlet ${identifier} = $derived(${builder.expression.contents});\n`;
					} else {
						identifiersToInsert += `\t$: ${identifier} = ${builder.expression.contents};\n`;
					}
				}

				const attributes = `{...${identifier}} use:${identifier}.action`;

				// replace the `use:melt={...}` with the attributes
				config.markup.overwrite(builder.startPos, builder.endPos, attributes, {
					storeName: true,
				});
			}

			// inject the hoisted expressions into the script node
			if (identifiersToInsert) {
				if (scriptContentNode) {
					// insert the new identifiers into the end of the script tag
					config.markup.appendRight(scriptContentNode.end, '\n' + identifiersToInsert);
				} else {
					// incase they don't already have a script tag...
					config.markup.prepend('<script>\n' + identifiersToInsert + '\n</script>\n');
				}
			}

			return {
				code: config.markup.toString(),
			};
		},
	};
}

type HandleTopLevelActionArgs = {
	actionNode: TemplateNode;
	config: Config;
};
/**
 * Constructs the Builder and adds it to its list.
 */
function handleTopLevelAction(args: HandleTopLevelActionArgs) {
	const { actionNode, config } = args;
	let identifierName: string | undefined;
	const expression = actionNode.expression as Node;

	if (expression.type === 'Identifier') {
		// only an identifier was passed
		// i.e. use:melt={$builder}
		identifierName = expression.name;
		config.builders.push({
			identifierName,
			startPos: actionNode.start,
			endPos: actionNode.end,
		});
	} else {
		// any other expression type...
		// i.e. use:melt={$builder({ arg1: '', arg2: '' })}
		config.builders.push({
			expression: {
				startPos: expression.start,
				endPos: expression.end,
				contents: config.content.substring(expression.start, expression.end),
			},
			startPos: actionNode.start,
			endPos: actionNode.end,
		});
	}
}
