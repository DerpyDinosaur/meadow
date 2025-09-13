<script lang="ts">
  import type { RemoteForm, RemoteQueryFunction } from "@sveltejs/kit";
  import type { TaskType } from '@meadow/api';

  interface Props {
    task: TaskType
    get: RemoteQueryFunction<void, TaskType[]>;
    patch: RemoteForm<void>;
  }

  let { task, get, patch }: Props = $props();
  let editing = $state<boolean>(false);
</script>

{#if editing}
  <form 
    {...patch.enhance(async ({data, submit}) => {
      const id = Number(data.get("id"));
      const text = data.get('text') as string;
      const completed = data.get('completed') === 'on' ? true : false;
      
      editing = false;
      await submit().updates(
        get().withOverride(tasks => 
          tasks.map(v => (v.id === id ? {...v, text, completed} : v))
        )
      )
    })}
    class="p-4 text-2xl neumorphic bg-element rounded-lg"
    onblur={(e) => e.currentTarget.submit()} 
  >
    <input name="id" type="number" value={task.id} hidden>
    <input name="text" type="text" value={task.text}/>
    <input name="completed" type="checkbox" checked={task.completed}/>
    <button type="submit" hidden aria-label="submit"></button>
  </form>
{:else}
  <button
    onclick={() => editing=true}
    class="p-4 text-2xl neumorphic bg-element rounded-lg"
  >
    <header class="flex justify-between items-baseline">
      <h2>{task.text}</h2>
      <div>
        <div>{task.completed}</div>
      </div>
    </header>
  </button>
{/if}