<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<header class="p-2 flex justify-between items-center bg-green-500">
	<div class="flex gap-2 justify-center items-center text-green-500">
		<div class="w-8 h-8 flex justify-center items-center rounded-md bg-green-800">
			<span class="material-icons">grass</span> 
		</div>
		
		<h1>Todo</h1>
	</div>

	<nav>
		navigation
	</nav>
</header>

{@render children()}
