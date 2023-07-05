import { describe, it, expect } from 'vitest';
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

	it('basic component', async () => {
		const processed = await markup({
			content: basicComponent,
		});

		expect(processed?.code).toBe(basicComponentExpected);
	});

	it('basic shorthand', async () => {
		const processed = await markup({
			content: basicShorthand,
		});

		expect(processed?.code).toBe(basicShorthandExpected);
	});

	it('basic identifier', async () => {
		const processed = await markup({
			content: basicIdentifier,
		});

		expect(processed?.code).toBe(basicIdentifierExpected);
	});

	it('control', async () => {
		const processed = await markup({
			content: control,
		});

		expect(processed?.code).toBe(controlExpected);
	});

	it('duplicate args await', async () => {
		const processed = await markup({
			content: duplicateIdentifier,
		});

		expect(processed?.code).toBe(duplicateIdentifierExpected);
	});

	it('destructured value and error await', async () => {
		const processed = await markup({
			content: destructured,
		});

		expect(processed?.code).toBe(destructuredExpected);
	});

	it('nested await - lexical shadowing', async () => {
		const processed = await markup({
			content: scoped,
		});

		expect(processed?.code).toBe(scopedExpected);
	});

	it('nested await - upper identifier only', async () => {
		const processed = await markup({
			content: nestedUpper,
		});

		expect(processed?.code).toBe(nestedUpperExpected);
	});

	it('nested await - lower identifier only', async () => {
		const processed = await markup({
			content: nestedLower,
		});

		expect(processed?.code).toBe(nestedLowerExpected);
	});

	it('nested await - both identifiers', async () => {
		const processed = await markup({
			content: nestedBoth,
		});

		expect(processed?.code).toBe(nestedBothExpected);
	});

	it('slot template - both identifiers', async () => {
		const processed = await markup({
			content: slotTemplate,
		});

		expect(processed?.code).toBe(slotTemplateExpected);
	});
});
