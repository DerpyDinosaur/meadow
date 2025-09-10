<script lang="ts">
	import Task from '$lib/Task.svelte';
    import type { PageProps } from './$types';
	import * as Tasks from './tasks.remote';

	let { data }: PageProps = $props();
	let tasks = await Tasks.get();
	let editing = $state(false);
</script>

<main class="px-8 py-4 grid grid-flow-row gap-10">
<!-- 	{#each await Tasks.get() as {id, text}}
		<Task 
			{id}
			{text}
			patch={Tasks.patch} 
		/>
		< -- <p class="p-4 text-2xl neumorphic bg-element rounded-lg">{text}</p> -- >
	{:else}
		<h1>No Tasks</h1>
	{/each} -->

	{#each tasks as {id, text, completed}}
		{#if editing}
		  <form 
		  	{...Tasks.patch}
		  	class="p-4 text-2xl neumorphic bg-element rounded-lg" 
		  >
		    <input name="id" type="number" value={id} hidden/>
		    <input name="text" type="text" value={text}/>
		    <input name="completed" type="checkbox" checked={completed}/>
		    <!-- <input bind:value onblur={submit} {required} use:focus/> -->
		    <button type="submit" hidden aria-label="submit"></button>
		  </form>
		{:else}
		  <div class="p-4 text-2xl neumorphic bg-element rounded-lg" onclick={() => editing=true}>
		    <h2>{text}</h2>
		    <h2>{completed}</h2>
		  </div>
		{/if}
	{:else}
		<h1>No Tasks</h1>
	{/each}
</main>

