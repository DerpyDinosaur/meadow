<script lang="ts">
	import { authClient } from '$lib/auth-client'

	let email_input = $state("adam.brickhill@lonetree.xyz");
	let password_input = $state("password123");

	async function signup(e){
		e.preventDefault();

		const { data, error } = await authClient.signUp.email({
			email: email_input, // user email address
			password: password_input, // user password -> min 8 characters by default
			callbackURL: "/",
			name: ''
		},{
	        onRequest: (ctx) => {
	            //show loading
	            console.log(ctx)
	        },
	        onSuccess: (ctx) => {
	            //redirect to the dashboard or sign in page
	            console.log(ctx)
	        },
	        onError: (ctx) => {
	            // display the error message
	            alert(ctx.error.message);
	        },
		})
	}
</script>

<h1>Sign Up</h1>
<form onsubmit={signup}>
	<label for="email">Email</label>
	<input class="border-2" id="email" type="text" bind:value={email_input} />

	<label for="password">Password</label>
	<input class="border-2" id="password" type="text" bind:value={password_input} />
	<button type="submit">Submit</button>
</form>

<h1 class="mt-10">Login</h1>
<form>
	<label for="email">Email</label>
	<input class="border-2" id="email" type="text" />

	<label for="password">Password</label>
	<input class="border-2" id="password" type="text" />
	<button type="submit">Submit</button>
</form>