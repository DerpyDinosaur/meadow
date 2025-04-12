<script lang="ts">
	import Home from '@lucide/svelte/icons/home';
	import SquarePlus from '@lucide/svelte/icons/square-plus'
	import Calendar from '@lucide/svelte/icons/calendar-days'


    import Sidebar from '$lib/navigation/sidebar.svelte';
	import '../app.css';
	
	let { children } = $props();

	let menu = [
		{
			name: "Home",
			href: "/",
			icon: Home,
			size: 32
		},
		{
			name: "",
			href: "/",
			icon: SquarePlus,
			size: 42
		},
		{
			name: "Calendar",
			href: "/",
			icon: Calendar,
			size: 32
		}
	]
</script>

<div class="">
	<Sidebar data={menu}>
		{#snippet row({ name, href, icon, size })}
			{@const Icon = icon}
			<a href={href} class="flex flex-col justify-center items-center bg-red-700">
				<Icon size={size}/>
				{name}
			</a>
		{/snippet}
	</Sidebar>

	{@render children()}
</div>

