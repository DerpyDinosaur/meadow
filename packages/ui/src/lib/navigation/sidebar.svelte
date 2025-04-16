<script lang="ts" generics="T">
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';

	let {
		data,
		util,
		row,
		logo,
		identity,
		css
	}: {
		data: T[];
		row: Snippet<[T]>;
		util?: T[];
		logo?: Snippet;
		identity?: Snippet;
		css?: ClassValue;
	} = $props();
</script>

<aside class={[!css && "fixed w-screen lg:static lg:h-screen", css]}>
	<nav class="h-full flex flex-col border-r border-current/50 shadow-sm">
		{#if logo}
			<div class="border-b border-current/20 hidden lg:block">
				{@render logo()}
			</div>
		{/if}

		<ul class="mt-4 space-y-2 grow-1">
			{#each data as item}
				{@render row(item)}
			{/each}

			{#if util?.length}
				<hr class="my-3 opacity-50" />
				{#each util as item}
					{@render row(item)}
				{/each}
			{/if}
		</ul>

		{#if identity}
			<div class="border-t border-current/20 flex p-3">
				{@render identity()}
			</div>
		{/if}
	</nav>
</aside>