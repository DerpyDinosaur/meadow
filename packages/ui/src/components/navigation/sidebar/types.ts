import type { Snippet } from "svelte";
import type { ClassValue } from "svelte/elements";

export type DataItem = {
	name: string;
	href: string;
	icon?: any;
}

export type DataSection = {
	title?: string;
	children: DataItem[];
} 

interface Props {
	children: Snippet
}

export interface SidebarProps extends Props {
	data: DataSection[];
	header: Snippet;
	row: Snippet;
	footer: Snippet;
}