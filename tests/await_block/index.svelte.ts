export const basicAwait = `
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

{#await promise}
	<div />
{:then item}
	<div use:melt={$builder({ arg1: item, arg2: '' })} />
{:catch error}
	<div use:melt={$builder({ arg1: error, arg2: '' })} />
{/await}
`;

export const basicAwaitExpected = `
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

{#await promise}
	<div />
{:then item}{@const __MELTUI_BUILDER_0__ = $builder({ arg1: item, arg2: '' })}
	<div {...__MELTUI_BUILDER_0__} use:__MELTUI_BUILDER_0__.action />
{:catch error}{@const __MELTUI_BUILDER_1__ = $builder({ arg1: error, arg2: '' })}
	<div {...__MELTUI_BUILDER_1__} use:__MELTUI_BUILDER_1__.action />
{/await}
`;

export const basicShorthandAwait = `
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

{#await promise then item}
	<div use:melt={$builder({ arg1: item, arg2: '' })} />
{:catch error}
	<div use:melt={$builder({ arg1: error, arg2: '' })} />
{/await}
`;

export const basicShorthandAwaitExpected = `
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

{#await promise then item}{@const __MELTUI_BUILDER_0__ = $builder({ arg1: item, arg2: '' })}
	<div {...__MELTUI_BUILDER_0__} use:__MELTUI_BUILDER_0__.action />
{:catch error}{@const __MELTUI_BUILDER_1__ = $builder({ arg1: error, arg2: '' })}
	<div {...__MELTUI_BUILDER_1__} use:__MELTUI_BUILDER_1__.action />
{/await}
`;

export const controlAwait = `
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

{#await promise}
	<div />
{:then item}
	<div use:melt={$builder({ arg1: 1, arg2: '' })} />
{:catch error}
	<div use:melt={$builder({ arg1: 1, arg2: '' })} />
{/await}
`;

export const controlAwaitExpected = `
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
</script>

{#await promise}
	<div />
{:then item}
	<div {...__MELTUI_BUILDER_0__} use:__MELTUI_BUILDER_0__.action />
{:catch error}
	<div {...__MELTUI_BUILDER_1__} use:__MELTUI_BUILDER_1__.action />
{/await}
`;

export const basicIdentifierAwait = `
<script>
	import { writable } from 'svelte/store';
	import { melt } from '@melt-ui/svelte';

	const builder = writable({
		role: 'Mock',
		action: () => {},
	});
</script>

{#await promise}
	<div />
{:then item}
	<div use:melt={$builder} />
{:catch error}
	<div use:melt={$builder} />
{/await}
`;

export const basicIdentifierAwaitExpected = `
<script>
	import { writable } from 'svelte/store';
	import { melt } from '@melt-ui/svelte';

	const builder = writable({
		role: 'Mock',
		action: () => {},
	});
</script>

{#await promise}
	<div />
{:then item}
	<div {...$builder} use:$builder.action />
{:catch error}
	<div {...$builder} use:$builder.action />
{/await}
`;

export const duplicateIdentifierAwait = `
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

{#await promise}
	<div />
{:then item}
	<div use:melt={$builder({ arg1: item, arg2: item })} />
{:catch error}
	<div use:melt={$builder({ arg1: error, arg2: error })} />
{/await}
`;

export const duplicateIdentifierAwaitExpected = `
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

{#await promise}
	<div />
{:then item}{@const __MELTUI_BUILDER_0__ = $builder({ arg1: item, arg2: item })}
	<div {...__MELTUI_BUILDER_0__} use:__MELTUI_BUILDER_0__.action />
{:catch error}{@const __MELTUI_BUILDER_1__ = $builder({ arg1: error, arg2: error })}
	<div {...__MELTUI_BUILDER_1__} use:__MELTUI_BUILDER_1__.action />
{/await}
`;

export const destructuredAwait = `
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

{#await promise}
	<div />
{:then {item1, item2}}
	<div use:melt={$builder({ arg1: item1, arg2: item2 })} />
{:catch {error1, error2}}
	<div use:melt={$builder({ arg1: error1, arg2: error2 })} />
{/await}
`;

export const destructuredAwaitExpected = `
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

{#await promise}
	<div />
{:then {item1, item2}}{@const __MELTUI_BUILDER_0__ = $builder({ arg1: item1, arg2: item2 })}
	<div {...__MELTUI_BUILDER_0__} use:__MELTUI_BUILDER_0__.action />
{:catch {error1, error2}}{@const __MELTUI_BUILDER_1__ = $builder({ arg1: error1, arg2: error2 })}
	<div {...__MELTUI_BUILDER_1__} use:__MELTUI_BUILDER_1__.action />
{/await}
`;

