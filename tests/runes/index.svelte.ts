export const inferredRunes = `
<script>
	import { writable } from 'svelte/store';
	import { melt } from '@melt-ui/svelte';

    let count = $state(0);

	const builder = writable(({ arg1, arg2 }) => {
		return {
			role: 'Mock',
			action: () => {},
		};
	});
</script>

<div use:melt={$builder({ arg1: 1, arg2: '' })} />
`;

export const inferredRunesExpected = `
<script>
	import { writable } from 'svelte/store';
	import { melt } from '@melt-ui/svelte';

    let count = $state(0);

	const builder = writable(({ arg1, arg2 }) => {
		return {
			role: 'Mock',
			action: () => {},
		};
	});

	let __MELTUI_BUILDER_0__ = $derived($builder({ arg1: 1, arg2: '' }));
</script>

<div {...__MELTUI_BUILDER_0__} use:__MELTUI_BUILDER_0__.action />
`;

export const svelteOptionsExplicit = `
<svelte:options runes={true} />
<script>
	import { writable } from 'svelte/store';
	import { melt } from '@melt-ui/svelte';

	const builder = writable(({ arg1, arg2 }) => {
		return {
			role: 'Mock',
			action: () => {},
		};
	});
</script>

<div use:melt={$builder({ arg1: 1, arg2: '' })} />
`;

export const svelteOptionsExplicitExpected = `
<svelte:options runes={true} />
<script>
	import { writable } from 'svelte/store';
	import { melt } from '@melt-ui/svelte';

	const builder = writable(({ arg1, arg2 }) => {
		return {
			role: 'Mock',
			action: () => {},
		};
	});

	let __MELTUI_BUILDER_0__ = $derived($builder({ arg1: 1, arg2: '' }));
</script>

<div {...__MELTUI_BUILDER_0__} use:__MELTUI_BUILDER_0__.action />
`;

export const svelteOptionsImplicit = `
<svelte:options runes />
<script>
	import { writable } from 'svelte/store';
	import { melt } from '@melt-ui/svelte';

	const builder = writable(({ arg1, arg2 }) => {
		return {
			role: 'Mock',
			action: () => {},
		};
	});
</script>

<div use:melt={$builder({ arg1: 1, arg2: '' })} />
`;

export const svelteOptionsImplicitExpected = `
<svelte:options runes />
<script>
	import { writable } from 'svelte/store';
	import { melt } from '@melt-ui/svelte';

	const builder = writable(({ arg1, arg2 }) => {
		return {
			role: 'Mock',
			action: () => {},
		};
	});

	let __MELTUI_BUILDER_0__ = $derived($builder({ arg1: 1, arg2: '' }));
</script>

<div {...__MELTUI_BUILDER_0__} use:__MELTUI_BUILDER_0__.action />
`;
