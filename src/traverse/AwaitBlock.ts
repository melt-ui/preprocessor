import { traverseBlock } from './Block.js';

import type { TemplateNode } from 'svelte/types/compiler/interfaces';
import type { Config } from '../types.js';

type TraverseAwaitBlockArgs = {
	awaitBlockNode: TemplateNode;
	config: Config;
};
export function traverseAwaitBlock({ awaitBlockNode, config }: TraverseAwaitBlockArgs) {
	if (awaitBlockNode.type !== 'AwaitBlock') throw Error('This node is not an AwaitBlock');

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
}