export const scopedAwait = `
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

{#await promise then item}
	<div use:melt={$builder({ arg1: item, arg2: '' })} />
	{#await promise then item}
		<div use:melt={$builder({ arg1: item, arg2: '' })} />
	{:catch error}
		<div use:melt={$builder({ arg1: error, arg2: '' })} />
	{/await}
{:catch error}
	<div use:melt={$builder({ arg1: error, arg2: '' })} />
	{#await promise2 then item}
		<div use:melt={$builder({ arg1: item, arg2: '' })} />
	{:catch error}
		<div use:melt={$builder({ arg1: error, arg2: '' })} />
	{/await}
{/await}
`;

export const scopedAwaitExpected = `
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

{#await promise then item}{@const __MELTUI_BUILDER_2__ = $builder({ arg1: item, arg2: '' })}
	<div {...__MELTUI_BUILDER_2__} use:__MELTUI_BUILDER_2__.action />
	{#await promise then item}{@const __MELTUI_BUILDER_0__ = $builder({ arg1: item, arg2: '' })}
		<div {...__MELTUI_BUILDER_0__} use:__MELTUI_BUILDER_0__.action />
	{:catch error}{@const __MELTUI_BUILDER_1__ = $builder({ arg1: error, arg2: '' })}
		<div {...__MELTUI_BUILDER_1__} use:__MELTUI_BUILDER_1__.action />
	{/await}
{:catch error}{@const __MELTUI_BUILDER_5__ = $builder({ arg1: error, arg2: '' })}
	<div {...__MELTUI_BUILDER_5__} use:__MELTUI_BUILDER_5__.action />
	{#await promise2 then item}{@const __MELTUI_BUILDER_3__ = $builder({ arg1: item, arg2: '' })}
		<div {...__MELTUI_BUILDER_3__} use:__MELTUI_BUILDER_3__.action />
	{:catch error}{@const __MELTUI_BUILDER_4__ = $builder({ arg1: error, arg2: '' })}
		<div {...__MELTUI_BUILDER_4__} use:__MELTUI_BUILDER_4__.action />
	{/await}
{/await}
`;

export const nestedAwaitUpper = `
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

{#await promise then item}
	{#await promise then item2}
		<div use:melt={$builder({ arg1: item, arg2: '' })} />
	{:catch error}
		<div use:melt={$builder({ arg1: item, arg2: '' })} />
	{/await}
{:catch error1}
	{#await promise then item}
		<div use:melt={$builder({ arg1: error1, arg2: '' })} />
	{:catch error2}
		<div use:melt={$builder({ arg1: error1, arg2: '' })} />
	{/await}
{/await}
`;

export const nestedAwaitUpperExpected = `
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

{#await promise then item}{@const __MELTUI_BUILDER_1__ = $builder({ arg1: item, arg2: '' })}{@const __MELTUI_BUILDER_0__ = $builder({ arg1: item, arg2: '' })}
	{#await promise then item2}
		<div {...__MELTUI_BUILDER_0__} use:__MELTUI_BUILDER_0__.action />
	{:catch error}
		<div {...__MELTUI_BUILDER_1__} use:__MELTUI_BUILDER_1__.action />
	{/await}
{:catch error1}{@const __MELTUI_BUILDER_3__ = $builder({ arg1: error1, arg2: '' })}{@const __MELTUI_BUILDER_2__ = $builder({ arg1: error1, arg2: '' })}
	{#await promise then item}
		<div {...__MELTUI_BUILDER_2__} use:__MELTUI_BUILDER_2__.action />
	{:catch error2}
		<div {...__MELTUI_BUILDER_3__} use:__MELTUI_BUILDER_3__.action />
	{/await}
{/await}
`;

export const nestedAwaitLower = `
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

{#await promise then item}
	{#await promise then item2}
		<div use:melt={$builder({ arg1: item2, arg2: '' })} />
	{/await}
{/await}
`;

export const nestedAwaitLowerExpected = `
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

{#await promise then item}
	{#await promise then item2}{@const __MELTUI_BUILDER_0__ = $builder({ arg1: item2, arg2: '' })}
		<div {...__MELTUI_BUILDER_0__} use:__MELTUI_BUILDER_0__.action />
	{/await}
{/await}
`;

export const nestedAwaitBoth = `
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

{#await promise then item}
	{#await promise then item2}
		<div use:melt={$builder({ arg1: item1, arg2: item2 })} />
	{/await}
{/await}
`;

export const nestedAwaitBothExpected = `
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

{#await promise then item}
	{#await promise then item2}{@const __MELTUI_BUILDER_0__ = $builder({ arg1: item1, arg2: item2 })}
		<div {...__MELTUI_BUILDER_0__} use:__MELTUI_BUILDER_0__.action />
	{/await}
{/await}
`;
