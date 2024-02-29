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

<div class="flex justify-center items-center min-h-screen bg-light px-5">
	<form on:submit={handleSubmit} class="flex flex-col bg-white text-dark p-5 rounded-md sm:max-w-sm w-full border border-gray">
		<a href="/" >
			<img src="/logo.png" alt="logo" class="w-7 h-7 mb-5">
		</a>

		<h3 class="text-xl font-bold pb-1">Signup</h3>
		<p class="text-sm font-normal pb-5">to register to Cure Me</p>

		<label for="name" class="text-sm font-normal pb-2.5">Name</label>
		<input type="text" id="name" name="name" required class="focus:outline-none p-2 mb-5 w-full text-sm font-normal rounded-md border border-gray" />

		<label for="email" class="text-sm font-normal pb-2.5">Email</label>
		<input type="email" id="email" name="email" required class="focus:outline-none p-2 mb-5 w-full text-sm font-normal rounded-md border border-gray" />

		<label for="password" class="text-sm font-normal pb-2.5">Password</label>
		<input
			type="password"
			id="password"
			name="password"
			required
			minlength="8"
			class="focus:outline-none p-2 mb-5 w-full text-sm font-normal rounded-md border border-gray"
		/>
		<button type="submit" class="p-2 mb-5 w-full text-md font-medium rounded-md bg-red text-white">Signup</button>
		<p class="text-md font-normal">Already have an account? <a href="/login" class="text-md font-medium">Login</a></p>
		{#if formError}
			<p class="text-md font-medium">{formError}</p>
		{/if}
	</form>
</div>