import type { Component, Snippet } from "svelte";
import type { ClassValue } from "svelte/elements";

export type DataItem = {
	name: string;
	href: string;
	icon?: Component;
}

export type DataSection = {
	title?: string;
	children: DataItem[];
} 

interface Props {
	children: Snippet
}

export interface SidebarProps extends Props {
	style?: ClassValue;
	header?: Snippet;
	footer?: Snippet;
}