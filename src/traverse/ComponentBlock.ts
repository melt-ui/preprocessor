import { traverseBlock } from './Block.js';

import type { TemplateNode } from 'svelte/types/compiler/interfaces';
import type { Config } from '../types.js';

type TraverseEachBlockArgs = {
	compBlockNode: TemplateNode;
	config: Config;
};
export function traverseComponentBlock({ compBlockNode, config }: TraverseEachBlockArgs) {
	if (compBlockNode.type !== 'InlineComponent' && compBlockNode.type !== 'SlotTemplate')
		throw Error('This node is not an InlineComponent or a SlotTemplate');

	// determine if those identifiers are scoped to this block
	traverseBlock({
		blockNode: compBlockNode,
		config,
	});
}
