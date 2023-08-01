import { traverseEachBlock } from './EachBlock.js';
import { traverseAwaitBlock } from './AwaitBlock.js';
import { traverseComponentBlock } from './ComponentBlock.js';
import { getMeltBuilderName, isAliasedAction, walk } from '../helpers.js';

import type { TemplateNode } from 'svelte/types/compiler/interfaces';
import type { Config, LeftoverAction, Node } from '../types';

type TraverseArgs = {
	baseNode: TemplateNode;
	config: Config;
};
export function traverse({ baseNode, config }: TraverseArgs) {
	const actions: TemplateNode[] = [];

	walk(baseNode, {
		enter(node) {
			// if there's an each block that contains an expression,
			// add a {@const identifier = expression}
			if (node.type === 'EachBlock') {
				const leftOverActions = traverseEachBlock({ eachBlockNode: node, config });

				// inject the const into the the actions direct parent block
				injectConst({ config, leftOverActions });
				// don't need to traverse the rest of the Each Block
				this.skip();
			}

			// components with a let:identifier
			if (
				(node.type === 'InlineComponent' || node.type === 'SlotTemplate') &&
				node.children &&
				node.children.length > 0
			) {
				const leftOverActions = traverseComponentBlock({ compBlockNode: node, config });

				injectConst({ config, leftOverActions });
				// don't need to traverse the rest of the Component Block
				this.skip();
			}

			// {#await} blocks
			if (node.type === 'AwaitBlock') {
				// check identifiers in the then and catch block, if present
				const leftOverActions = traverseAwaitBlock({ awaitBlockNode: node, config });

				injectConst({ config, leftOverActions });
				// don't need to traverse the rest of the Await Block
				this.skip();
			}

			// top level Actions
			if (
				node.type === 'Action' &&
				isAliasedAction(node.name, config.alias) &&
				node.expression !== null // assigned to something
			) {
				actions.push(node);
				// we don't have to walk the Action's children
				this.skip();
			}
		},
	});

	// return all the leftover actions
	return actions;
}

type InjectConstArgs = {
	leftOverActions: LeftoverAction[];
	config: Config;
};
/**
 * Injects the `{@const}` tag into the direct parent block node of the action.
 */
function injectConst({ config, leftOverActions }: InjectConstArgs) {
	for (const { actionNode, directBlockNode } of leftOverActions) {
		const expression = actionNode.expression as Node;

		const expressionContent = config.content.substring(expression.start, expression.end);

		// make this into a {@const} block
		const start = directBlockNode.children?.at(0)?.start;
		const constIdentifier = getMeltBuilderName(config.builderCount++);
		if (!start) throw Error('This is unreachable');

		config.builders.push({
			identifierName: constIdentifier,
			startPos: actionNode.start,
			endPos: actionNode.end,
		});

		config.markup.prependRight(
			start,
			`{@const ${constIdentifier} = ${expressionContent}}`
		);
	}
}
