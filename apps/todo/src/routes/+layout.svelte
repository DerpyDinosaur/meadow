<script lang="ts">
	import './layout.css';
	import favicon from '../../../../brand/meadow-logo.svg';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<header class="p-3 flex items-center border-b-3 border-black">
  <div class="inline-flex items-center gap-3 text-xl">
    <img src={favicon} alt="logo" class="size-[1.5em]" />
    <h1 class="text-primary">Meadow Todo</h1>
  </div>
</header>

<div class="[--element-gap:2.5rem] mt-(--element-gap) px-3 grid grid-cols-1 gap-y-(--element-gap)">
  {@render children()}
</div>
