import { extractIdentifiers } from '../helpers.js';
import { traverseBlock } from './Block.js';

import type { TemplateNode } from 'svelte/types/compiler/interfaces';
import type { Config, LeftoverAction } from '../types.js';

type TraverseAwaitBlockArgs = {
	awaitBlockNode: TemplateNode;
	config: Config;
};
export function traverseAwaitBlock({ awaitBlockNode, config }: TraverseAwaitBlockArgs) {
	if (awaitBlockNode.type !== 'AwaitBlock') throw Error('This node is not an AwaitBlock');

	const awaitBlockIdentifiers = new Set<string>();
	const value = awaitBlockNode.value; // {:then VALUE} or {#await promise then VALUE}
	const error = awaitBlockNode.error; // {:catch ERROR}
	const leftOverActions: LeftoverAction[] = [];

	// get all the identifiers found in the await block value
	extractIdentifiers(value).forEach((identifier) =>
		awaitBlockIdentifiers.add(identifier)
	);
	// get all the identifiers found in the await block error
	extractIdentifiers(error).forEach((identifier) =>
		awaitBlockIdentifiers.add(identifier)
	);

	/* determine if those identifiers are being used in the melt action's expression */

	// then block
	traverseBlock({
		blockNode: awaitBlockNode.then,
		config,
	});

	// catch block
	traverseBlock({
		blockNode: awaitBlockNode.catch,
		config,
	});

	return leftOverActions;
}
