import { traverseEachBlock } from './EachBlock.js';
import { traverseAwaitBlock } from './AwaitBlock.js';
import { traverseComponentBlock } from './ComponentBlock.js';
import { isAliasedAction, walk } from '../helpers.js';

import type { TemplateNode } from 'svelte/types/compiler/interfaces';
import type { Config } from '../types';

type TraverseArgs = {
	baseNode: TemplateNode;
	config: Config;
};
export function traverse({ baseNode, config }: TraverseArgs) {
	const actions: TemplateNode[] = [];

	walk(baseNode, {
		enter(node: TemplateNode) {
			// if there's an each block that contains an expression,
			// add a {@const identifier = expression}
			if (node.type === 'EachBlock') {
				const leftOverActions = traverseEachBlock({ eachBlockNode: node, config });

				actions.push(...leftOverActions);
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

				actions.push(...leftOverActions);
				// don't need to traverse the rest of the Component Block
				this.skip();
			}

			// {#await} blocks
			if (node.type === 'AwaitBlock') {
				// check identifiers in the then and catch block, if present
				const leftOverActions = traverseAwaitBlock({ awaitBlockNode: node, config });

				actions.push(...leftOverActions);
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
