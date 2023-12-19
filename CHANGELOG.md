# @melt-ui/pp

## 0.2.0

### Minor Changes

- 978fd50: feat: Added a built-in sequential preprocessor

### Patch Changes

- 978fd50: fix: Fixed source maps

## 0.1.4

### Patch Changes

- 9bbd746: fix: Corrected `module` and `types` entry points

## 0.1.3

### Patch Changes

- e73cc40: chore: Use `estree-walker` instead of Svelte's `walk`
- eb41557: chore: Added Svelte 5 as a supported peer dependency

## 0.1.2

### Patch Changes

- 3c4b53a: chore: Simplified internal logic for injecting `{@const}` tags

## 0.1.1

### Patch Changes

- 8acd92f: fix: Clarify the use of the `alias` config option

## 0.1.0

### Minor Changes

- 0b6b380: refactor: Replaces all instances of `use:melt` instead of `melt`

### Patch Changes

- 6646560: fix: `{@const}` tags are now injected into the direct parent block of a qualified action node.

## 0.1.0-next.1

### Patch Changes

- 6646560: fix: `{@const}` tags are now injected into the direct parent block of a qualified action node.

## 0.1.0-next.0

### Minor Changes

- 0b6b380: refactor: Replaces all instances of `use:melt` instead of `melt`

## 0.0.7

### Patch Changes

- b2dea2c: fix: Handle the shorthand notation for the `melt` attribute (ex: `<div {melt} />`)

## 0.0.6

### Patch Changes

- e7111f6: Fixed peer dependency for `@melt-ui/svelte`

## 0.0.5

### Patch Changes

- e71d27d: simplifies the transformed output

## 0.0.4

### Patch Changes

- f15c55c: fix: Don't process `melt` props for Svelte Components

## 0.0.3

### Patch Changes

- 249f0ea: added `@melt-ui/svelte` as a peer dependency

## 0.0.2

### Patch Changes

- c774d7f: finds and replaces a `melt` attribute instead of a `use:melt` action

## 0.0.1

### Patch Changes

- fcf712d: initial release
