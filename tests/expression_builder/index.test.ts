import { describe, it, expect } from 'vitest';
import { preprocessMeltUI } from '$pkg/index';
import {
	callExpression,
	callExpressionExpected,
	objExpression,
	objExpressionExpected,
	multiExpressions,
	multiExpressionsExpected,
} from './index.svelte';

describe('Expression Builder', () => {
	const { markup } = preprocessMeltUI();
	if (!markup) throw new Error('Should always exist');

	it('CallExpression', async () => {
		const processed = await markup({
			content: callExpression,
		});

		expect(processed?.code).toBe(callExpressionExpected);
	});

	it('ObjectExpression', async () => {
		const processed = await markup({
			content: objExpression,
		});

		expect(processed?.code).toBe(objExpressionExpected);
	});

	it('Multi CallExpression', async () => {
		const processed = await markup({
			content: multiExpressions,
		});

		expect(processed?.code).toBe(multiExpressionsExpected);
	});
});
