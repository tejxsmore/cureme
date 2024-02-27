<script>
    import { invalidateAll } from '$app/navigation';
	import { appwrite } from "$lib/appwrite"
    import { Dropdown, DropdownItem} from 'flowbite-svelte';
    import Home from '../components/Home.svelte';

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
    <div class="bg-dark text-light p-6 flex justify-between items-center">
        <a href="/" class="text-lg font-semibold text-light hover:opacity-85">
            PIN
        </a>
        <button id="avatar" class="bg-blue text-dark w-8 h-8 rounded-full ">
            {data.account?.name.charAt(0)}
        </button>
        <Dropdown
            class="bg-white text-center text-dark p-2 z-50 w-[150px] space-y-2 rounded-lg"
            frameClass="rounded-sm"
            placement="bottom"
            triggeredBy="#avatar"
        >
            <DropdownItem class="font-semibold" href="/profile" >
                Profile
            </DropdownItem>
            <hr>
            <DropdownItem class="font-semibold" on:click={logout}>
                Signout
            </DropdownItem>
        </Dropdown> 
    </div>
    <Home />
{:else}
	<div class="bg-dark text-light p-6 flex justify-between">
		<a href="/" class="text-lg font-semibold text-light hover:opacity-85">
            PIN
        </a>
		<a href="/login" class="px-5 py-1.5 bg-blue text-dark hover:opacity-85 text-md font-medium rounded-sm">Login</a>
	</div>
    <Home />

{/if}