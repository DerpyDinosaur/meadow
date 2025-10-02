<script lang="ts">
  import type { TaskType } from '@meadow/api';
  import * as Task from '../routes/tasks.remote';

  interface Props {
    data: TaskType
  }

  let { data }: Props = $props();
  let task = $state<TaskType>(data);
  let editing = $state<boolean>(false);
</script>

{editing}
<section 
  onfocusin={() => editing = true} 
  onfocusout={() => editing = false} 
  class="p-4 text-2xl grid grid-cols-[auto_1fr] grid-rows-2 neumorphic bg-element rounded-lg"
>
  <header class="grid grid-cols-subgrid col-span-2">
  <!-- <header class="flex gap-4 items-center"> -->
    <div>
      <div class="m-1 w-5 h-5 ring-2 ring-secondary rounded-full"></div>
    </div>

    <h2 
      contenteditable 
      bind:textContent={task.title}
      class="outline-0"
      class:underline={editing}
    >
      {data.title}
    </h2>
  </header>

  <div class="grid grid-cols-subgrid col-start-2">
    This is a test description
  </div>
</section>

<form {...Task.patch.enhance(async ({ form, submit }) => {
      await submit();
      form.reset();
  })}
>
  <input name={Task.patch.field("id")} type="number" bind:value={task.id} hidden />
  <input name={Task.patch.field("title")} type="text" bind:value={task.title} />
  <input name={Task.patch.field("completed")} type="checkbox" bind:checked={task.completed} />
</form>
