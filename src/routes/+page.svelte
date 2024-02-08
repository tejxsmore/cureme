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
	let modal = false;
</script>

{#if loggedIn}
	<div class="bg-dark text-white p-4 flex justify-between items-center">
		<h3 class="font-semibold">Commune.</h3>
		<button on:click={logout} class="bg-red text-white w-6 h-6 rounded-full ">
			{data.account?.name.charAt(0)}
		</button>
	</div>
{:else}
	
	<div class="bg-dark text-white p-4 flex justify-between">
		<h3 class="font-semibold">Commune.</h3>
		<a href="/login" class="">Login</a>
		
	</div>
{/if}
