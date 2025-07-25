<script lang="ts">
	import { Flag, Circle } from '@lucide/svelte';

	let { 
		name,
		description,
	}: {
		name: string;
		description: string;
	} = $props();
</script>

<div class="p-4 w-full grid gap-x-4 grid-cols-[auto_1fr_auto] grid-rows-2 bg-bg rounded-md drop-shadow-lg">
	<Circle class="w-full h-full grid grid-rows-subgrid grid-rows-2 row-span-2 items-center text-highlight"/>

	<h1 class="font-bold text-xl">{name}</h1>

	<div class="flex gap-2 justify-end items-center">
		<p>edit</p>
		<p>delete</p>
	</div>

	<p class="col-span-2">{description}</p>
</div>