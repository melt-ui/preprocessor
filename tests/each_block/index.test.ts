import { describe, test, expect } from 'vitest';
import { preprocessMeltUI } from '$pkg/index';
import * as t from './index.svelte';

describe('Each Block', () => {
	const { markup } = preprocessMeltUI();
	if (!markup) throw new Error('Should always exist');

	test('basic each', async () => {
		const processed = await markup({
			content: t.basicEach,
		});

		expect(processed?.code).toBe(t.basicEachExpected);
	});

	test('basic identifier each', async () => {
		const processed = await markup({
			content: t.basicIdentifierEach,
		});

		expect(processed?.code).toBe(t.basicIdentifierEachExpected);
	});

	test('control each', async () => {
		const processed = await markup({
			content: t.controlEach,
		});

		expect(processed?.code).toBe(t.controlEachExpected);
	});

	test('duplicate args each', async () => {
		const processed = await markup({
			content: t.duplicateEach,
		});

		expect(processed?.code).toBe(t.duplicateEachExpected);
	});

	test('destructured context each', async () => {
		const processed = await markup({
			content: t.destructuredEach,
		});

		expect(processed?.code).toBe(t.destructuredEachExpected);
	});

	test('nested each - lexical shadowing', async () => {
		const processed = await markup({
			content: t.scopedEach,
		});

		expect(processed?.code).toBe(t.scopedEachExpected);
	});

	test('nested each - upper identifier only', async () => {
		const processed = await markup({
			content: t.nestedEachUpper,
		});

		expect(processed?.code).toBe(t.nestedEachUpperExpected);
	});

	test('nested each - lower identifier only', async () => {
		const processed = await markup({
			content: t.nestedEachLower,
		});

		expect(processed?.code).toBe(t.nestedEachLowerExpected);
	});

	test('nested each - both identifiers', async () => {
		const processed = await markup({
			content: t.nestedEachBoth,
		});

		expect(processed?.code).toBe(t.nestedEachBothExpected);
	});

	test('each block with no reference to the context', async () => {
		const processed = await markup({
			content: t.thumbEach,
		});

		expect(processed?.code).toBe(t.thumbEachExpected);
	});
});
