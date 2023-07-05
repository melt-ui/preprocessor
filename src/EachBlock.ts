import { extractIdentifiers, traverseBlock } from './helpers';

import type { TemplateNode } from 'svelte/types/compiler/interfaces';
import type { Config } from './types';

type TraverseEachBlockArgs = {
	eachBlockNode: TemplateNode;
	config: Config;
};
export function traverseEachBlock({ eachBlockNode, config }: TraverseEachBlockArgs) {
	if (eachBlockNode.type !== 'EachBlock') throw Error('This node is not an EachBlock');

	const eachBlockIdentifiers = new Set<string>();
	const context = eachBlockNode.context; // {#each someIterable as CONTEXT}
	const leftOverActions: TemplateNode[] = [];

	// get all the identifiers found in the of the each block declaration
	extractIdentifiers(context).forEach((identifier) =>
		eachBlockIdentifiers.add(identifier)
	);

	// figure out if those identifiers are being used in the melt action expression
	traverseBlock({
		blockIdentifiers: eachBlockIdentifiers,
		blockNode: eachBlockNode,
		leftOverActions,
		config,
	});

	return leftOverActions;
}
