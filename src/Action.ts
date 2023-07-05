import { extractIdentifiers, getMeltBuilderName } from './helpers';

import type { TemplateNode } from 'svelte/types/compiler/interfaces';
import type { Config, Node } from './types';

type HandleActionNodeArgs = {
	blockNode: TemplateNode;
	knownIdentifiers: Set<string>;
	actionNode: TemplateNode;
	leftOverActions: TemplateNode[];
	config: Config;
};
/**
 * Does something important
 */
export function handleActionNode({
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
