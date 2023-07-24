export const simple = `
<script>
	import { writable } from 'svelte/store';

	const builder = writable({
		role: 'Mock',
		action: () => {},
	});
</script>

<div melt={$builder} />
`;

export const simpleExpected = `
<script>
	import { writable } from 'svelte/store';

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

<div melt={alias} />
<div melt={expressionAlias} />
`;

export const aliasedExpected = `
<script>
	import { writable } from 'svelte/store';

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
	import Comp from "./Comp.svelte";

	const builder = writable({
		role: 'Mock',
		action: () => {},
	});
</script>

<div melt={$builder} />

<Comp melt={$builder} />
<Comp melt={builder} />

<Comp melt={$builder}>
	<div melt={$builder} />
</Comp>
`;

export const ignoreCompsExpected = `
<script>
	import { writable } from 'svelte/store';
	import Comp from "./Comp.svelte";

	const builder = writable({
		role: 'Mock',
		action: () => {},
	});
</script>

<div {...$builder} use:$builder.action />

<Comp melt={$builder} />
<Comp melt={builder} />

<Comp melt={$builder}>
	<div {...$builder} use:$builder.action />
</Comp>
`;

export const meltAlias = `
<script>
	import { writable } from 'svelte/store';
	import Comp from "./Comp.svelte";

	const builder = writable({
		role: 'Mock',
		action: () => {},
	});

	$: melt = $builder;
</script>

<div {melt} />

<Comp {melt} />

<Comp {melt}>
	<div {melt} />
</Comp>
`;

export const meltAliasExpected = `
<script>
	import { writable } from 'svelte/store';
	import Comp from "./Comp.svelte";

	const builder = writable({
		role: 'Mock',
		action: () => {},
	});

	$: melt = $builder;
</script>

<div {...melt} use:melt.action />

<Comp {melt} />

<Comp {melt}>
	<div {...melt} use:melt.action />
</Comp>
`;
