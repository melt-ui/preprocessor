import { describe, test, expect } from 'vitest';
import { preprocessMeltUI } from '$pkg/index';
import {
	basicEach,
	basicEachExpected,
	basicIdentifierEach,
	basicIdentifierEachExpected,
	controlEach,
	controlEachExpected,
	destructuredEach,
	destructuredEachExpected,
	duplicateEach,
	duplicateEachExpected,
	nestedEachUpper,
	nestedEachUpperExpected,
	nestedEachBoth,
	nestedEachBothExpected,
	nestedEachLower,
	nestedEachLowerExpected,
	scopedEach,
	scopedEachExpected,
	thumbEach,
	thumbEachExpected,
} from './index.svelte';

describe('Each Block', () => {
	const { markup } = preprocessMeltUI();
	if (!markup) throw new Error('Should always exist');

	test('basic each', async () => {
		const processed = await markup({
			content: basicEach,
		});

		expect(processed?.code).toBe(basicEachExpected);
	});

	test('basic identifier each', async () => {
		const processed = await markup({
			content: basicIdentifierEach,
		});

		expect(processed?.code).toBe(basicIdentifierEachExpected);
	});

	test('control each', async () => {
		const processed = await markup({
			content: controlEach,
		});

		expect(processed?.code).toBe(controlEachExpected);
	});

	test('duplicate args each', async () => {
		const processed = await markup({
			content: duplicateEach,
		});

		expect(processed?.code).toBe(duplicateEachExpected);
	});

	test('destructured context each', async () => {
		const processed = await markup({
			content: destructuredEach,
		});

		expect(processed?.code).toBe(destructuredEachExpected);
	});

	test('nested each - lexical shadowing', async () => {
		const processed = await markup({
			content: scopedEach,
		});

		expect(processed?.code).toBe(scopedEachExpected);
	});

	test('nested each - upper identifier only', async () => {
		const processed = await markup({
			content: nestedEachUpper,
		});

		expect(processed?.code).toBe(nestedEachUpperExpected);
	});

	test('nested each - lower identifier only', async () => {
		const processed = await markup({
			content: nestedEachLower,
		});

		expect(processed?.code).toBe(nestedEachLowerExpected);
	});

	test('nested each - both identifiers', async () => {
		const processed = await markup({
			content: nestedEachBoth,
		});

		expect(processed?.code).toBe(nestedEachBothExpected);
	});

	test('each block with no reference to the context', async () => {
		const processed = await markup({
			content: thumbEach,
		});

		expect(processed?.code).toBe(thumbEachExpected);
	});
});
