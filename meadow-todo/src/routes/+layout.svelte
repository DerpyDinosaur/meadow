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

	const breadcrumb = [{}]
</script>

<Sidebar {data}>
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

	{#snippet footer()}
		<h1>Account</h1>
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
