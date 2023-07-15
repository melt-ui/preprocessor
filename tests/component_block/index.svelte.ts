export const basicComponent = `
<script>
	import { writable } from 'svelte/store';

	const builder = writable(({ arg1, arg2 }) => {
		return {
			role: 'Mock',
			action: () => {},
		};
	});
</script>

<Component let:data={item}>
	<div melt={$builder({ arg1: item, arg2: '' })} />
</Component>
`;

export const basicComponentExpected = `
<script>
	import { writable } from 'svelte/store';

	const builder = writable(({ arg1, arg2 }) => {
		return {
			role: 'Mock',
			action: () => {},
		};
	});
</script>

<Component let:data={item}>{@const __MELTUI_BUILDER_0__ = $builder({ arg1: item, arg2: '' })}
	<div {...__MELTUI_BUILDER_0__} use:__MELTUI_BUILDER_0__.action />
</Component>
`;

export const basicShorthand = `
<script>
	import { writable } from 'svelte/store';

	const builder = writable(({ arg1, arg2 }) => {
		return {
			role: 'Mock',
			action: () => {},
		};
	});
</script>

<Component let:item>
	<div melt={$builder({ arg1: item, arg2: '' })} />
</Component>
`;

export const basicShorthandExpected = `
<script>
	import { writable } from 'svelte/store';

	const builder = writable(({ arg1, arg2 }) => {
		return {
			role: 'Mock',
			action: () => {},
		};
	});
</script>

<Component let:item>{@const __MELTUI_BUILDER_0__ = $builder({ arg1: item, arg2: '' })}
	<div {...__MELTUI_BUILDER_0__} use:__MELTUI_BUILDER_0__.action />
</Component>
`;

export const control = `
<script>
	import { writable } from 'svelte/store';

	const builder = writable(({ arg1, arg2 }) => {
		return {
			role: 'Mock',
			action: () => {},
		};
	});
</script>

<Component let:item>
	<div melt={$builder({ arg1: 1, arg2: '' })} />
</Component>
`;

export const controlExpected = `
<script>
	import { writable } from 'svelte/store';

	const builder = writable(({ arg1, arg2 }) => {
		return {
			role: 'Mock',
			action: () => {},
		};
	});

$: __MELTUI_BUILDER_0__ = $builder({ arg1: 1, arg2: '' });
</script>

<Component let:item>
	<div {...__MELTUI_BUILDER_0__} use:__MELTUI_BUILDER_0__.action />
</Component>
`;

export const basicIdentifier = `
<Component let:builder>
	<div melt={builder} />
</Component>
`;

export const basicIdentifierExpected = `
<Component let:builder>
	<div {...builder} use:builder.action />
</Component>
`;

export const duplicateIdentifier = `
<script>
	import { writable } from 'svelte/store';

	const builder = writable(({ arg1, arg2 }) => {
		return {
			role: 'Mock',
			action: () => {},
		};
	});
</script>

<Component let:item>
	<div melt={$builder({ arg1: item, arg2: item })} />
</Component>
`;

export const duplicateIdentifierExpected = `
<script>
	import { writable } from 'svelte/store';

	const builder = writable(({ arg1, arg2 }) => {
		return {
			role: 'Mock',
			action: () => {},
		};
	});
</script>

<Component let:item>{@const __MELTUI_BUILDER_0__ = $builder({ arg1: item, arg2: item })}
	<div {...__MELTUI_BUILDER_0__} use:__MELTUI_BUILDER_0__.action />
</Component>
`;

export const destructured = `
<script>
	import { writable } from 'svelte/store';

	const builder = writable(({ arg1, arg2 }) => {
		return {
			role: 'Mock',
			action: () => {},
		};
	});
</script>

<Component let:item={{item1, item2}}>
	<div melt={$builder({ arg1: item1, arg2: item2 })} />
</Component>
`;

export const destructuredExpected = `
<script>
	import { writable } from 'svelte/store';

	const builder = writable(({ arg1, arg2 }) => {
		return {
			role: 'Mock',
			action: () => {},
		};
	});
</script>

<Component let:item={{item1, item2}}>{@const __MELTUI_BUILDER_0__ = $builder({ arg1: item1, arg2: item2 })}
	<div {...__MELTUI_BUILDER_0__} use:__MELTUI_BUILDER_0__.action />
</Component>
`;

