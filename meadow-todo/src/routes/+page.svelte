<script lang="ts">
	// import { Flag, Circle } from '@lucide/svelte';
	// import type { PageProps } from './$types';

	// let { data }: PageProps = $props();
	// let tasks = $derived(data.tasks || []);
	
	// Types
	type Task = {
		id: string;
		text: string;
		done: boolean;
	}

	// Vars
	let tasks: Task[] = $state([])
	let filter: 'all'|'active'|'done' = $state('all');
	let filteredTasks = $derived.by(() => {
		return tasks
	})

	function add_task(event: KeyboardEvent){
		if(event.key !== 'Enter') return

		const element = event.target as HTMLInputElement;
		tasks = [...tasks, {id: crypto.randomUUID(), text: element.value, done: false}];
		element.value = '';
	}
</script>

<input onkeydown={add_task} placeholder="Add Task" type="text" />

<section>
	<header>
		<h2>All Tasks</h2>
	</header>

	{#each filteredTasks as task, i}
		<div class="flex flex-col">
			{i}
			{JSON.stringify(task)}
		</div>
	{/each}
</section>

<!-- <div class="flex flex-col gap-4">
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
	{/each}
</div> -->