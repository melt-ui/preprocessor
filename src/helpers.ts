import { walk as svelte_walk } from 'svelte/compiler';
import { traverse } from './traverse/index.js';

import type { TemplateNode } from 'svelte/types/compiler/interfaces';
import type { Config, Node } from './types.js';

export function isAliasedAction(name: string, alias: string | string[]): boolean {
	if (typeof alias === 'string') {
		return name === alias;
	}
	return alias.includes(name);
}

export function getMeltBuilderName(i: number) {
	return `__MELTUI_BUILDER_${i}__`;
}

// Excuse the mess...
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
		parent: EnterParams[1],
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
	// @ts-expect-error do this once so i don't have to keep doing this
	return svelte_walk(ast, args);
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
	if (blockNode.children === undefined) return;

	// figure out if those identifiers are being used in the melt action expression
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

type HandleActionNodeArgs = {
	blockNode: TemplateNode;
	knownIdentifiers: Set<string>;
	actionNode: TemplateNode;
	leftOverActions: TemplateNode[];
	config: Config;
};

/**
 * D
 */
function handleActionNode({
	config,
	actionNode,
	leftOverActions,
	knownIdentifiers,
	blockNode,
}: HandleActionNodeArgs) {
	const expression = actionNode.expression as Node;
	const expressionIdentifiers = new Set<string>();
	let inserted = false;

	// any other expression type...
	// i.e. use:melt={$builder({ arg1: '', arg2: '' })}
	if (expression.type !== 'Identifier') {
		const expressionContent = config.content.substring(expression.start, expression.end);
		extractIdentifiers(expression).forEach((identifier) =>
			expressionIdentifiers.add(identifier)
		);

		// const
		for (const identifier of expressionIdentifiers) {
			if (!knownIdentifiers.has(identifier)) continue;

			// make this into a {@const} block
			const start = blockNode.children?.at(0)?.start;
			const constIdentifier = getMeltBuilderName(config.builderCount++);
			if (!start) throw Error('This is unreachable');

			config.builders.push({
				identifierName: constIdentifier,
				startPos: actionNode.start,
				endPos: actionNode.end,
			});

			config.markup.prependRight(
				start,
				`{@const ${constIdentifier} = ${expressionContent}}`
			);
			inserted = true;
			break;
		}

		if (inserted === false) {
			// add it to the list of untouched actions
			leftOverActions.push(actionNode);
		}
	} else {
		config.builders.push({
			identifierName: expression.name,
			startPos: actionNode.start,
			endPos: actionNode.end,
		});
	}
}
