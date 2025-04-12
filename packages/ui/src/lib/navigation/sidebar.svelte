<script lang="ts" generics="T">
	import type { Snippet } from 'svelte';

	let {
		data,
		logo,
		row
	}: {
		data: T[];
		logo?: Snippet;
		row: Snippet<[T]>;
	} = $props();
</script>

<nav class="px-10 py-2 fixed bottom-0 w-screen grid gap-4 grid-cols-3 bg-red-500">
	{#if logo}
		<div class="hidden">
			{@render logo()}
		</div>
	{/if}
	
	{#each data as item}
		{@render row(item)}
	{/each}
</nav>