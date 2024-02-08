<script>
    import { invalidateAll } from '$app/navigation';
	import { appwrite } from "$lib/appwrite"
    import { Dropdown, DropdownItem} from 'flowbite-svelte';

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
<div class="bg-dark text-white p-4 flex justify-between items-center">
    <h3 class="font-semibold">Commune.</h3>
    <button id="avatar" class="bg-red text-white w-6 h-6 rounded-full ">
        {data.account?.name.charAt(0)}
    </button>
    <Dropdown
        class="text-center text-black p-2 w-[150px] space-y-2 rounded-lg"
        frameClass="rounded-lg"
        placement="bottom"
        triggeredBy="#avatar"
    >
        <DropdownItem class="font-semibold" href="/profile" >
            Profile
        </DropdownItem>
        <hr>
        <DropdownItem class="text-red font-semibold" on:click={logout}>
            Signout
        </DropdownItem>
    </Dropdown> 
    </div>
{:else}
	
	<div class="bg-dark text-white p-4 flex justify-between">
		<h3 class="font-semibold">Dev Commune.</h3>
		<a href="/login" class="">Login</a>
	</div>
{/if}