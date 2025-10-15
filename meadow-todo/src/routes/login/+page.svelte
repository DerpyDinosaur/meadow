<script lang="ts">
    import { goto, invalidate, invalidateAll } from '$app/navigation';
	import { authClient } from '$lib/auth-client'

	let email = $state("adam.brickhill@lonetree.xyz");
	let password = $state("password123");
	let name = $state("Adam Brickhill");

	async function signup(e){
		e.preventDefault();
		const { data } = await authClient.signUp.email({
			email,
			password,
			callbackURL: "/",
			name
		},{
	        onSuccess: async () => {
	        	invalidateAll();
	        }
		});

		if(data){
			goto("/");
		}
	}

	async function login(e){
		e.preventDefault();
		await authClient.signIn.email({
			email,
			password,
			callbackURL: "/",
			rememberMe: true
		},{
			onSuccess: () => {
				goto("/")
			}
		})
	}
</script>

<main class="mx-auto h-full min-h-[66vh] flex justify-center items-center w-100">
	<div class="p-4 w-full h-1/2 flex flex-col gap-4 rounded-2xl">
		<header class="text-center">
			<h1 class="text-3xl">Login</h1>
		</header>
		<form 
			onsubmit={login}
			class="flex flex-col gap-4" 
		>
			<label for="email" class="text-xl">Email</label>
			<input 
				bind:value={email}
				id="email"
				type="email"
				class="px-4 py-2 neumorphic-inset rounded-2xl"
			/>

			<label for="password" class="text-xl">Password</label>
			<input class="px-4 py-2 neumorphic-inset rounded-2xl" id="password" type="text" bind:value={password} />
			<button type="submit" class="p-2 mt-4 neumorphic neumorphic-hover rounded-2xl bg-element cursor-pointer hover:text-accent">Submit</button>
		</form>
	</div>
</main>

<!-- <h1>Sign Up</h1>
<form onsubmit={signup}>
	<label for="email">Email</label>
	<input class="border-2" id="email" type="text" bind:value={email} />

	<label for="password">Password</label>
	<input class="border-2" id="password" type="text" bind:value={password} />
	<button type="submit">Submit</button>
</form> -->