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
    <div class="text-white p-8 flex justify-between items-center">
        <h3 class="text-lg font-semibold text-red flex">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-9">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
        </h3>
        <button id="avatar" class="bg-red text-white w-8 h-8 rounded-full ">
            {data.account?.name.charAt(0)}
        </button>
        <Dropdown
            class="text-center text-white p-2 w-[150px] space-y-2 rounded-lg"
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
        <Home />
    </div>
{:else}
	<div class="text-white p-8 flex justify-between">
		<a href="/" class="text-lg font-semibold text-red hover:opacity-75">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-9">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
        </a>
		<a href="/login" class="px-4 py-2 bg-red hover:opacity-75 rounded-lg text-md font-medium">Login</a>
	</div>
    <Home />

{/if}