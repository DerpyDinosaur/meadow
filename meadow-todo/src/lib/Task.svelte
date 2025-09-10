<script lang="ts">
  import type { RemoteForm } from "@sveltejs/kit";

  interface Props {
    text: string;
    patch: RemoteForm<unknown>;
  }

  let { text, patch }: Props = $props();
  let editing = $state<boolean>(false);
</script>

{#if editing}
  <form class="p-4 text-2xl neumorphic bg-element rounded-lg" {...patch}>
    <input
      name="title"
      type="text"
      bind:value={text}
    />
    <!-- <input bind:value onblur={submit} {required} use:focus/> -->
    <button class="hidden" type="submit"/>
  </form>
{:else}
  <div class="p-4 text-2xl neumorphic bg-element rounded-lg" onclick={() => editing=true}>
    <h2>{text}</h2>
  </div>
{/if}