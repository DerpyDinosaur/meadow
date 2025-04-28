<script lang="ts">
	import { Flag, Circle } from '@lucide/svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	let tasks = $derived(data.tasks || []);
</script>

<div class="flex flex-col gap-4">
	{#each tasks as {title, description, priority, duedate}}
		<section class="p-4 grid grid-cols-[auto_1fr] grid-rows-2 rounded-lg text-font-color bg-bg">
			<div class="flex items-center">
				<Circle/>
			</div>
			<div class="flex flex-col">
				<header>
					<h2 class="text-2xl">{title}</h2>
				</header>
				<div class="text-lg">
					<p>{description}</p>
				</div>
				<footer class="flex text-md">
					{#if priority}
						<div class={[
							priority===1 ? 'text-red-500' :
							priority===2 ? 'text-orange-500' :
							priority===3 ? 'text-yellow-500' : '', 'flex gap-2 items-center']}>
							<Flag class="w-6 h-6"/>
							Priority {priority}
						</div>
					{/if}
					
					{duedate}
				</footer>
			</div>
		</section>
<!-- 		<section class="p-4 flex flex-col gap-y-2 rounded-lg text-font-color bg-bg">
			<header>
				<h2 class="text-2xl">{title}</h2>
			</header>
			<div class="text-lg">
				<p>{description}</p>
			</div>
			<footer class="flex text-md">
				{#if priority}
					<div class={[
						priority===1 ? 'text-red-500' :
						priority===2 ? 'text-orange-500' :
						priority===3 ? 'text-yellow-500' : '', 'flex gap-2 items-center']}>
						<Flag class="w-6 h-6"/>
						Priority {priority}
					</div>
				{/if}
				
				{duedate}
			</footer>
		</section> -->
	{/each}
</div>


<!-- <nav class="flex gap-2 justify-start items-center">
	<p class="px-2 rounded-full bg-white">All</p>
	<p class="px-2 rounded-full bg-white">Adam</p>
	<p class="px-2 rounded-full bg-white">Angelia</p>
</nav>

<section class="grid gap-4 grid-cols-flow">
	<div class="rounded-lg bg-stone-200 backdrop-blur-lg">
		<header class="px-2 py-1 flex justify-between items-center">
			<h1>Task 1</h1>
			<div class="flex justify-center items-center"><span class="rotate-90 material-icons">chevron_right</span></div>
		</header>
		<div class="px-2 py-1 rounded-b-lg bg-stone-300 backdrop-blur-lg">
			hello world
		</div>
	</div>

	<div class="rounded-lg bg-stone-200">
		<header class="px-2 py-1 flex justify-between items-center">
			<h1>Task 1</h1>
			<div class="flex justify-center items-center"><span class="rotate-90 material-icons">chevron_right</span></div>
		</header>
		<div class="px-2 py-1 rounded-b-lg bg-stone-300">
			hello world
		</div>
	</div>
</section> -->