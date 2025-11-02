<script lang="ts">
	import Task from './Task.svelte';
	import Modal from './Modal.svelte';
	import { get, patch, complete } from './tasks.remote';
    import { fade } from 'svelte/transition';
    import { page } from '$app/state';
    import type { TaskType } from '@meadow/api';
    import { pushState } from '$app/navigation';

    let active_task = $state<Partial<TaskType>>({
        title: "",
        text: "",
        completed: false
    })

    function handle_edit_click(value: Omit<TaskType, 'userId'>) {
      active_task = value;
      pushState("", {modal_create: false, modal_edit: true})
    }

    async function handle_complete_click(value: Omit<TaskType, 'userId'>) {
      const form_value = {
        ...value,
        id: String(value.id),
        completed: `${value.completed}`
      }
      console.log(form_value)

      try {
        await complete(form_value);
      } catch(e) {
        console.error(e)
      }
    }
</script>

{#if page.state.modal_edit}
    <Modal title="Edit Task" REMOTE={patch} value={active_task}/>
{/if}

<main class="px-8 py-4 grid grid-flow-row gap-10">
	{#each await get() as task (task.id)}
		<Task
		    onEdit={(value) => handle_edit_click(value)}
			onComplete={(value) => handle_complete_click(value)}
			{task}
		/>
	{:else}
		<div class="mx-auto w-full h-full min-h-[66vh] flex justify-center items-center">
			<h1 transition:fade class="text-3xl">There are no tasks</h1>
		</div>
	{/each}
</main>
