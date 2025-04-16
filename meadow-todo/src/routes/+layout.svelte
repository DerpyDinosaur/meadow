<script lang="ts">
	import { Sidebar } from '@meadow/ui';
	import { NotebookPen, House, SquarePlus } from '@lucide/svelte';
	import type { LayoutProps } from './$types';
	// CSS
	import '../app.css';
	let { children }: LayoutProps = $props();

	const menu = [
		{
			name: "Home",
			href: "/",
			icon: House
		},
		{
			name: "Add",
			href: "/create",
			icon: SquarePlus
		}
	]
</script>

<Sidebar data={menu} css="fixed bottom-0 w-screen h-auto bg-red-500 lg:static lg:w-auto lg:h-screen">
	{#snippet logo()}
		<div class="flex items-start gap-x-3">
			<span class="flex h-[1lh] items-center">
				<NotebookPen/>
			</span>
			Meadow Todo
		</div>
	{/snippet}

	{#snippet row({ name, href, icon })}
		{@const Icon = icon}
		<a href={href} class="mx-4 px-4 py-2 flex items-start gap-x-3 rounded">
			<span class="flex h-[1lh] items-center">
				<Icon/>
			</span>
			{name}
		</a>
	{/snippet}
</Sidebar>

<main class="lg:p-4 lg:ml-20">
	<h1>This is some HTML BULL</h1>
	<div class="m-4 w-20 h-20 bg-red-500"></div>
	<div class="m-4 w-20 h-20 bg-red-500"></div>
	<div class="m-4 w-20 h-20 bg-red-500"></div>
	<div class="m-4 w-20 h-20 bg-red-500"></div>
	<div class="m-4 w-20 h-20 bg-red-500"></div>
	<!-- {@render children()} -->
</main>
