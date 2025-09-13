<script lang="ts">
    import { pushState } from '$app/navigation';
    import { page } from '$app/state';
	import '../app.css';
	import { NotebookPen, Sun, Plus, X } from '@lucide/svelte';
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
	<div 
		class="absolute w-screen h-screen flex justify-center items-center bg-background/50 backdrop-blur-sm" 
	>
		<div class="w-1/2 h-auto bg-element">
			<header>
				<h1 class="text-2xl">Add Task</h1>

				<div class="group">
					<button onclick={() => history.back()} class="p-3 inline-flex justify-center items-center rounded-full neumorphic neumorphic-hover border-border outline-ring/50 bg-element group-hover:text-secondary">
						<X size="20" class="rotate-0"/>
					</button>
				</div>
			</header>
			

		</div>
	</div>
	<!-- <Modal close={() => history.back()} /> -->
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

