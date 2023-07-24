import { describe, it, expect } from 'vitest';
import { preprocessMeltUI } from '$pkg/index';
import {
	simple,
	simpleExpected,
	aliased,
	aliasedExpected,
	meltAlias,
	meltAliasExpected,
	ignoreComps,
	ignoreCompsExpected,
} from './index.svelte';

describe('Simple Builder - Identifiers', () => {
	const { markup } = preprocessMeltUI();
	if (!markup) throw new Error('Should always exist');

	it('simple', async () => {
		const processed = await markup({
			content: simple,
		});

		expect(processed?.code).toBe(simpleExpected);
	});

	it('aliased', async () => {
		const processed = await markup({
			content: aliased,
		});

		expect(processed?.code).toBe(aliasedExpected);
	});

	it('builder aliased as melt with AttributeShorthand', async () => {
		const processed = await markup({
			content: meltAlias,
		});

		expect(processed?.code).toBe(meltAliasExpected);
	});

	it('ignore component props', async () => {
		const processed = await markup({
			content: ignoreComps,
		});

		expect(processed?.code).toBe(ignoreCompsExpected);
	});
});
