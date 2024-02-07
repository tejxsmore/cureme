<!-- src/routes/+page.svelte -->
<script>
	import { invalidateAll } from '$app/navigation';
	import { appwrite } from '$lib/appwrite.js';

	export let data;

	$: loggedIn = !!data.account;

	async function logout() {
		await appwrite.account.deleteSession('current');
		// invalidateAll will execute all `load` functions again.
		// In our case, this means we'll fetch the account data again.
		await invalidateAll();
	}
</script>

{#if loggedIn}
	<div class="bg-dark text-white p-4 flex justify-between">
		<!-- <p>Hello {data.account?.name}!</p> -->
		<h3 class="font-semibold">Commune.</h3>
		<button on:click={logout}>Logout</button>
	</div>
{:else}
	
	<div class="bg-dark text-white p-4 flex justify-between">
		<!-- <p>Hello {data.account?.name}!</p> -->
		<h3 class="font-semibold">Commune.</h3>
		<div>
			<a href="/login" class="pr-4">Login</a>
			<a href="/signup">Signup</a>
		</div>
	</div>
{/if}
