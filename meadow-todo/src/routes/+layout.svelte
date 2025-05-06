<script lang="ts">
	import { Sidebar } from '@meadow/ui/navigation';
	import { NotebookPen, Layers, Infinity, Hourglass, Calendar } from '@lucide/svelte';
	import type { DataSection } from '@meadow/ui/types';
	import type { LayoutProps } from './$types';
	import { page } from '$app/state';
	// CSS
	import '../app.css';
	let { children }: LayoutProps = $props();

	const data: DataSection[] = [
		{
			title: "",
			children: [
				{
					name: "All",
					href: "/",
					icon: Infinity
				},
				{
					name: "Today",
					href: "/",
					icon: Hourglass
				},
				{
					name: "Calendar",
					href: "/calendar",
					icon: Calendar
				}
			]
		},
		{
			title: "Categories",
			children: [
				{
					name: "Personal",
					href: "/?cat=personal"
				},
				{
					name: "Work",
					href: "/?cat=work"
				}
			]
		},
		{
			title: "Tags",
			children: [
				{
					name: "Me",
					href: "/"
				}
			]
		}
	]
</script>

<svelte:head>
	<title>Meadow - Todo</title>
</svelte:head>

<Sidebar>
	{#snippet header()}
        <header class="p-2 flex items-center gap-x-8 border-b border-current/20">
        	<div class="flex items-start gap-x-3 text-xl">
        		<span class="flex h-[1lh] items-center text-highlight">
        			<NotebookPen/>
        		</span>
        		<h1>Meadow Todo</h1>
        	</div>

			<div class="p-2 flex items-center opacity-50 rounded-lg hover:opacity-100 hover:bg-black/10 cursor-not-allowed">
				<Layers/>	
			</div>
        </header>
	{/snippet}

	<nav class="mt-4 px-4 flex flex-col grow-1 gap-y-4 text-md">
		{#each data as { title, children }}
			<div>
                {#if title}
                    <h2 class="pb-2 font-sans text-sm opacity-50">{title}</h2>
                {/if}

                <div class="grid grid-cols-[auto_1fr]">
                    {#each children as child}
                    	<Sidebar.item {...child}/>
                    {/each}
                </div>
			</div>
		{/each}
	</nav>

	{#snippet footer()}
	    <footer class="p-4 flex gap-x-2 border-t border-current/20">
	        <p>Account</p>
	    </footer>
	{/snippet}
</Sidebar>

<section class="p-4 overflow-y-scroll">
	<header class="mb-4">
		<div>
			{JSON.stringify(page)}
		</div>
	</header>
	{@render children()}
</section>
