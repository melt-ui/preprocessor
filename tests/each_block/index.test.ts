import { describe, it, expect } from 'vitest';
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
} from './index.svelte';

describe('Each Block', () => {
	const { markup } = preprocessMeltUI();
	if (!markup) throw new Error('Should always exist');

	it('basic each', async () => {
		const processed = await markup({
			content: basicEach,
		});

		expect(processed?.code).toBe(basicEachExpected);
	});

	it('basic identifier each', async () => {
		const processed = await markup({
			content: basicIdentifierEach,
		});

		expect(processed?.code).toBe(basicIdentifierEachExpected);
	});

	it('control each', async () => {
		const processed = await markup({
			content: controlEach,
		});

		expect(processed?.code).toBe(controlEachExpected);
	});

	it('duplicate args each', async () => {
		const processed = await markup({
			content: duplicateEach,
		});

		expect(processed?.code).toBe(duplicateEachExpected);
	});

	it('destructured context each', async () => {
		const processed = await markup({
			content: destructuredEach,
		});

		expect(processed?.code).toBe(destructuredEachExpected);
	});

	it('nested each - lexical shadowing', async () => {
		const processed = await markup({
			content: scopedEach,
		});

		expect(processed?.code).toBe(scopedEachExpected);
	});

	it('nested each - upper identifier only', async () => {
		const processed = await markup({
			content: nestedEachUpper,
		});

		expect(processed?.code).toBe(nestedEachUpperExpected);
	});

	it('nested each - lower identifier only', async () => {
		const processed = await markup({
			content: nestedEachLower,
		});

		expect(processed?.code).toBe(nestedEachLowerExpected);
	});

	it('nested each - both identifiers', async () => {
		const processed = await markup({
			content: nestedEachBoth,
		});

		expect(processed?.code).toBe(nestedEachBothExpected);
	});
});
