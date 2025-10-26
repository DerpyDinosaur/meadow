<script lang="ts">
	import type { TaskType } from "@meadow/api";
	import { patch } from "../routes/tasks.remote";
	import { Check, SquarePen } from "@lucide/svelte";

	interface Props {
		task: Omit<TaskType,'userId'>;
	}

	let { task }: Props = $props();

	let editing = $state<boolean>(false);
	// let formData = $state<typeof task>(task);
	let formData = $state<Omit<TaskType, 'userId'>>(structuredClone(task));

	function handle_edit_click(event: MouseEvent) {
		event.preventDefault();
		editing = !editing;
	}
</script>

<section
	class="p-4 text-2xl grid grid-cols-[auto_1fr_auto] grid-rows-[1fr_auto] gap-y-2 neumorphic bg-element rounded-lg"
>
	{#if editing}
		<form
            {...patch.for(String(task.id)).enhance(async ({ form, submit, data }) => {
              await submit();
              editing = false;
            })}
			class="contents"
		>
			<input name="id" type="number" bind:value={formData.id} hidden />
			<input
				name="completed"
				type="checkbox"
				bind:checked={formData.completed}
				hidden
			/>

			<header class="grid grid-cols-subgrid col-span-3 space-x-4 items-center">
				<button
				    onclick={() => formData.completed = !formData.completed}
					type="button"
					aria-label="Toggle task completion"
					class="flex items-center"
				>
    				<div class="flex items-center">
                        <div class="relative m-1 w-5 h-5 ring-2 rounded-full {formData.completed ? 'ring-primary text-primary' : 'ring-secondary'}">
                            <div class:hidden={!formData.completed} class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full"></div>
                        </div>
    				</div>
				</button>

				<h2 contenteditable bind:innerText={formData.title} class="focus:outline-none">
					<input
						name="title"
						type="text"
						bind:value={formData.title}
						hidden
					/>
				</h2>

				<div>
					<div class="group">
						<button
							type="submit"
							class="p-3 inline-flex justify-center items-center rounded-full neumorphic neumorphic-hover border-border outline-ring/50 bg-element group-hover:text-secondary"
						>
							<Check />
						</button>
					</div>
				</div>
			</header>

			<div class="w-full min-h-10 grid grid-cols-subgrid col-start-2 items-center">
			    <textarea name="text"
				<!-- <p>
					<input name="text" type="text" bind:value={formData.text} class="outline-0 w-full"/>
				</p> -->
			</div>
		</form>
	{:else}
		<div class="contents">
			<header class="grid grid-cols-subgrid col-span-3 space-x-4 items-center">
                <div class="flex items-center">
                    <div class="relative m-1 w-5 h-5 ring-2 rounded-full {formData.completed ? 'ring-primary text-primary' : 'ring-secondary'}">
                        <div class:hidden={!formData.completed} class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full"></div>
                    </div>
                </div>

				<h2>{formData.title}</h2>

				<div>
					<div class="group">
						<button
							onclick={handle_edit_click}
							class="p-3 inline-flex justify-center items-center rounded-full neumorphic-inset neumorphic-hover border-border outline-ring/50 bg-element group-hover:text-secondary"
						>
							<SquarePen />
						</button>
					</div>
				</div>
			</header>

			<div class="w-full min-h-10 grid grid-cols-subgrid col-start-2 items-center">
				<p class="w-full">{formData.text}</p>
			</div>
		</div>
	{/if}
</section>
