import { describe, test, expect } from 'vitest';
import { preprocessMeltUI } from '$pkg/index';
import {
	basicComponent,
	basicComponentExpected,
	basicIdentifier,
	basicIdentifierExpected,
	control,
	controlExpected,
	destructured,
	destructuredExpected,
	duplicateIdentifier,
	duplicateIdentifierExpected,
	nestedUpper,
	nestedUpperExpected,
	nestedBoth,
	nestedBothExpected,
	nestedLower,
	nestedLowerExpected,
	scoped,
	scopedExpected,
	basicShorthand,
	basicShorthandExpected,
	slotTemplate,
	slotTemplateExpected,
} from './index.svelte';

describe('Component Block', () => {
	const { markup } = preprocessMeltUI();
	if (!markup) throw new Error('Should always exist');

	test('basic component', async () => {
		const processed = await markup({
			content: basicComponent,
		});

		expect(processed?.code).toBe(basicComponentExpected);
	});

	test('basic shorthand', async () => {
		const processed = await markup({
			content: basicShorthand,
		});

		expect(processed?.code).toBe(basicShorthandExpected);
	});

	test('basic identifier', async () => {
		const processed = await markup({
			content: basicIdentifier,
		});

		expect(processed?.code).toBe(basicIdentifierExpected);
	});

	test('control', async () => {
		const processed = await markup({
			content: control,
		});

		expect(processed?.code).toBe(controlExpected);
	});

	test('duplicate args', async () => {
		const processed = await markup({
			content: duplicateIdentifier,
		});

		expect(processed?.code).toBe(duplicateIdentifierExpected);
	});

	test('destructured value and error', async () => {
		const processed = await markup({
			content: destructured,
		});

		expect(processed?.code).toBe(destructuredExpected);
	});

	test('nested - lexical shadowing', async () => {
		const processed = await markup({
			content: scoped,
		});

		expect(processed?.code).toBe(scopedExpected);
	});

	test('nested - upper identifier only', async () => {
		const processed = await markup({
			content: nestedUpper,
		});

		expect(processed?.code).toBe(nestedUpperExpected);
	});

	test('nested - lower identifier only', async () => {
		const processed = await markup({
			content: nestedLower,
		});

		expect(processed?.code).toBe(nestedLowerExpected);
	});

	test('nested - both identifiers', async () => {
		const processed = await markup({
			content: nestedBoth,
		});

		expect(processed?.code).toBe(nestedBothExpected);
	});

	test('slot template - both identifiers', async () => {
		const processed = await markup({
			content: slotTemplate,
		});

		expect(processed?.code).toBe(slotTemplateExpected);
	});
});
