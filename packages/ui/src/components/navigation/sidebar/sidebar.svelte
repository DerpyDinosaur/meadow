<script lang="ts">
    import type { SidebarProps } from './types.js';

    const { data, header, footer }: SidebarProps = $props();
</script>

<aside class="hidden h-screen sm:flex flex-col text-font-color border-r border-current/20 bg-bg">
    {@render header?.()}

    <nav class="mt-4 px-4 flex flex-col grow-1 gap-y-4 text-md">
        {#each data as { title, children }}
            <div>
                {#if title}
                    <h2 class="pb-2 font-sans text-sm opacity-50">{title}</h2>
                {/if}

                <div class="grid grid-cols-[auto_1fr]">
                    {#each children as {icon, name, href}}
                        <a href={href} class="p-2 col-span-2 grid grid-cols-subgrid rounded-lg hover:bg-highlight/20 hover:text-highlight">
                            {#if icon}
                                {@const Icon = icon}
                                <span class="mr-3 h-[1lh] flex items-center">
                                    <Icon/>
                                </span>
                            {/if}
                            <span class="col-start-2">{name}</span>
                        </a>
                    {/each}
                </div>
            </div>
        {/each}
    </nav>

    {#if footer}
        <footer class="p-4 flex gap-x-2 border-t border-current/20">
            {@render footer()}
        </footer>
    {/if}
</aside>