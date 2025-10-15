<script lang="ts">
	import Task from '$lib/Task.svelte';
	import { get } from './tasks.remote';
    import { fade } from 'svelte/transition';
</script>

<main class="px-8 py-4 grid grid-flow-row gap-10">
	{#each await get() as data}
		<Task {data} />
	{:else}
		<div class="mx-auto w-full h-full min-h-[66vh] flex justify-center items-center">
			<h1 transition:fade class="text-3xl">There are no tasks</h1>
		</div>
	{/each}
</main>

