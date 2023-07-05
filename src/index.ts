import { parse, walk, type PreprocessorGroup } from 'svelte/compiler';
import MagicString from 'magic-string';
import { getMeltBuilderName } from './helpers';
import { traverse } from './traverse';

import type { TemplateNode } from 'svelte/types/compiler/interfaces';
import type { Config, Node } from './types';

export type PreprocessOptions = {
	/**
	 * Name of the `melt` action can be aliased.
	 * @default "melt"
	 */
	alias?: string | string[];
};

/**
 * This is a PP that does something. We'll figure that out soon enough.
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

			// Grab the Script node so we can inject any hoisted expressions later
			if (ast.instance) {
				// @ts-expect-error idk why it doesn't accept an ast
				walk(ast.instance, {
					enter(node: TemplateNode) {
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
				// if the user just passed in an identifier, just use that
				if ('identifierName' in builder) {
					identifier = builder.identifierName;
				} else {
					// otherwise, we'll take the expression and hoist it into the script node
					identifier = getMeltBuilderName(config.builderCount++);
					identifiersToInsert += `$: ${identifier} = ${builder.expression.contents};\n`;
				}

				const attributes = `{...{...${identifier}, action: undefined}} use:${identifier}.action`;

				// replace the `use:melt={...}` with the attributes
				config.markup.overwrite(builder.startPos, builder.endPos, attributes, {
					storeName: true,
				});
			}

			// Inject the hoisted expressions into the script node
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
				map: config.markup.generateMap(),
			};
		},
	};
}

type HandleTopLevelActionArgs = {
	actionNode: TemplateNode;
	config: Config;
};
/** Adds the builder */
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
