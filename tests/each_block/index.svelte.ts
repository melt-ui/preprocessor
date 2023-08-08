export const basicEach = `
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

{#each [1, 2, 3] as item}
	<div use:melt={$builder({ arg1: item, arg2: '' })} />
{/each}
`;

export const basicEachExpected = `
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

{#each [1, 2, 3] as item}
	{@const __MELTUI_BUILDER_0__ = $builder({ arg1: item, arg2: '' })}
	<div {...__MELTUI_BUILDER_0__} use:__MELTUI_BUILDER_0__.action />
{/each}
`;

export const controlEach = `
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

{#each [1, 2, 3] as item}
	<div use:melt={$builder({ arg1: 1, arg2: '' })} />
{/each}
`;

export const controlEachExpected = `
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

{#each [1, 2, 3] as item}
	{@const __MELTUI_BUILDER_0__ = $builder({ arg1: 1, arg2: '' })}
	<div {...__MELTUI_BUILDER_0__} use:__MELTUI_BUILDER_0__.action />
{/each}
`;

export const basicIdentifierEach = `
<script>
	import { writable } from 'svelte/store';
	import { melt } from '@melt-ui/svelte';

	const builder = writable({
		role: 'Mock',
		action: () => {},
	});
</script>

{#each [1, 2, 3] as item}
	<div use:melt={$builder} />
{/each}
`;

export const basicIdentifierEachExpected = `
<script>
	import { writable } from 'svelte/store';
	import { melt } from '@melt-ui/svelte';

	const builder = writable({
		role: 'Mock',
		action: () => {},
	});
</script>

{#each [1, 2, 3] as item}
	<div {...$builder} use:$builder.action />
{/each}
`;

export const duplicateEach = `
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

{#each [1, 2, 3] as item}
	<div use:melt={$builder({ arg1: item, arg2: item })} />
{/each}
`;

export const duplicateEachExpected = `
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

{#each [1, 2, 3] as item}
	{@const __MELTUI_BUILDER_0__ = $builder({ arg1: item, arg2: item })}
	<div {...__MELTUI_BUILDER_0__} use:__MELTUI_BUILDER_0__.action />
{/each}
`;

export const destructuredEach = `
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

{#each [{item1: 1, item2: 1}, {item1: 2, item2: 2}, {item1: 3, item2: 3}] as {item1, item2}}
	<div use:melt={$builder({ arg1: item1, arg2: item2 })} />
{/each}
`;

export const destructuredEachExpected = `
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

{#each [{item1: 1, item2: 1}, {item1: 2, item2: 2}, {item1: 3, item2: 3}] as {item1, item2}}
	{@const __MELTUI_BUILDER_0__ = $builder({ arg1: item1, arg2: item2 })}
	<div {...__MELTUI_BUILDER_0__} use:__MELTUI_BUILDER_0__.action />
{/each}
`;

export const scopedEach = `
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

{#each [1, 2, 3] as item}
	{#each [4, 5, 6] as item}
		<div use:melt={$builder({ arg1: item, arg2: '' })} />
	{/each}
{/each}
`;

export const scopedEachExpected = `
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

{#each [1, 2, 3] as item}
	{#each [4, 5, 6] as item}
		{@const __MELTUI_BUILDER_0__ = $builder({ arg1: item, arg2: '' })}
		<div {...__MELTUI_BUILDER_0__} use:__MELTUI_BUILDER_0__.action />
	{/each}
{/each}
`;

export const nestedEachUpper = `
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

{#each [1, 2, 3] as item}
	{#each [4, 5, 6] as item2}
		<div use:melt={$builder({ arg1: item, arg2: '' })} />
	{/each}
{/each}
`;

export const nestedEachUpperExpected = `
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

{#each [1, 2, 3] as item}
	{#each [4, 5, 6] as item2}
		{@const __MELTUI_BUILDER_0__ = $builder({ arg1: item, arg2: '' })}
		<div {...__MELTUI_BUILDER_0__} use:__MELTUI_BUILDER_0__.action />
	{/each}
{/each}
`;

export const nestedEachLower = `
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

{#each [1, 2, 3] as item}
	{#each [4, 5, 6] as item2}
		<div use:melt={$builder({ arg1: item2, arg2: '' })} />
	{/each}
{/each}
`;

export const nestedEachLowerExpected = `
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

{#each [1, 2, 3] as item}
	{#each [4, 5, 6] as item2}
		{@const __MELTUI_BUILDER_0__ = $builder({ arg1: item2, arg2: '' })}
		<div {...__MELTUI_BUILDER_0__} use:__MELTUI_BUILDER_0__.action />
	{/each}
{/each}
`;

export const nestedEachBoth = `
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

{#each [1, 2, 3] as item}
	{#each [4, 5, 6] as item2}
		<div use:melt={$builder({ arg1: item, arg2: item2 })} />
	{/each}
{/each}
`;

export const nestedEachBothExpected = `
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

{#each [1, 2, 3] as item}
	{#each [4, 5, 6] as item2}
		{@const __MELTUI_BUILDER_0__ = $builder({ arg1: item, arg2: item2 })}
		<div {...__MELTUI_BUILDER_0__} use:__MELTUI_BUILDER_0__.action />
	{/each}
{/each}
`;

export const thumbEach = `
<script>
	import { createSlider, melt } from '@melt-ui/svelte';

	const {
		elements: { root, range, thumb },
		states: { value },
	} = createSlider({
		defaultValue: [20, 80],
		max: 100,
	});
</script>

<span use:melt={$root} class="relative flex h-[20px] w-[200px] items-center">
	<span class="block h-[3px] w-full bg-black/40">
		<span use:melt={$range} class="h-[3px] bg-white" />
	</span>

	{#each $value as _}
		<span
			use:melt={$thumb()}
			class="block h-5 w-5 rounded-full bg-white focus:ring-4 focus:ring-black/40"
		/>
	{/each}
</span>
`;

export const thumbEachExpected = `
<script>
	import { createSlider, melt } from '@melt-ui/svelte';

	const {
		elements: { root, range, thumb },
		states: { value },
	} = createSlider({
		defaultValue: [20, 80],
		max: 100,
	});
</script>

<span {...$root} use:$root.action class="relative flex h-[20px] w-[200px] items-center">
	<span class="block h-[3px] w-full bg-black/40">
		<span {...$range} use:$range.action class="h-[3px] bg-white" />
	</span>

	{#each $value as _}
		{@const __MELTUI_BUILDER_0__ = $thumb()}
		<span
			{...__MELTUI_BUILDER_0__} use:__MELTUI_BUILDER_0__.action
			class="block h-5 w-5 rounded-full bg-white focus:ring-4 focus:ring-black/40"
		/>
	{/each}
</span>
`;
