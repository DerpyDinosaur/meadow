<script lang="ts">
	import './layout.css';
	import favicon from '../../../../brand/meadow-logo.svg';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<header>

</header>

{@render children()}
