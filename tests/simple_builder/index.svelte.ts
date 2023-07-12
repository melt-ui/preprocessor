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

<div {...{...$builder, action: undefined}} use:$builder.action />
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

<div {...{...alias, action: undefined}} use:alias.action />
<div {...{...expressionAlias, action: undefined}} use:expressionAlias.action />
`;
