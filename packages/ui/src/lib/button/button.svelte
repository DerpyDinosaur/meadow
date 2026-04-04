<script lang="ts">
  import { Button } from 'bits-ui';
  import type { Props } from './types.ts';

  let { children }: Props = $props();
</script>
<!-- after:content-[''] after:absolute after:w-full after:h-full after:bg-blue-500 after:top-1 after:left-1 after:z-10  -->
<Button.Root class="px-5.25 h-12 inline-flex items-center justify-center text-sm bg-primary whitespace-nowrap active:shadow-none active:translate-0.75 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 brutal">
  {@render children()}
</Button.Root>
