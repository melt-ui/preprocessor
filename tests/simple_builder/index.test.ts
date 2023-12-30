import { describe, test, expect } from 'vitest';
import { preprocessMeltUI } from '$pkg/index';
import * as t from './index.svelte';

describe('Simple Builder - Identifiers', () => {
	const { markup } = preprocessMeltUI({ svelteConfigPath: false });
	if (!markup) throw new Error('Should always exist');

	test('simple', async () => {
		const processed = await markup({
			content: t.simple,
		});

		expect(processed?.code).toBe(t.simpleExpected);
	});

	test('aliased expression', async () => {
		const processed = await markup({
			content: t.aliasedExpression,
		});

		expect(processed?.code).toBe(t.aliasedExpressionExpected);
	});

	test('aliased melt action', async () => {
		const { markup: aliasMarkup } = preprocessMeltUI({
			alias: ['melt', '_melt'],
			svelteConfigPath: false,
		});
		if (!aliasMarkup) throw new Error('Should always exist');

		const processed = await aliasMarkup({
			content: t.aliasedMelt,
		});

		expect(processed?.code).toBe(t.aliasedMeltExpected);
	});
});
