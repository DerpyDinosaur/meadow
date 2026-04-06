<script lang="ts">
    import type { Snippet } from "svelte";
    import { DropdownMenu, type WithoutChild } from "bits-ui";

    type Props = DropdownMenu.RootProps & {
      buttonText: string;
      items: string[];
      contentProps?: WithoutChild<DropdownMenu.ContentProps>;
      // other component props if needed
    };

    let {
      open = $bindable(false),
      children,
      buttonText,
      items,
      contentProps,
      ...restProps
    }: Props = $props();
</script>

<header>
    <DropdownMenu.Root bind:open {...restProps}>
      <DropdownMenu.Trigger>
        {buttonText}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content {...contentProps}>
          <DropdownMenu.Group aria-label={buttonText}>
            {#each items as item}
              <DropdownMenu.Item textValue={item}>
                {item}
              </DropdownMenu.Item>
            {/each}
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
</header>
