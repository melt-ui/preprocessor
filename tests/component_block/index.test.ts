import { describe, test, expect } from 'vitest';
import { preprocessMeltUI } from '$pkg/index';
import * as t from './index.svelte';

describe('Component Block', () => {
	const { markup } = preprocessMeltUI();
	if (!markup) throw new Error('Should always exist');

	test('basic component', async () => {
		const processed = await markup({
			content: t.basicComponent,
		});

		expect(processed?.code).toBe(t.basicComponentExpected);
	});

	test('basic shorthand', async () => {
		const processed = await markup({
			content: t.basicShorthand,
		});

		expect(processed?.code).toBe(t.basicShorthandExpected);
	});

	test('basic identifier', async () => {
		const processed = await markup({
			content: t.basicIdentifier,
		});

		expect(processed?.code).toBe(t.basicIdentifierExpected);
	});

	test('control', async () => {
		const processed = await markup({
			content: t.control,
		});

		expect(processed?.code).toBe(t.controlExpected);
	});

	test('duplicate args', async () => {
		const processed = await markup({
			content: t.duplicateIdentifier,
		});

		expect(processed?.code).toBe(t.duplicateIdentifierExpected);
	});

	test('destructured value and error', async () => {
		const processed = await markup({
			content: t.destructured,
		});

		expect(processed?.code).toBe(t.destructuredExpected);
	});

	test('nested - lexical shadowing', async () => {
		const processed = await markup({
			content: t.scoped,
		});

		expect(processed?.code).toBe(t.scopedExpected);
	});

	test('nested - upper identifier only', async () => {
		const processed = await markup({
			content: t.nestedUpper,
		});

		expect(processed?.code).toBe(t.nestedUpperExpected);
	});

	test('nested - lower identifier only', async () => {
		const processed = await markup({
			content: t.nestedLower,
		});

		expect(processed?.code).toBe(t.nestedLowerExpected);
	});

	test('nested - both identifiers', async () => {
		const processed = await markup({
			content: t.nestedBoth,
		});

		expect(processed?.code).toBe(t.nestedBothExpected);
	});

	test('slot template - both identifiers', async () => {
		const processed = await markup({
			content: t.slotTemplate,
		});

		expect(processed?.code).toBe(t.slotTemplateExpected);
	});
});
