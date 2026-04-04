<script lang="ts">
	import './layout.css';
	import logo from '../../../../brand/meadow-logo.svg';

	const { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={logo} />
  <title>Meadow UI</title>
</svelte:head>

<header class="p-3 flex justify-between">
  <div class="flex gap-2 justify-center items-center">
    <img alt="Meadow logo" src={logo} class="size-6"/>
    <h1 class="text-2xl font-bold">Meadow UI</h1>
  </div>
  <div></div>
</header>

<main class="mt-10 flex flex-col justify-center items-center">
  {@render children()}
</main>
