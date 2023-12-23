import { describe, test, expect } from 'vitest';
import { preprocessMeltUI } from '$pkg/index';
import * as t from './index.svelte';

describe('Expression Builder', () => {
	const { markup } = preprocessMeltUI();
	if (!markup) throw new Error('Should always exist');

	test('CallExpression', async () => {
		const processed = await markup({
			content: t.callExpression,
		});

		expect(processed?.code).toBe(t.callExpressionExpected);
	});

	test('ObjectExpression', async () => {
		const processed = await markup({
			content: t.objExpression,
		});

		expect(processed?.code).toBe(t.objExpressionExpected);
	});

	test('Multi CallExpression', async () => {
		const processed = await markup({
			content: t.multiExpressions,
		});

		expect(processed?.code).toBe(t.multiExpressionsExpected);
	});
});
