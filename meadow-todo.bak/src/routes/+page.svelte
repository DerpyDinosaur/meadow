<script lang="ts">
	import Task from '$lib/Task.svelte'
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let inputName = $state("")
	let inputDesc = $state("")

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

<section class="w-full grid gap-y-4 grid-rows-[auto_1fr]">
	<header>
		<h2 class="text-2xl">All Tasks</h2>
	</header>

	<div class="w-full grid gap-4 grid-rows-auto text-white md:m-auto md:w-3/4">
		<form class="w-full grid gap-4 grid-rows-[1fr_auto] items-center">
			<div class="mx-auto w-full xl:w-3/4 flex gap-2 flex-col">
				<label class="text-highlight font-bold">Title:</label>
				<input bind:value={inputName} class="px-4 py-2 bg-bg/50 rounded" type="text" name="name" placeholder="Title" />

				<label class="text-highlight font-bold">Description:</label>
				<input bind:value={inputDesc} class="px-4 py-2 bg-bg/50 rounded" type="text" name="desc" placeholder="Description" />
			</div>

			<button type="submit" class="mx-auto w-full xl:w-3/4 h-10 px-4 py-2 bg-bg rounded">Add Task</button>
		</form>

		<div class="w-full h-1 bg-highlight rounded-full"></div>

		{#if data.tasks}
			{#each data.tasks as task, i}
				<Task {...task}></Task>
			{/each}
		{/if}
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