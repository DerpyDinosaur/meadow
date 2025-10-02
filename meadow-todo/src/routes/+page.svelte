<script lang="ts">
	import Task from '$lib/Task.svelte';
	import { get } from './tasks.remote';
</script>

<main class="px-8 py-4 grid grid-flow-row gap-10">
	{#each await get() as data}
		<Task {data} />
	{:else}
		<h1>No Tasks</h1>
	{/each}
</main>

