<script lang="ts">
  import { onMount } from 'svelte'
  import { browser } from '$app/environment'

  let { children } = $props()

  onMount(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
    }
  })
</script>

<svelte:head>
  <link rel="manifest" href="/manifest.json">
  <meta name="theme-color" content="#007bff">
  <link rel="apple-touch-icon" href="/icon-192.png">
</svelte:head>

{@render children()}
