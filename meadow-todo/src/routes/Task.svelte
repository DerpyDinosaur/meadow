<<<<<<< HEAD
<script lang="ts">
  import type { TaskType } from "@meadow/api";
  import Circle from '@lucide/svelte/icons/circle';
  import SquarePen from '@lucide/svelte/icons/square-pen';

  interface Props {
		task: Omit<TaskType, "userId">;
		onEdit: (value: typeof task) => void;
		onComplete: (value: typeof task) => void;
	}

	let { task, onEdit, onComplete }: Props = $props();
</script>

<div class="p-4 grid gap-x-4 gap-y-2 justify-center items-center grid-cols-[auto_1fr_auto] grid-rows-[auto_1fr] text-xl md:text-2xl neumorphic bg-element rounded-lg">
    <button class="size-10 flex items-center justify-center">
        <Circle class="w-8 h-8 {task.completed ? 'text-primary' : 'text-secondary'}" />
    </button>

    <h1 class="flex items-center h-full">{task.title}</h1>

    <button onclick={() => onEdit(task)} aria-label="edit" class="group flex items-center rounded-full neumorphic-inset neumorphic-hover border-border outline-ring/50 bg-element">
        <div class="m-1 size-8 flex items-center justify-center group-hover:text-secondary">
           	<SquarePen size={20} />
        </div>
    </button>

    <div class="w-full min-h-10 grid grid-cols-subgrid col-start-2 row-start-2 items-center">
	    <pre>{task.text}</pre>
	</div>
</div>
=======
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
	class="p-4 text-xl md:text-2xl grid grid-cols-[auto_1fr_auto] grid-rows-[1fr_auto] gap-y-2 neumorphic bg-element rounded-lg"
>
	<header class="grid grid-cols-subgrid col-span-3 gap-x-4 items-baseline">
        <button onclick={() => onComplete(task)} class="size-6" aria-label="complete">
            <div class="relative w-full h-full flex border-2 rounded-full {task.completed ? 'border-primary' : 'border-secondary'}">
                <div class:hidden={!task.completed} class="size-4 md:size-5 bg-primary rounded-full"></div>
            </div>
        </button>

        <h3 class="w-full h-full">{task.title}</h3>

	    <button onclick={() => onEdit(task)} class="group size-6 md:size-10 neumorphic-inset neumorphic-hover border-border outline-ring/50 bg-element rounded-full" aria-label="edit">
			<div class="flex items-center justify-center group-hover:text-secondary">
			    <SquarePen />
			</div>
		</button>
	</header>

	<div class="w-full min-h-10 grid grid-cols-subgrid col-start-2 items-center">
	    <pre>{task.text}</pre>
	</div>
</section>
>>>>>>> 066495d5b55a211052f17cb1b4e4505343b67dce
