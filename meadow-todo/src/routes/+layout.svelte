<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<!-- <header class="p-2 flex justify-between items-center text-emerald-950 bg-white">
	<div class="flex gap-2 justify-center items-center">
		<div class="w-8 h-8 flex justify-center items-center rounded-md">
			<span class="material-icons">grass</span> 
		</div>
		
		<h1>Todo</h1>
	</div>

	<nav>
		navigation
	</nav>
</header> -->

<nav class="lg:fixed lg:w-20 lg:h-screen">
	<ul class="lg:h-full lg:flex lg:flex-col lg:items-center">
		<li class="lg:w-full">
			<span class="lg:text-[100px] material-icons">home</span>
		</li>

		<li class="lg:w-full">
			<span class="material-icons">add_box</span>
		</li>

		<li class="lg:w-full">
			<span class="material-icons">calendar_month</span>
		</li>

		<li class="lg:mt-auto lg:w-full">
			<!-- <span class="material-icons">light_mode</span> -->
			<span class="material-icons">dark_mode</span>
		</li>
	</ul>
</nav>

<main class="lg:p-4 lg:ml-20">
	<h1>This is some HTML BULL</h1>
	<div class="m-4 w-20 h-20 bg-red-500"></div>
	<div class="m-4 w-20 h-20 bg-red-500"></div>
	<div class="m-4 w-20 h-20 bg-red-500"></div>
	<div class="m-4 w-20 h-20 bg-red-500"></div>
	<div class="m-4 w-20 h-20 bg-red-500"></div>
	<!-- {@render children()} -->
</main>
