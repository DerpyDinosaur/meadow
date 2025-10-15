<script lang="ts">
  import type { TaskType } from "@meadow/api";
  import * as Task from "../routes/tasks.remote";
  import { Check, SquarePen } from "@lucide/svelte";
  import { fade } from "svelte/transition";

  interface Props {
    data: TaskType;
  }

  let { data }: Props = $props();

  let form = $state<HTMLFormElement | null>(null);
  let task = $state<TaskType>(data);
  let temp_task = $state<Partial<TaskType>>({
    id: data.id,
    title: null,
    text: null,
    completed: false
  });
  let editing = $state<boolean>(false);

  function handle_done_click(event: MouseEvent) {
    event.preventDefault();
    if (form) {
      editing = false;
      task = {...task, ...temp_task}
      // form.requestSubmit();
    }
  }
</script>

{editing}
<section
  onfocusin={() => (editing = true)}
  onfocusout={() => (editing = false)}
  class="p-4 text-2xl grid grid-cols-[auto_1fr_auto] grid-rows-[1fr_auto] neumorphic bg-element rounded-lg"
>
  <header class="grid grid-cols-subgrid col-span-3 space-x-4">
    <div class="flex items-center">
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

    <div>
      {#if editing}
        <div class="group">
          <button
            onclick={handle_done_click}
            class="p-3 inline-flex justify-center items-center rounded-full neumorphic neumorphic-hover border-border outline-ring/50 bg-element group-hover:text-secondary"
          >
            <Check />
          </button>
        </div>
      {:else}
        <div class="group">
          <button
            class="p-3 inline-flex justify-center items-center rounded-full neumorphic-inset neumorphic-hover border-border outline-ring/50 bg-element group-hover:text-secondary"
          >
            <SquarePen />
          </button>
        </div>
      {/if}
    </div>
  </header>

  <div
    contenteditable
    bind:textContent={task.text}
    class="grid grid-cols-subgrid col-start-2 whitespace-pre-wrap"
  >
    {data.text}
  </div>
</section>

<form
  {...Task.patch.enhance(async ({ form, submit }) => {
    await submit();
    form.reset();
  })}
  bind:this={form}
>
  <input name="id" type="number" bind:value={task.id} hidden />
  <input name="title" type="text" bind:value={task.title} />
  <textarea name="text" bind:value={task.text}></textarea>
  <input name="completed" type="checkbox" bind:checked={task.completed} />
</form>
