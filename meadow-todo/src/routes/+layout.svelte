<script lang="ts">
	import '../app.css';
    import { pushState } from '$app/navigation';
    import { page } from '$app/state';
    import { NotebookPen, Sun, Plus } from '@lucide/svelte';
    import { create } from './tasks.remote';
    import Modal from '$lib/Modal.svelte';

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

	<div class="flex gap-8">
		<div class="group">
			<button 
				onclick={() => pushState('', {modal: true})} 
				class="p-3 inline-flex justify-center items-center rounded-full neumorphic neumorphic-hover border-border outline-ring/50 bg-element group-hover:text-secondary"
			>
				<Plus size="20" class="rotate-0"/>
			</button>
		</div>

		<div class="group">
			<button class="p-3 inline-flex justify-center items-center rounded-full neumorphic neumorphic-hover border-border outline-ring/50 bg-element group-hover:text-secondary">
				<Sun size="20" class="rotate-0"/>
				<!-- <Moon size="20" class="rotate-0"/> -->
			</button>
		</div>
	</div>
</header>

{#if page.state.modal}
	<Modal title="Add Task" {create}/>
{/if}

<svelte:boundary>
	{#snippet pending()}
		Loading...
	{/snippet}

	{#snippet failed(error, reset)}
		<button onclick={reset}>oops! try again</button>
		<p>Error: {error}</p>
	{/snippet}

	{@render children?.()}
</svelte:boundary>

