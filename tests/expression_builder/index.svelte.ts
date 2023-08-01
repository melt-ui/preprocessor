export const callExpression = `
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

export const callExpressionExpected = `
<script>
	import { writable } from 'svelte/store';
	import { melt } from '@melt-ui/svelte';

	const builder = writable(({ arg1, arg2 }) => {
		return {
			role: 'Mock',
			action: () => {},
		};
	});

$: __MELTUI_BUILDER_0__ = $builder({ arg1: 1, arg2: '' });
</script>

<div {...__MELTUI_BUILDER_0__} use:__MELTUI_BUILDER_0__.action />
`;

export const objExpression = `
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

<div use:melt={{ ...$builder({ arg1: 1, arg2: '' }) }} />
`;

export const objExpressionExpected = `
<script>
	import { writable } from 'svelte/store';
	import { melt } from '@melt-ui/svelte';

	const builder = writable(({ arg1, arg2 }) => {
		return {
			role: 'Mock',
			action: () => {},
		};
	});

$: __MELTUI_BUILDER_0__ = { ...$builder({ arg1: 1, arg2: '' }) };
</script>

<div {...__MELTUI_BUILDER_0__} use:__MELTUI_BUILDER_0__.action />
`;

export const multiExpressions = `
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
<div use:melt={$builder({ arg1: 1, arg2: '' })} />
<div use:melt={$builder({ arg1: 1, arg2: '' })} />
`;

export const multiExpressionsExpected = `
<script>
	import { writable } from 'svelte/store';
	import { melt } from '@melt-ui/svelte';

	const builder = writable(({ arg1, arg2 }) => {
		return {
			role: 'Mock',
			action: () => {},
		};
	});

$: __MELTUI_BUILDER_0__ = $builder({ arg1: 1, arg2: '' });
$: __MELTUI_BUILDER_1__ = $builder({ arg1: 1, arg2: '' });
$: __MELTUI_BUILDER_2__ = $builder({ arg1: 1, arg2: '' });
</script>

<div {...__MELTUI_BUILDER_0__} use:__MELTUI_BUILDER_0__.action />
<div {...__MELTUI_BUILDER_1__} use:__MELTUI_BUILDER_1__.action />
<div {...__MELTUI_BUILDER_2__} use:__MELTUI_BUILDER_2__.action />
`;
