<script lang="ts">
	import Task from '$lib/Task.svelte';
	import * as Tasks from './tasks.remote';
</script>

<main class="px-8 py-4 grid grid-flow-row gap-10">
	{#each await Tasks.get() as task}
		<Task
			{task}
			get={Tasks.get} 
			patch={Tasks.patch} 
		/>
	{:else}
		<h1>No Tasks</h1>
	{/each}
</main>

