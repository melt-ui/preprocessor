import { extractIdentifiers } from '../helpers.js';
import { traverseBlock } from './Block.js';

import type { TemplateNode } from 'svelte/types/compiler/interfaces';
import type { Config, LeftoverAction } from '../types.js';

type TraverseEachBlockArgs = {
	eachBlockNode: TemplateNode;
	config: Config;
};
export function traverseEachBlock({ eachBlockNode, config }: TraverseEachBlockArgs) {
	if (eachBlockNode.type !== 'EachBlock') throw Error('This node is not an EachBlock');

	const eachBlockIdentifiers = new Set<string>();
	const context = eachBlockNode.context; // {#each someIterable as CONTEXT}
	const leftOverActions: LeftoverAction[] = [];

	// get all the identifiers found in the of the each block declaration
	extractIdentifiers(context).forEach((identifier) =>
		eachBlockIdentifiers.add(identifier)
	);

	// determine if those identifiers are being used in the melt action's expression
	traverseBlock({
		blockIdentifiers: eachBlockIdentifiers,
		blockNode: eachBlockNode,
		leftOverActions,
		config,
	});

	return leftOverActions;
}
