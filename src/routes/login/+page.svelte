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

<div class="flex justify-center items-center min-h-screen bg-red px-6">
	<form on:submit={handleSubmit} class="flex flex-col bg-white text-black p-6 rounded-3xl sm:max-w-sm w-full border">
		<h3 class="text-xl font-bold">Login</h3>
		<p class="text-sm font-normal pb-6">to continue to Commune</p>
		
		<label  for="email" class="text-sm font-normal pb-2">Email</label>
		<input type="email" id="email" name="email" required class="focus:outline-none p-2 mb-6 w-full font-normal rounded-lg border" />
		
		<label  for="password" class="text-sm font-normal pb-2">Password</label>
		<input
			type="password"
			id="password"
			name="password"
			required
			minlength="8"
			class="focus:outline-none p-2 mb-3 w-full font-normal rounded-lg border"
		/>
		<button type="submit" class="bg-red text-white text-md font-medium p-2 rounded-lg border border-red hover:opacity-90 mb-6">Login</button>
		<p class="text-md font-light">Don't have an account? <a href="/signup" class="text-md font-medium">Signup</a></p>
		{#if formError}
			<p class="text-md font-semibold">{formError}</p>
		{/if}
	</form>
	
</div>