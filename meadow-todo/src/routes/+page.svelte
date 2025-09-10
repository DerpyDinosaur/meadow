<script lang="ts">
	import Task from '$lib/Task.svelte';
	import * as Tasks from './tasks.remote';
</script>

<main class="px-8 py-4 grid grid-flow-row gap-10">
	{#each await Tasks.get() as {text}}
		<Task 
			{text}
			patch={Tasks.patch} 
		/>
		<!-- <p class="p-4 text-2xl neumorphic bg-element rounded-lg">{text}</p> -->
	{:else}
		<h1>No Tasks</h1>
	{/each}
</main>

