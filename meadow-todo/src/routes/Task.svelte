<script lang="ts">
    import type { TaskType } from "@meadow/api";
	import { SquarePen } from "@lucide/svelte";

    interface Props {
		task: Omit<TaskType, "userId">;
		onEdit: (value: typeof task) => void;
		onComplete: (value: typeof task) => void;
	}

	let { task, onEdit, onComplete }: Props = $props();
</script>

<section
	class="p-4 text-2xl grid grid-cols-[auto_1fr_auto] grid-rows-[1fr_auto] gap-y-2 neumorphic bg-element rounded-lg"
>
	<header class="grid grid-cols-subgrid col-span-3 space-x-4 items-center">
        <button onclick={() => onComplete(task)} aria-label="complete" class="flex items-center">
            <div class="relative m-1 w-5 h-5 ring-2 rounded-full {task.completed ? 'ring-primary text-primary' : 'ring-secondary'}">
                <div class:hidden={!task.completed} class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full"></div>
            </div>
        </button>

		<h2>{task.title}</h2>

		<div>
			<div class="group">
				<button
					onclick={() => onEdit(task)}
					class="p-3 inline-flex justify-center items-center rounded-full neumorphic-inset neumorphic-hover border-border outline-ring/50 bg-element group-hover:text-secondary"
				>
					<SquarePen />
				</button>
			</div>
		</div>
	</header>

	<div class="w-full min-h-10 grid grid-cols-subgrid col-start-2 items-center">
	    <pre>{task.text}</pre>
	</div>
</section>
