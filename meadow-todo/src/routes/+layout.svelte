<script lang="ts">
  import './layout.css';
  import { AppSwitcher } from '@meadow/ui';
  import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<header>
  <AppSwitcher application="Todo" />
</header>

{@render children()}
