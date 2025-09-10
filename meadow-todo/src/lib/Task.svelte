<script lang="ts">
  import type { RemoteForm } from "@sveltejs/kit";

  interface Props {
    id: number;
    text: string;
    patch: RemoteForm<unknown>;
  }

  let { id, text, patch }: Props = $props();
  let editing = $state<boolean>(false);
</script>

{#if editing}
  <form class="p-4 text-2xl neumorphic bg-element rounded-lg" {...patch}>
    <input hidden name="id" type="number" value={id} />
    <input
      name="title"
      type="text"
      value={text}
    />
    <!-- <input bind:value onblur={submit} {required} use:focus/> -->
    <button type="submit" hidden aria-label="submit"></button>
  </form>
{:else}
  <div class="p-4 text-2xl neumorphic bg-element rounded-lg" onclick={() => editing=true}>
    <h2>{text}</h2>
  </div>
{/if}