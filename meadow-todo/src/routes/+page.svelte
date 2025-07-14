<script lang="ts">
	import { Flag, Circle } from '@lucide/svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	let tasks = $derived(data.tasks || []);

	// Vars
	// let tasks: Task[] = $state([])
	// let filter: 'all'|'active'|'done' = $state('all');
	// let filteredTasks = $derived.by(() => {
	// 	return tasks
	// })

	// function add_task(event: KeyboardEvent){
	// 	if(event.key !== 'Enter') return

	// 	const element = event.target as HTMLInputElement;
	// 	tasks = [...tasks, {id: crypto.randomUUID(), text: element.value, done: false}];
	// 	element.value = '';
	// }
</script>

<section>
	<header>
		<h2>All Tasks</h2>
	</header>

	<div class="grid gap-4 grid-rows-auto">
		{#each tasks as task, i}
			<div class="grid grid-cols-[auto_1fr_1fr] grid-rows-2 bg-bg">
				<div class="grid grid-rows-subgrid row-span-2">
					<Circle/>
				</div>
			</div>
		{/each}
	</div>
</section>

<!-- <div class="flex flex-col gap-4">
	{#each tasks as {title, description, priority, created}}
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
					
					{created}
				</footer>
			</div>
		</section>
	{/each}
</div> -->