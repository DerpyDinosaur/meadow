<script lang="ts">
  import TodoIcon from '@lucide/svelte/icons/notebook-pen'
  import BankIcon from '@lucide/svelte/icons/landmark'
  import type { Props, IconMap } from './types.js';
  let { application, css }: Props = $props();

  const icons: IconMap = {
    Todo: TodoIcon,
    Banking: BankIcon
  }
</script>

{#snippet icon(apptype: string)}
	{@const Icon = icons[application]}
	<Icon></Icon>
{/snippet}

<nav class="grid grid-cols-2 {css}">
  <div class="flex">
    {@render icon(application)}
    <h1>Meadow {application}</h1>
  </div>
</nav>
