<script lang="ts">
  import type { RemoteForm, RemoteQueryFunction } from "@sveltejs/kit";
  import type { TaskType } from '@meadow/api';

  interface Props {
    task: TaskType
    get: RemoteQueryFunction<void, TaskType[]>;
    patch: RemoteForm<any, void>;
  }

  let { task, get, patch }: Props = $props();
  let editing = $state<boolean>(false);

  function handle_keypress(e): void {
    e.preventDefault();
    if (e.key === 'Enter'){
      taskForm.submit();
    }
  }
</script>

<section class="p-4 text-2xl neumorphic bg-element rounded-lg">
  <header class="flex gap-4">
    <div>
      <div class="w-5 h-5 ring-2 ring-secondary rounded-full"></div>
    </div>
    <h2 contenteditable="plaintext-only">{task.title}</h2>
  </header>
</section>

<form {...patch.enhance(async ({ form, submit }) => {
      await submit();
      form.reset();
  })}
  hidden
>
  <input name="id" type="number" value={task.id}/>
  <input name="text" type="text" value={task.title}/>
  <input name="completed" type="checkbox" checked={task.completed}/>
</form>
