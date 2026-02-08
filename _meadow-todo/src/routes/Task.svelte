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
