import { extractIdentifiers, traverseBlock } from './helpers';
import { walk } from 'svelte/compiler';

import type { TemplateNode } from 'svelte/types/compiler/interfaces';
import type { Config } from './types';

type TraverseEachBlockArgs = {
	compBlockNode: TemplateNode;
	config: Config;
};
export function traverseComponentBlock({ compBlockNode, config }: TraverseEachBlockArgs) {
	if (compBlockNode.type !== 'InlineComponent' && compBlockNode.type !== 'SlotTemplate')
		throw Error('This node is not an InlineComponent or a SlotTemplate');

	const compBlockIdentifiers = new Set<string>();
	const leftOverActions: TemplateNode[] = [];

	// get all of the `let:data` attributes
	walk(compBlockNode.attributes, {
		// @ts-expect-error doesn't accept template nodes
		enter(letNode: TemplateNode) {
			if (letNode.type !== 'Let') return;

			// if it's just `let:data`, then `data` is the identifier
			if (letNode.expression === null) {
				compBlockIdentifiers.add(letNode.name);
			} else {
				// otherwise, get all the identifiers found in the expression `let:data={expression}`
				extractIdentifiers(letNode.expression).forEach((identifier) =>
					compBlockIdentifiers.add(identifier)
				);
			}
		},
	});

	// Determines if those identifiers are scoped to this block
	traverseBlock({
		blockIdentifiers: compBlockIdentifiers,
		blockNode: compBlockNode,
		leftOverActions,
		config,
	});

	return leftOverActions;
}
