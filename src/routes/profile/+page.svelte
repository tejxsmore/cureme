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
<div class="flex flex-col">
    <div class="bg-light text-dark p-5 flex justify-between items-center">
        <div class="flex items-center space-x-5 bg-light text-dark">
            <a href="/">
                <img src="/logo.png" alt="logo" class="w-7 h-7">
            </a>
            <a href="/ambulance">
                <img src="/ambulance.png" alt="Ambulance" class="w-12 h-12">
            </a>
        </div>
        <button id="avatar" class="bg-red text-white w-8 h-8 font-semibold rounded-full ">
            {data.account?.name.charAt(0)}
        </button>
            <Dropdown
            class="bg-white text-center text-dark z-50 w-[100px] space-y-2 rounded-lg "
            frameClass="rounded-md"
            placement="bottom"
            triggeredBy="#avatar"
        >
            <DropdownItem href="/profile" >
                Profile
            </DropdownItem>
            <hr class=" text-gray">
            <DropdownItem on:click={logout}>
                Signout
            </DropdownItem>
        </Dropdown>
    </div>
    <div class="p-4 bg-light text-dark min-h-screen">
        <p>Name : {data.account?.name}</p>
    </div>
</div>
{:else}
<div class="bg-light text-dark p-5 flex justify-between items-center">
    <div class="flex items-center space-x-5 bg-light text-dark">
        <a href="/">
            <img src="/logo.png" alt="logo" class="w-7 h-7">
        </a>
        <a href="/ambulance">
            <img src="/ambulance.png" alt="Ambulance" class="w-12 h-12">
        </a>
    </div>
    <a href="/signin" class="px-5 py-1.5 bg-red text-white text-md font-medium rounded-md">Signin</a>
</div>
<div class="bg-light text-dark p-5 min-h-screen">
    <p>You need to login first</p>
</div>
{/if}