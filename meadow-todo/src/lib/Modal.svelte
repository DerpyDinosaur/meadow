<script lang="ts">
	import { fade } from 'svelte/transition';
	import { X } from '@lucide/svelte';
    import type { RemoteForm } from '@sveltejs/kit';

	interface Props {
		title: string
		create: RemoteForm<any, void>
	}

	let { title, create }: Props = $props();
</script>

<div
	transition:fade={{duration: 200}}
	class="fixed w-screen h-screen flex justify-center items-center bg-background/50 backdrop-blur-sm" 
>
	<div class="p-8 static w-1/2 max-w-3/4 h-auto bg-element overflow-auto z-50 neumorphic rounded-lg">
		<header class="grid grid-cols-[1fr_auto] items-baseline">
			<h1 class="text-2xl">{title}</h1>

			<div class="group">
				<button onclick={() => history.back()} class="p-3 inline-flex justify-center items-center rounded-full neumorphic neumorphic-hover border-border outline-ring/50 bg-element group-hover:text-secondary">
					<X size="20" class="rotate-0"/>
				</button>
			</div>
		</header>

		<form {...create}>
			<input name="title" type="text" value="" placeholder="Title" />
			<input name="text" type="text" value="" placeholder="Description" />
		</form>
	</div>
	<button 
		onclick={() => history.back()}
		class="absolute top-0 left-0 w-full h-full z-40"
		aria-label="close"
	></button>
</div>