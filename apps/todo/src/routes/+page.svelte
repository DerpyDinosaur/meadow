<script lang="ts">
  import { getTodos } from '$lib/projects.remote.js';

  let { data } = $props();

  function greeting(): string {
    const hour = new Date().getHours();

    if (hour >= 6 && hour < 12) return 'Morning';
    if (hour >= 12 && hour < 18) return 'Afternoon';
    if (hour >= 18 && hour < 24) return 'Evening';
    return 'Go back to sleep';
  }
</script>

<section class="">
  <h2 class="text-2xl text-primary">{greeting()}, {data.user.name}.</h2>
  <p class="text-muted">What is on the agenda today?</p>
</section>

<main class="w-full">
  <div class="p-3 flex flex-col gap-2 shadow-brutal bg-primary">
    <h3 class="text-md text-white/60">Task Progress</h3>

    <div class="flex flex-col gap-y-1">
      <h3 class="text-white text-4xl">100%</h3>
      <div class="p-1.5 w-full h-12 bg-black">
        <div class="w-full h-full bg-secondary"></div>
      </div>
    </div>
  </div>

  {#each await getTodos() as todo}
    {todo.title}
  {/each}
</main>