export const scoped = `
<script>
	import { writable } from 'svelte/store';

	const builder = writable(({ arg1, arg2 }) => {
		return {
			role: 'Mock',
			action: () => {},
		};
	});
</script>

<Component let:item>
	<Component let:item>
		<div melt={$builder({ arg1: item, arg2: '' })} />
	</Component>
</Component>
`;

export const scopedExpected = `
<script>
	import { writable } from 'svelte/store';

	const builder = writable(({ arg1, arg2 }) => {
		return {
			role: 'Mock',
			action: () => {},
		};
	});
</script>

<Component let:item>
	<Component let:item>{@const __MELTUI_BUILDER_0__ = $builder({ arg1: item, arg2: '' })}
		<div {...__MELTUI_BUILDER_0__} use:__MELTUI_BUILDER_0__.action />
	</Component>
</Component>
`;

export const nestedUpper = `
<script>
	import { writable } from 'svelte/store';

	const builder = writable(({ arg1, arg2 }) => {
		return {
			role: 'Mock',
			action: () => {},
		};
	});
</script>

<Component let:item1>
	<Component let:item2>
		<div melt={$builder({ arg1: item1, arg2: '' })} />
	</Component>
</Component>
`;

export const nestedUpperExpected = `
<script>
	import { writable } from 'svelte/store';

	const builder = writable(({ arg1, arg2 }) => {
		return {
			role: 'Mock',
			action: () => {},
		};
	});
</script>

<Component let:item1>{@const __MELTUI_BUILDER_0__ = $builder({ arg1: item1, arg2: '' })}
	<Component let:item2>
		<div {...__MELTUI_BUILDER_0__} use:__MELTUI_BUILDER_0__.action />
	</Component>
</Component>
`;

export const nestedLower = `
<script>
	import { writable } from 'svelte/store';

	const builder = writable(({ arg1, arg2 }) => {
		return {
			role: 'Mock',
			action: () => {},
		};
	});
</script>

<Component let:item1>
	<Component let:item2>
		<div melt={$builder({ arg1: item2, arg2: '' })} />
	</Component>
</Component>
`;

export const nestedLowerExpected = `
<script>
	import { writable } from 'svelte/store';

	const builder = writable(({ arg1, arg2 }) => {
		return {
			role: 'Mock',
			action: () => {},
		};
	});
</script>

<Component let:item1>
	<Component let:item2>{@const __MELTUI_BUILDER_0__ = $builder({ arg1: item2, arg2: '' })}
		<div {...__MELTUI_BUILDER_0__} use:__MELTUI_BUILDER_0__.action />
	</Component>
</Component>
`;

export const nestedBoth = `
<script>
	import { writable } from 'svelte/store';

	const builder = writable(({ arg1, arg2 }) => {
		return {
			role: 'Mock',
			action: () => {},
		};
	});
</script>

<Component let:item1>
	<Component let:item2>
		<div melt={$builder({ arg1: item1, arg2: item2 })} />
	</Component>
</Component>
`;

export const nestedBothExpected = `
<script>
	import { writable } from 'svelte/store';

	const builder = writable(({ arg1, arg2 }) => {
		return {
			role: 'Mock',
			action: () => {},
		};
	});
</script>

<Component let:item1>
	<Component let:item2>{@const __MELTUI_BUILDER_0__ = $builder({ arg1: item1, arg2: item2 })}
		<div {...__MELTUI_BUILDER_0__} use:__MELTUI_BUILDER_0__.action />
	</Component>
</Component>
`;

export const slotTemplate = `
<script>
	import { writable } from 'svelte/store';

	const builder = writable(({ arg1, arg2 }) => {
		return {
			role: 'Mock',
			action: () => {},
		};
	});
</script>

<Component let:item1>
	<svelte:fragment slot="name" let:item2>
		<div melt={$builder({ arg1: item1, arg2: item2 })} />
	</svelte:fragment>
</Component>
`;

export const slotTemplateExpected = `
<script>
	import { writable } from 'svelte/store';

	const builder = writable(({ arg1, arg2 }) => {
		return {
			role: 'Mock',
			action: () => {},
		};
	});
</script>

<Component let:item1>
	<svelte:fragment slot="name" let:item2>{@const __MELTUI_BUILDER_0__ = $builder({ arg1: item1, arg2: item2 })}
		<div {...__MELTUI_BUILDER_0__} use:__MELTUI_BUILDER_0__.action />
	</svelte:fragment>
</Component>
`;
