<script lang="ts">
	import '../app.css';
	import { NotebookPen, Sun, Moon } from '@lucide/svelte';
	let { children } = $props();
</script>

<svelte:head>
	<title>Meadow - Todo</title>
</svelte:head>

<header class="px-8 py-4 sticky top-0 w-screen flex justify-between items-center border-b border-secondary/20 bg-background/80 backdrop-blur-sm z-50">
	<div class="flex items-start gap-x-3 text-xl">
		<span class="flex h-[1lh] items-center">
			<NotebookPen/>
		</span>
		<h1>Meadow Todo</h1>
	</div>

	<div class="group">
		<button class="p-3 inline-flex justify-center items-center rounded-full neumorphic neumorphic-hover border-border outline-ring/50 bg-element group-hover:text-secondary">
			<Sun size="20" class="rotate-0"/>
			<!-- <Moon size="20" class="rotate-0"/> -->
		</button>
	</div>
</header>

<svelte:boundary>
	{@render children?.()}

	{#snippet pending()}
		Loading...
	{/snippet}
</svelte:boundary>

