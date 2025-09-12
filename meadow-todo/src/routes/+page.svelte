<script lang="ts">
	import Task from '$lib/Task.svelte';
    import type { PageProps } from './$types';
	import * as Tasks from './tasks.remote';

	let { data }: PageProps = $props();
	// let tasks = await Tasks.get();
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

	{#each await Tasks.get() as {id, text, completed}}
		{#if editing}
		  	<!-- {...Tasks.patch.enhance(async ({data, submit}) => {
		  		const id = data.get('id') as string;
		  		const text = data.get('text') as string;
		  		const completed = data.get('completed') === 'on' ? true : false;
		  		editing = false;
		  		await submit().updates(
		  			Tasks.get().withOverride(tasks => 
		  				tasks.map(v => (String(v.id) === id ? {...v, text, completed} : v))
		  			)
		  		)
		  	})} -->
		  	<!-- {...Tasks.patch.enhance(async ({submit}) => {
		  		editing = false;
		  		await submit()
		  	})} -->
		  <form 
		  	{...Tasks.patch.enhance(async ({data, submit}) => {
		  		const id = data.get('id') as string;
		  		const text = data.get('text') as string;
		  		const completed = data.get('completed') === 'on' ? true : false;
		  		editing = false;
		  		await submit().updates(
		  			Tasks.get().withOverride(tasks => 
		  				tasks.map(v => (String(v.id) === id ? {...v, text, completed} : v))
		  			)
		  		)
		  	})}
		  	class="p-4 text-2xl neumorphic bg-element rounded-lg" 
		  >
		    <input name="id" type="number" value={id} hidden/>
		    <input name="text" type="text" value={text}/>
		    <input name="completed" type="checkbox" checked={completed}/>
		    <!-- <input bind:value onblur={submit} {required} use:focus/> -->
		    <button type="submit" hidden aria-label="submit"></button>
		  </form>
		{:else}
		  <div class="p-4 text-2xl neumorphic bg-element rounded-lg">
		  	<header class="flex justify-between items-baseline">
		  		<h2>{text}</h2>
		  		<div>
		  			<button onclick={() => editing=true}>Edit</button>
		  			<div>{completed}</div>
		  		</div>
		  	</header>
		  </div>
		{/if}
	{:else}
		<h1>No Tasks</h1>
	{/each}
</main>

