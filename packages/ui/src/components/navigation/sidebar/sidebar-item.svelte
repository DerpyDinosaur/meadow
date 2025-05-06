<script lang="ts">
    import type { DataItem } from './types.js';

	let { 
		href,
		icon,
		name
	}: DataItem = $props();
</script>

<a href={href} class="p-2 col-span-2 grid grid-cols-subgrid rounded-lg hover:bg-highlight/20 hover:text-highlight">
    {#if icon}
    	{@const Icon = icon}
        <span class="mr-3 h-[1lh] flex items-center">
            <Icon/>
        </span>
    {/if}
    <span class="col-start-2">{name}</span>
</a>