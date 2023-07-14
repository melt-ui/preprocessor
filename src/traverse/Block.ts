import {
	extractIdentifiers,
	getMeltBuilderName,
	isAliasedAction,
	walk,
} from '../helpers';
import { traverse } from './index.js';

import type { TemplateNode } from 'svelte/types/compiler/interfaces';
import type { Config } from '../types.js';

type BlockArgs = {
	blockNode: TemplateNode;
	blockIdentifiers: Set<string>;
	leftOverActions: TemplateNode[];
	config: Config;
};

/**
 * Traverses any given block and checks if there are any identifiers
 * that exist in it's child `melt` action's expression.
 *
 * If there are, we'll inject an `{@const}` block into the provided block
 * with it's corresponding identifiers.
 */
export function traverseBlock(args: BlockArgs) {
	const { blockNode, blockIdentifiers, config, leftOverActions } = args;
	if (blockNode.children === undefined) return;

	// walk the children to determine if the block's provided identifiers are
	// being used in the melt action's expression
	walk(blockNode.children, {
		enter(node, parent) {
			if (
				parent?.type !== 'InlineComponent' && // we don't want to process component props
				node.type === 'Attribute' &&
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

			// only want to walk over the direct children, so we'll skip the rest
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
 * Injects the `{@const}` block as a child of the provided block node. If there's nothing
 * to inject, it will add the provided node to the list of leftover actions.
 */
function handleActionNode({
	config,
	actionNode,
	leftOverActions,
	knownIdentifiers,
	blockNode,
}: HandleActionNodeArgs) {
	const expression = actionNode.value[0].expression as TemplateNode;
	const expressionIdentifiers = new Set<string>();
	let inserted = false;

	// any other expression type...
	// i.e. melt={$builder({ arg1: '', arg2: '' })}
	if (expression.type !== 'Identifier') {
		const expressionContent = config.content.substring(expression.start, expression.end);
		extractIdentifiers(expression).forEach((identifier) =>
			expressionIdentifiers.add(identifier)
		);

		// const
		for (const identifier of expressionIdentifiers) {
			if (!knownIdentifiers.has(identifier)) {
				continue;
			}

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

		// if no {@const} block was injected, add it to the list of untouched actions
		if (inserted === false) {
			leftOverActions.push(actionNode);
		}
	} else {
		// if it's just an identifier, add it to the list of builders so that it can
		// later be transformed into the correct syntax
		config.builders.push({
			identifierName: expression.name,
			startPos: actionNode.start,
			endPos: actionNode.end,
		});
	}
}
