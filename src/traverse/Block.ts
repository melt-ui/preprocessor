import { getMeltBuilderName, isAliasedAction, walk } from '../helpers.js';
import { traverse } from './index.js';

import type { TemplateNode } from 'svelte/types/compiler/interfaces';
import type { Config, Node } from '../types.js';

type BlockArgs = {
	blockNode: TemplateNode;
	config: Config;
};

/**
 * Traverses any given block and checks if there are any identifiers
 * that exist in it's child `melt` action's expression.
 *
 * If there are, we'll inject an `{@const}` block into the provided block
 * with it's corresponding identifiers.
 */
export function traverseBlock({ blockNode, config }: BlockArgs) {
	if (blockNode.children === undefined) return;

	// walk the children to determine if the block's provided identifiers are
	// being used in the melt action's expression
	walk(blockNode.children, {
		enter(node) {
			if (
				node.type === 'Action' &&
				isAliasedAction(node.name, config.alias) &&
				node.expression !== null // assigned to something
			) {
				handleActionNode({
					actionNode: node,
					blockNode,
					config,
				});

				// we don't have to walk the Action's children
				this.skip();
				return;
			}

			// if it's anything else, walk again
			const returnedActions = traverse({ baseNode: node, config });

			for (const actionNode of returnedActions) {
				handleActionNode({
					actionNode,
					blockNode,
					config,
				});
			}

			// only want to walk over the direct children, so we'll skip the rest
			this.skip();
		},
	});
}

type HandleActionNodeArgs = {
	blockNode: TemplateNode;
	actionNode: TemplateNode;
	config: Config;
};

/**
 * Injects the `{@const}` tag as a child of the provided block
 * node if the expression is anything but an `Identifier`.
 */
function handleActionNode({ config, actionNode, blockNode }: HandleActionNodeArgs) {
	const expression = actionNode.expression as Node;

	// any other expression type...
	// i.e. use:melt={$builder({ arg1: '', arg2: '' })}
	if (expression.type !== 'Identifier') {
		const expressionContent = config.content.substring(expression.start, expression.end);

		// extract the indent of the block such that the indentation of the injected
		// {@const} tag is in line with the rest of the block
		const blockContent = config.content.substring(blockNode.start, blockNode.end);
		const blockLines = blockContent.split('\n');
		const indent = blockLines.at(1)?.match(/\s*/);

		// a weird quirk with Await and Component blocks where the first child
		// is a Text node, so we'll ignore them and take the 2nd child instead
		let firstChild = blockNode.children?.at(0);
		if (firstChild?.type === 'Text') {
			firstChild = blockNode.children?.at(1);
		}

		// convert this into a {@const} block
		const start = firstChild?.start;
		const constIdentifier = getMeltBuilderName(config.builderCount++);
		if (!start) throw Error('This is unreachable');

		config.builders.push({
			identifierName: constIdentifier,
			startPos: actionNode.start,
			endPos: actionNode.end,
		});

		config.markup.prependRight(
			start,
			`{@const ${constIdentifier} = ${expressionContent}}\n${indent}`
		);
	} else {
		// if it's just an identifier, add it to the list of builders so that it can
		// later be transformed into the correct syntax
		// i.e. use:melt={$builder}
		config.builders.push({
			identifierName: expression.name,
			startPos: actionNode.start,
			endPos: actionNode.end,
		});
	}
}
