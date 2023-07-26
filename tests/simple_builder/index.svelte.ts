export const simple = `
<script>
	import { writable } from 'svelte/store';
	import { melt } from '@melt-ui/svelte';

	const builder = writable({
		role: 'Mock',
		action: () => {},
	});
</script>

<div use:melt={$builder} />
`;

export const simpleExpected = `
<script>
	import { writable } from 'svelte/store';
	import { melt } from '@melt-ui/svelte';

	const builder = writable({
		role: 'Mock',
		action: () => {},
	});
</script>

<div {...$builder} use:$builder.action />
`;

export const aliased = `
<script>
	import { writable } from 'svelte/store';
	import { melt } from '@melt-ui/svelte';

	const builder = writable({
		role: 'Mock',
		action: () => {},
	});

	const expressionBuilder = writable(({ arg1, arg2 }) => {
		return {
			role: 'Mock',
			action: () => {},
		};
	});

	const alias = $builder;
	const expressionAlias = $expressionBuilder({ arg1: 1, arg2: '' });
</script>

<div use:melt={alias} />
<div use:melt={expressionAlias} />
`;

export const aliasedExpected = `
<script>
	import { writable } from 'svelte/store';
	import { melt } from '@melt-ui/svelte';

	const builder = writable({
		role: 'Mock',
		action: () => {},
	});

	const expressionBuilder = writable(({ arg1, arg2 }) => {
		return {
			role: 'Mock',
			action: () => {},
		};
	});

	const alias = $builder;
	const expressionAlias = $expressionBuilder({ arg1: 1, arg2: '' });
</script>

<div {...alias} use:alias.action />
<div {...expressionAlias} use:expressionAlias.action />
`;

export const ignoreComps = `
<script>
	import { writable } from 'svelte/store';
	import { melt } from '@melt-ui/svelte';
	import Comp from "./Comp.svelte";

	const builder = writable({
		role: 'Mock',
		action: () => {},
	});
</script>

<div use:melt={$builder} />

<Comp use:melt={$builder} />
<Comp use:melt={builder} />

<Comp use:melt={$builder}>
	<div use:melt={$builder} />
</Comp>
`;

export const ignoreCompsExpected = `
<script>
	import { writable } from 'svelte/store';
	import { melt } from '@melt-ui/svelte';
	import Comp from "./Comp.svelte";

	const builder = writable({
		role: 'Mock',
		action: () => {},
	});
</script>

<div {...$builder} use:$builder.action />

<Comp use:melt={$builder} />
<Comp use:melt={builder} />

<Comp use:melt={$builder}>
	<div {...$builder} use:$builder.action />
</Comp>
`;
