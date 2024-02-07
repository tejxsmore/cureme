<!-- src/routes/login/+page.svelte -->
<script>
	import { invalidateAll } from '$app/navigation';
	import { appwrite } from '$lib/appwrite';

	/** @type {string|null} */
	let formError = null;

	/**
	 * @param {Event} event
	 */
	async function handleSubmit(event) {
		event.preventDefault();
		formError = null;

		const form = /** @type {HTMLFormElement} */ (event.target);
		const formData = /** @type Record<string, string | undefined> */ (
			Object.fromEntries(new FormData(form).entries())
		);

		const { email, password } = formData;
		if (!email || !password) {
			formError = 'Please fill out all fields';
			return;
		}

		try {
			await appwrite.account.createEmailSession(email, password);
			await invalidateAll();
		} catch (e) {
			formError = /** @type {import('appwrite').AppwriteException} */ (e).message;
		}
	}
</script>

<div class="flex justify-center items-center bg-dark min-h-screen p-4">
	<form on:submit={handleSubmit} class="flex flex-col bg-white text-black p-8 rounded-3xl sm:max-w-sm w-full">
		<h3 class="text-xl font-semibold">Login</h3>
		<p class="font-light text-black pb-6">to continue to Commune</p>
		
		<label  for="email" class="font-normal pb-2">Email</label>
		<input type="email" id="email" name="email" required class="focus:outline-none p-2 mb-6 w-full font-normal rounded-lg border-[1px] border-grey" />
		
		<label  for="password" class="font-normal pb-2">Password</label>
		<input
			type="password"
			id="password"
			name="password"
			required
			minlength="8"
			class="focus:outline-none p-2 mb-3 w-full font-normal rounded-lg border-[1px] border-grey"
		/>
		<button type="submit" class="bg-red text-white font-semibold p-2 rounded-lg border-[1px] border-red hover:bg-rose-600 mb-6">Login</button>
		<p class="text-md font-light">Don't have an account? <a href="/signup" class="font-semibold">Signup</a></p>
		{#if formError}
			<p class="text-md font-semibold">{formError}</p>
		{/if}
	</form>
	
</div>