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
<!-- 	<header class="grid grid-cols-subgrid col-span-3 space-x-4 items-center">
		<div class="flex items-center">
			<div class="m-1 w-5 h-5 ring-2 ring-secondary rounded-full"></div>
		</div>

		<h2>foo bar</h2>

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

	<div class="min-h-10 grid grid-cols-subgrid col-start-2 items-center">
		<input name="text" type="text" bind:value={formData.text} class="outline-none bg-green-500"/>
	</div>

	<div class="min-h-10 grid grid-cols-subgrid col-start-2 items-center">
		<p class="bg-green-500">{formData.text}</p>
	</div> -->
	{#if editing}
		<form
            {...patch.enhance(async ({ form, submit, data }) => {
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
				<div class="flex items-center">
					<div class="m-1 w-5 h-5 ring-2 ring-secondary rounded-full"></div>
				</div>

				<h2>
					<input
						name="title"
						type="text"
						bind:value={formData.title}
						class="p-0 outline-0"
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
				<p>
					<input name="text" type="text" bind:value={formData.text} class="outline-0 w-full"/>
				</p>
			</div>
		</form>
	{:else}
		<div class="contents">
			<header class="grid grid-cols-subgrid col-span-3 space-x-4 items-center">
				<div class="flex items-center">
					<div class="m-1 w-5 h-5 ring-2 ring-secondary rounded-full"></div>
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
