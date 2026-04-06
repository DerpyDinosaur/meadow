<script lang="ts">
	import './layout.css';
	import logo from '../../../../brand/meadow-logo.svg';

	const { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={logo} />
  <title>Meadow UI</title>
</svelte:head>

<header class="p-10 flex justify-center items-center">
  <div class="flex gap-2 justify-center items-center">
    <img alt="Meadow logo" src={logo} class="size-10"/>
    <h1 class="text-4xl font-bold uppercase">Meadow UI</h1>
  </div>
  <div></div>
</header>

<main class="mt-10 flex flex-col justify-center items-center">
  {@render children()}
</main>
