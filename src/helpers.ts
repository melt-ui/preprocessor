import { walk } from 'svelte/compiler';
import { handleActionNode } from './Action';
import { traverse } from './traverse';

import type { Config, Node } from './types';
import type { TemplateNode } from 'svelte/types/compiler/interfaces';

export function isAliasedAction(name: string, alias: string | string[]): boolean {
	if (typeof alias === 'string') {
		return name === alias;
	}
	return alias.includes(name);
}

export function getMeltBuilderName(i: number) {
	return `__MELTUI_BUILDER_${i}__`;
}

/**
 * Extracts all the identifiers found in the expression.
 */
export function extractIdentifiers<Expression extends Node>(expression: Expression) {
	const identifiers = new Set<string>();
	// get all the identifiers found in the expression
	walk(expression, {
		enter(node, parent) {
			if (node.type === 'Identifier') {
				// ignore property keys
				if (parent?.type === 'Property' && parent.key === node) {
					this.skip();
					return;
				}
				identifiers.add(node.name);
			}
		},
	});

	return identifiers;
}

type BlockArgs = {
	blockNode: TemplateNode;
	blockIdentifiers: Set<string>;
	leftOverActions: TemplateNode[];
	config: Config;
};
/**
 * Traverses any given block and checks if there are any identifiers
 * that belong to the melt action expression.
 */
export function traverseBlock(args: BlockArgs) {
	const { blockNode, blockIdentifiers, config, leftOverActions } = args;

	// figure out if those identifiers are being used in the melt action expression
	// @ts-expect-error same issue
	walk(blockNode.children, {
		enter(node: TemplateNode) {
			// if it's an action, handle it
			if (
				node.type === 'Action' &&
				isAliasedAction(node.name, config.alias) &&
				node.expression !== null // assigned to something
			) {
				handleActionNode({
					actionNode: node,
					knownIdentifiers: blockIdentifiers,
					blockNode,
					config,
					leftOverActions,
				});

				// we don't have to walk the Action's children
				this.skip();
				return;
			}

			// if it's anything else, walk again
			const returnedActions = traverse({ baseNode: node, config });

			for (const actionNode of returnedActions) {
				handleActionNode({
					knownIdentifiers: blockIdentifiers,
					actionNode,
					blockNode,
					config,
					leftOverActions,
				});
			}

			this.skip();
		},
	});
}
