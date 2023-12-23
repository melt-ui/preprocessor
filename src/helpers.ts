import { walk as estree_walk } from 'estree-walker';

import type { Ast, TemplateNode } from 'svelte/types/compiler/interfaces';
import type { Node } from './types.js';
import type { CallExpression } from 'estree';

export function isAliasedAction(name: string, alias: string | string[]): boolean {
	if (typeof alias === 'string') {
		return name === alias;
	}
	return alias.includes(name);
}

const RUNES = [
	'$derived',
	'$effect',
	'$effect.active',
	'$effect.pre',
	'$effect.root',
	'$inspect',
	'$inspect.with',
	'$props',
	'$state',
];

/**
 * There are 3 ways to determine if a component is in 'runes mode':
 * 	1. If `<svelte:options runes={true} />` is set
 * 	2. If `svelte-config.compilerOptions.runes` === `true`
 * 	3. If a rune is present in the component (`$state`, `$derived`, `$effect`, etc.)
 */
export function isRuneMode(ast: Ast & { options?: { runes?: boolean } | null }): boolean {
	// The `options` field is only present at the AST root in Svelte 5
	// `<svelte:options runes />`
	if (ast.options?.runes !== undefined) {
		return ast.options.runes;
	}

	// `svelte-config.compilerOptions.runes`
	// TODO: not sure how to do this yet

	// a rune is present in the component
	let hasRunes = false;
	if (ast.module) {
		hasRunes = containsRunes(ast.module);
	}

	if (ast.instance) {
		hasRunes = hasRunes || containsRunes(ast.instance);
	}

	return hasRunes;
}
type Script = NonNullable<Ast['instance']>;
function containsRunes(script: Script): boolean {
	let containsRunes = false;

	walk(script, {
		enter(node) {
			// already found a rune, don't need to check the rest
			if (containsRunes) {
				this.skip();
				return;
			}

			if (node.type !== 'CallExpression') return;
			const callExpression = node as unknown as CallExpression;

			// $inspect(item)
			const callee = callExpression.callee;
			if (callee.type === 'Identifier') {
				containsRunes = RUNES.some((rune) => rune === callee.name);
			}
			// $inspect.with(item)
			if (callee.type === 'MemberExpression') {
				if (callee.computed) return;
				if (callee.object.type !== 'Identifier') return;
				if (callee.property.type !== 'Identifier') return;

				const name = callee.object.name + '.' + callee.property.name;
				containsRunes = RUNES.some((rune) => rune === name);
			}
		},
	});

	return containsRunes;
}

export function getMeltBuilderName(i: number) {
	return `__MELTUI_BUILDER_${i}__`;
}

// excuse the mess...
type Enter = Parameters<typeof estree_walk>[1]['enter'];
type EnterParams = Parameters<NonNullable<Enter>>;
type Leave = Parameters<typeof estree_walk>[1]['leave'];
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
	return estree_walk(ast, args);
}
