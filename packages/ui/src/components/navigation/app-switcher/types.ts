import type { Icon as IconType } from '@lucide/svelte';

type Application = "Todo" | "Banking"

export interface Props {
  application: Application;
  css?: string;
}

export type IconMap = Record<Application, typeof IconType>
