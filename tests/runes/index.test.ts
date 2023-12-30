import { describe, test, expect } from 'vitest';
import { VERSION } from 'svelte/compiler';
import { preprocessMeltUI } from '$pkg/index';
import * as t from './index.svelte';

const isSvelte5 = VERSION.startsWith('5');
describe.skipIf(!isSvelte5)('Runes mode', () => {
	const { markup } = preprocessMeltUI({ svelteConfigPath: false });
	if (!markup) throw new Error('Should always exist');

	// Runes mode set via inference
	test('inferred runes - Identifiers', async () => {
		const processed = await markup({
			content: t.inferredRunes,
		});

		expect(processed?.code).toBe(t.inferredRunesExpected);
	});

	test('inferred runes - MemberExpression', async () => {
		const processed = await markup({
			content: t.inferredRunesMemberExpression,
		});

		expect(processed?.code).toBe(t.inferredRunesMemberExpressionExpected);
	});

	// Runes mode set via <svelte:options />
	test('runes mode set with <svelte:options runes={true}/>', async () => {
		const processed = await markup({
			content: t.svelteOptionsExplicit,
		});

		expect(processed?.code).toBe(t.svelteOptionsExplicitExpected);
	});

	test('runes mode set with <svelte:options runes />', async () => {
		const processed = await markup({
			content: t.svelteOptionsImplicit,
		});

		expect(processed?.code).toBe(t.svelteOptionsImplicitExpected);
	});

	test('runes mode disabled with <svelte:options runes={false} />', async () => {
		const processed = await markup({
			content: t.svelteOptionsExplicitDisabled,
		});

		expect(processed?.code).toBe(t.svelteOptionsExplicitDisabledExpected);
	});

	// Runes mode set via svelte config
	test('runes mode enabled with svelte config `compilerOptions.runes` set to `true`', async () => {
		const { markup } = preprocessMeltUI({
			svelteConfigPath: './tests/runes/svelte.config.enabled.js',
		});
		if (!markup) throw new Error('Should always exist');

		const processed = await markup({
			content: t.svelteConfigExplicitEnabled,
		});

		expect(processed?.code).toBe(t.svelteConfigExplicitEnabledExpected);
	});

	test('runes mode disabled with svelte config `compilerOptions.runes` set to `false`', async () => {
		const { markup } = preprocessMeltUI({
			svelteConfigPath: './tests/runes/svelte.config.disabled.js',
		});
		if (!markup) throw new Error('Should always exist');

		const processed = await markup({
			content: t.svelteConfigExplicitDisabled,
		});

		expect(processed?.code).toBe(t.svelteConfigExplicitDisabledExpected);
	});

	test('ignore svelte config', async () => {
		const { markup } = preprocessMeltUI({
			svelteConfigPath: false,
		});
		if (!markup) throw new Error('Should always exist');

		const processed = await markup({
			content: t.svelteConfigExplicitDisabled,
		});

		expect(processed?.code).toBe(t.svelteConfigExplicitDisabledExpected);
	});
});
