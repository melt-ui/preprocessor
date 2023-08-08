import { walk as svelte_walk } from 'svelte/compiler';

import type { TemplateNode } from 'svelte/types/compiler/interfaces';
import type { Node } from './types.js';

export function isAliasedAction(name: string, alias: string | string[]): boolean {
	if (typeof alias === 'string') {
		return name === alias;
	}
	return alias.includes(name);
}

export function getMeltBuilderName(i: number) {
	return `__MELTUI_BUILDER_${i}__`;
}

// excuse the mess...
type Enter = Parameters<typeof svelte_walk>[1]['enter'];
type EnterParams = Parameters<NonNullable<Enter>>;
type Leave = Parameters<typeof svelte_walk>[1]['leave'];
type WalkerContext = {
	skip: () => void;
	remove: () => void;
	replace: (node: Node) => void;
};
type WalkerArgs<Node extends TemplateNode> = {
	enter?: (
		this: WalkerContext,
		node: Node,
		parent: Node | null,
		key: EnterParams[2],
		index: EnterParams[3]
	) => void;
	leave?: Leave;
};
/**
 * Enhances the param types of the estree-walker's `walk` function
 * as it doesn't want to accept Svelte's provided `TemplateNode` type.
 */
export function walk<AST extends TemplateNode | Array<Node>, Node extends TemplateNode>(
	ast: AST,
	args: WalkerArgs<Node>
) {
	// @ts-expect-error do this once so i don't have to keep adding these ignores
	return svelte_walk(ast, args);
}
