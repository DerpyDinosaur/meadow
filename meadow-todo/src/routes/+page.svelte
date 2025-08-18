<script lang="ts">
	import { getTasks } from './tasks.remote';
</script>

<main class="px-8 py-4 grid grid-flow-row gap-10">
	{#each await getTasks() as task}
		<p class="p-4 text-2xl neumorphic bg-element rounded-lg">{task}</p>
	{/each}
</main>

