import { traverseBlock } from './Block.js';

import type { TemplateNode } from 'svelte/types/compiler/interfaces';
import type { Config } from '../types.js';

type TraverseEachBlockArgs = {
	eachBlockNode: TemplateNode;
	config: Config;
};
export function traverseEachBlock({ eachBlockNode, config }: TraverseEachBlockArgs) {
	if (eachBlockNode.type !== 'EachBlock') throw Error('This node is not an EachBlock');

	// determine if those identifiers are being used in the melt action's expression
	traverseBlock({
		blockNode: eachBlockNode,
		config,
	});
}
