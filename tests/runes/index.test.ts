import { describe, test, expect } from 'vitest';
import { preprocessMeltUI } from '$pkg/index';
import * as t from './index.svelte';

describe('Runes mode', () => {
	const { markup } = preprocessMeltUI();
	if (!markup) throw new Error('Should always exist');

	test.skip('inferred runes', async () => {
		const processed = await markup({
			content: t.inferredRunes,
		});

		expect(processed?.code).toBe(t.inferredRunesExpected);
	});

	test.skip('runes mode set with <svelte:options runes={true}/>', async () => {
		const processed = await markup({
			content: t.svelteOptionsExplicit,
		});

		expect(processed?.code).toBe(t.svelteOptionsExplicitExpected);
	});

	test.skip('runes mode set with <svelte:options runes />', async () => {
		const processed = await markup({
			content: t.svelteOptionsImplicit,
		});

		expect(processed?.code).toBe(t.svelteOptionsImplicitExpected);
	});
});
