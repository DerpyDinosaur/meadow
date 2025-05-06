<script lang="ts">
    import type { SidebarProps } from './types.js';

    const { header, children, footer }: SidebarProps = $props();
</script>

<aside class="hidden h-screen sm:flex flex-col text-font-color border-r border-current/20 bg-bg">
    {@render header?.()}
    
    {@render children?.()}

    {@render footer?.()}
</aside>