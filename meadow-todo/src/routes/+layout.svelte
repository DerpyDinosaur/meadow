<script lang="ts">
	import '../app.css';
	import { authClient } from "$lib/auth-client";
    import { goto, invalidateAll, pushState } from '$app/navigation';
    import { page } from '$app/state';
    import { NotebookPen, Sun, Plus, LogOut } from '@lucide/svelte';
    import { create } from './tasks.remote';
    import Modal from './Modal.svelte';
    import { fade } from 'svelte/transition';

	let { data, children } = $props();
</script>

<svelte:head>
	<title>Meadow - Todo</title>
</svelte:head>

<header class="px-8 py-4 sticky top-0 w-screen h-20 flex justify-between items-center border-b border-secondary/20 bg-background/80 backdrop-blur-sm z-50">
	<div class="flex items-start gap-x-3 text-xl">
		<span class="flex h-[1lh] items-center">
			<NotebookPen/>
		</span>
		<h1>Meadow Todo</h1>
	</div>

	<div class="flex gap-8">
		{#if data.user}
			<div transition:fade={{duration: 200}} class="group">
				<button
					onclick={() => pushState('', {modal_create: true, modal_edit: false})}
					class="p-3 inline-flex justify-center items-center rounded-full neumorphic neumorphic-hover border-border outline-ring/50 bg-element group-hover:text-secondary"
				>
					<Plus size="20" class="rotate-0"/>
				</button>
			</div>

			<div transition:fade={{duration: 200}} class="group">
				<button
					onclick={() => authClient.signOut({
						fetchOptions:{
							onSuccess: () => {
								invalidateAll()
								goto("/login")
							}
						}
					})}
					class="p-3 inline-flex justify-center items-center rounded-full neumorphic neumorphic-hover border-border outline-ring/50 bg-element group-hover:text-secondary"
				>
					<LogOut size="20" class="rotate-0"/>
				</button>
			</div>
		{/if}

		<div class="group">
			<button class="p-3 inline-flex justify-center items-center rounded-full neumorphic neumorphic-hover border-border outline-ring/50 bg-element group-hover:text-secondary">
				<Sun size="20" class="rotate-0"/>
				<!-- <Moon size="20" class="rotate-0"/> -->
			</button>
		</div>
	</div>
</header>

{#if page.state.modal_create}
	<Modal title="Add Task" REMOTE={create}/>
{/if}

<svelte:boundary>
	{#snippet pending()}
		<div></div>
	{/snippet}

	{#snippet failed(error, reset)}
		<button onclick={reset}>oops! try again</button>
		<p>Error: {error}</p>
	{/snippet}

	{@render children?.()}
</svelte:boundary>
