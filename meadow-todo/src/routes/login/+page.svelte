<script lang="ts">
    import { goto } from '$app/navigation';
	import { authClient } from '$lib/auth-client'

	let email = $state("adam.brickhill@lonetree.xyz");
	let password = $state("password123");
	let name = $state("Adam Brickhill");

	async function signup(e){
		e.preventDefault();
		const { data, error } = await authClient.signUp.email({
			email,
			password,
			callbackURL: "/",
			name
		},{
	        onRequest: (ctx) => {
	            //show loading
	            console.log(ctx)
	        },
	        onSuccess: (ctx) => {
	            //redirect to the dashboard or sign in page
	            console.log(ctx)
	            goto("/")
	        },
	        onError: (ctx) => {
	            // display the error message
	            alert(ctx.error.message);
	        },
		})
	}

	async function login(e){
		e.preventDefault();
		const { data, error } = await authClient.signIn.email({
			email,
			password,
			callbackURL: "/",
			rememberMe: true
		})
	}
</script>

<h1>Sign Up</h1>
<form onsubmit={signup}>
	<label for="email">Email</label>
	<input class="border-2" id="email" type="text" bind:value={email} />

	<label for="password">Password</label>
	<input class="border-2" id="password" type="text" bind:value={password} />
	<button type="submit">Submit</button>
</form>

<h1 class="mt-10">Login</h1>
<form onsubmit={login}>
	<label for="email">Email</label>
	<input class="border-2" id="email" type="text" bind:value={email} />

	<label for="password">Password</label>
	<input class="border-2" id="password" type="text" bind:value={password} />
	<button type="submit">Submit</button>
</form>