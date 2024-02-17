<!-- src/routes/signup/+page.svelte -->
<script>
	import { invalidateAll } from '$app/navigation';
	import { appwrite } from '$lib/appwrite';
  import { ID } from "appwrite";

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

		const { name, email, password } = formData;
		if (!name || !email || !password) {
			formError = 'Please fill out all fields';
			return;
		}

		try {
			await appwrite.account.create(ID.unique(), email, password, name);
			await appwrite.account.createEmailSession(email, password);
			await invalidateAll();
		} catch (e) {
			formError = /** @type {import('appwrite').AppwriteException} */ (e).message;
		}
	}
</script>

<div class="flex justify-center items-center bg-red min-h-screen px-6">
	<form on:submit={handleSubmit} class="flex flex-col bg-white text-black p-6 rounded-3xl sm:max-w-sm w-full">

		<h3 class="text-xl font-bold">Signup</h3>
		<p class="text-sm font-normal text-black pb-6">to register to Commune</p>

		<label for="name" class="text-sm font-normal pb-2">Name</label>
		<input type="text" id="name" name="name" required class="focus:outline-none p-2 mb-6 w-full text-sm font-normal rounded-lg border-[1px] border-grey" />

		<label for="email" class="text-sm font-normal pb-2">Email</label>
		<input type="email" id="email" name="email" required class="focus:outline-none p-2 mb-6 w-full text-sm font-normal rounded-lg border-[1px] border-grey" />

		<label for="password" class="text-sm font-normal pb-2">Password</label>
		<input
			type="password"
			id="password"
			name="password"
			required
			minlength="8"
			class="focus:outline-none p-2 mb-3 w-full font-normal rounded-lg border"
		/>
		<button type="submit" class="bg-red text-white text-md font-medium p-2 rounded-lg border border-red hover:opacity-90 mb-6 ">Signup</button>
		<p class="text-md font-light">Already have an account? <a href="/login" class="text-md font-medium">Login</a></p>
		{#if formError}
			<p class="text-md font-medium">{formError}</p>
		{/if}
	</form>
</div>