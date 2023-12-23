import { describe, test, expect } from 'vitest';
import { preprocessMeltUI } from '$pkg/index';
import * as t from './index.svelte';

describe('Await Block', () => {
	const { markup } = preprocessMeltUI();
	if (!markup) throw new Error('Should always exist');

	test('basic await', async () => {
		const processed = await markup({
			content: t.basicAwait,
		});

		expect(processed?.code).toBe(t.basicAwaitExpected);
	});

	test('basic shorthand await', async () => {
		const processed = await markup({
			content: t.basicShorthandAwait,
		});

		expect(processed?.code).toBe(t.basicShorthandAwaitExpected);
	});

	test('basic identifier await', async () => {
		const processed = await markup({
			content: t.basicIdentifierAwait,
		});

		expect(processed?.code).toBe(t.basicIdentifierAwaitExpected);
	});

	test('control await', async () => {
		const processed = await markup({
			content: t.controlAwait,
		});

		expect(processed?.code).toBe(t.controlAwaitExpected);
	});

	test('duplicate args await', async () => {
		const processed = await markup({
			content: t.duplicateIdentifierAwait,
		});

		expect(processed?.code).toBe(t.duplicateIdentifierAwaitExpected);
	});

	test('destructured value and error await', async () => {
		const processed = await markup({
			content: t.destructuredAwait,
		});

		expect(processed?.code).toBe(t.destructuredAwaitExpected);
	});

	test('nested await - lexical shadowing', async () => {
		const processed = await markup({
			content: t.scopedAwait,
		});

		expect(processed?.code).toBe(t.scopedAwaitExpected);
	});

	test('nested await - upper identifier only', async () => {
		const processed = await markup({
			content: t.nestedAwaitUpper,
		});

		expect(processed?.code).toBe(t.nestedAwaitUpperExpected);
	});

	test('nested await - lower identifier only', async () => {
		const processed = await markup({
			content: t.nestedAwaitLower,
		});

		expect(processed?.code).toBe(t.nestedAwaitLowerExpected);
	});

	test('nested await - both identifiers', async () => {
		const processed = await markup({
			content: t.nestedAwaitBoth,
		});

		expect(processed?.code).toBe(t.nestedAwaitBothExpected);
	});
});
