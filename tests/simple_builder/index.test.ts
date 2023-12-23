import { describe, test, expect } from 'vitest';
import { preprocessMeltUI } from '$pkg/index';
import {
	simple,
	simpleExpected,
	aliasedExpression,
	aliasedExpressionExpected,
	aliasedMelt,
	aliasedMeltExpected,
} from './index.svelte';

describe('Simple Builder - Identifiers', () => {
	const { markup } = preprocessMeltUI();
	if (!markup) throw new Error('Should always exist');

	test('simple', async () => {
		const processed = await markup({
			content: simple,
		});

		expect(processed?.code).toBe(simpleExpected);
	});

	test('aliased expression', async () => {
		const processed = await markup({
			content: aliasedExpression,
		});

		expect(processed?.code).toBe(aliasedExpressionExpected);
	});

	test('aliased melt action', async () => {
		const { markup: aliasMarkup } = preprocessMeltUI({ alias: ['melt', '_melt'] });
		if (!aliasMarkup) throw new Error('Should always exist');

		const processed = await aliasMarkup({
			content: aliasedMelt,
		});

		expect(processed?.code).toBe(aliasedMeltExpected);
	});
});
