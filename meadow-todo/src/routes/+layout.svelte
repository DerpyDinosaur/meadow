<script lang="ts">
	import type { LayoutProps } from './$types'
	// Icons
	import '@fortawesome/fontawesome-free/js/all.js'
	// CSS
	import '../app.css';
	let { children }: LayoutProps = $props();
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

<nav class="fixed bottom-0 w-screen h-20 lg:w-20 lg:h-screen bg-white">
	<ul class="lg:h-full lg:flex lg:flex-col lg:items-center">
		<li class="lg:w-full">
			<a class="lg:h-20 lg:flex lg:items-center">
				<i class="fa-solid fa-house fa-2xl"></i>
				<span class="lg:ml-4 lg:hidden">Home</span>
			</a>
		</li>

		<li class="lg:w-full">
			<a class="lg:h-20 lg:flex lg:items-center">
				<i class="fa-solid fa-square-plus fa-2xl"></i>
				<span class="lg:ml-4 lg:hidden">Add</span>
			</a>
		</li>

		<li class="lg:w-full">
			<a class="lg:h-20 lg:flex lg:items-center">
				<i class="fa-solid fa-calendar-days fa-2xl"></i>
				<span class="lg:ml-4 lg:hidden">Calendar</span>
			</a>
		</li>

		<li class="lg:mt-auto lg:w-full">
			<a class="lg:h-20 lg:flex lg:items-center">
				<!-- <i class="fa-solid fa-sun fa-2xl"></i> -->
				<i class="fa-solid fa-moon fa-2xl"></i>
				<span class="lg:ml-4 lg:hidden">Theme</span>
			</a>
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
