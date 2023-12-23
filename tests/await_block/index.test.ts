import { describe, test, expect } from 'vitest';
import { preprocessMeltUI } from '$pkg/index';
import {
	basicAwait,
	basicAwaitExpected,
	basicIdentifierAwait,
	basicIdentifierAwaitExpected,
	controlAwait,
	controlAwaitExpected,
	destructuredAwait,
	destructuredAwaitExpected,
	duplicateIdentifierAwait,
	duplicateIdentifierAwaitExpected,
	nestedAwaitUpper,
	nestedAwaitUpperExpected,
	nestedAwaitBoth,
	nestedAwaitBothExpected,
	nestedAwaitLower,
	nestedAwaitLowerExpected,
	scopedAwait,
	scopedAwaitExpected,
	basicShorthandAwait,
	basicShorthandAwaitExpected,
} from './index.svelte';

describe('Await Block', () => {
	const { markup } = preprocessMeltUI();
	if (!markup) throw new Error('Should always exist');

	test('basic await', async () => {
		const processed = await markup({
			content: basicAwait,
		});

		expect(processed?.code).toBe(basicAwaitExpected);
	});

	test('basic shorthand await', async () => {
		const processed = await markup({
			content: basicShorthandAwait,
		});

		expect(processed?.code).toBe(basicShorthandAwaitExpected);
	});

	test('basic identifier await', async () => {
		const processed = await markup({
			content: basicIdentifierAwait,
		});

		expect(processed?.code).toBe(basicIdentifierAwaitExpected);
	});

	test('control await', async () => {
		const processed = await markup({
			content: controlAwait,
		});

		expect(processed?.code).toBe(controlAwaitExpected);
	});

	test('duplicate args await', async () => {
		const processed = await markup({
			content: duplicateIdentifierAwait,
		});

		expect(processed?.code).toBe(duplicateIdentifierAwaitExpected);
	});

	test('destructured value and error await', async () => {
		const processed = await markup({
			content: destructuredAwait,
		});

		expect(processed?.code).toBe(destructuredAwaitExpected);
	});

	test('nested await - lexical shadowing', async () => {
		const processed = await markup({
			content: scopedAwait,
		});

		expect(processed?.code).toBe(scopedAwaitExpected);
	});

	test('nested await - upper identifier only', async () => {
		const processed = await markup({
			content: nestedAwaitUpper,
		});

		expect(processed?.code).toBe(nestedAwaitUpperExpected);
	});

	test('nested await - lower identifier only', async () => {
		const processed = await markup({
			content: nestedAwaitLower,
		});

		expect(processed?.code).toBe(nestedAwaitLowerExpected);
	});

	test('nested await - both identifiers', async () => {
		const processed = await markup({
			content: nestedAwaitBoth,
		});

		expect(processed?.code).toBe(nestedAwaitBothExpected);
	});
});
