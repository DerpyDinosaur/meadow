<script lang="ts">
	import { fade } from 'svelte/transition';
	import { X } from '@lucide/svelte';
    import type { RemoteForm } from '@sveltejs/kit';
    import type { TaskType } from '@meadow/api';
    import { page } from "$app/state"

	interface Props {
		title: string;
		REMOTE: RemoteForm<any, void>;
		value?: Partial<TaskType>;
	}

	let { title, REMOTE, value }: Props = $props();
</script>

<div
	transition:fade={{duration: 200}}
	class="fixed w-screen h-screen bg-background/50 backdrop-blur-sm"
>
	<div class="h-full max-h-[66vh] flex justify-center items-center">
		<div class="p-8 static w-1/2 max-w-3/4 space-y-5 bg-element overflow-auto z-50 neumorphic rounded-lg">
			<header class="flex justify-between items-baseline">
				<h1 class="text-2xl">{title}</h1>

				<div class="group">
					<button onclick={() => history.back()} class="p-3 inline-flex justify-center items-center rounded-full neumorphic neumorphic-hover border-border outline-ring/50 bg-element group-hover:text-secondary">
						<X size="20" class="rotate-0"/>
					</button>
				</div>
			</header>

			{#if page.state.modal_create || !value?.id}
    			<form {...REMOTE} class="flex flex-col gap-y-4">
    				<input
    					name="title"
    					type="text"
    					value={value?.title || ""}
    					placeholder="Title"
    					class="px-4 py-2 neumorphic-inset rounded-2xl"
    				/>
    				<!-- <input
    					name="text"
    					type="text"
    					value={value?.text || ""}
    					placeholder="Description"
    					class="px-4 py-2 neumorphic-inset rounded-2xl"
    				/> -->
                    <textarea
                        name="text"
                        value={value?.text || ""}
                        class="px-4 py-2 min-h-50 neumorphic-inset rounded-2xl"
                    ></textarea>
    				<input name="completed" type="checkbox" checked={value?.completed} hidden />
    				<button type="submit" class="">Submit</button>
    			</form>
            {:else}
     			<form {...REMOTE.for(value.id).enhance(async ({ form, submit, data }) => {
                    console.log(data)
                    await submit();
                    form.reset();
                })} class="flex flex-col gap-y-4">
                    <input name="id" type="number" value={value?.id} hidden />

    				<input
       					name="title"
       					type="text"
       					value={value?.title || ""}
       					placeholder="Title"
       					class="px-4 py-2 neumorphic-inset rounded-2xl"
    				/>
                    <textarea
                        name="text"
                        value={value?.text || ""}
                        class="px-4 py-2 min-h-50 neumorphic-inset rounded-2xl"
                    ></textarea>
    				<input name="completed" type="checkbox" checked={value?.completed} hidden />

    				<button type="submit" class="">Submit</button>
     			</form>
            {/if}
		</div>
		<button
			onclick={() => history.back()}
			class="absolute top-0 left-0 w-full h-full z-40"
			aria-label="close"
		></button>
	</div>
</div>
