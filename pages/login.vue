<template>
	<form
		action="/api/login"
		class="
			overflow-hidden
			relative
			flex flex-col
			w-[350px]
			rounded-md
			bg-white
			shadow-md
			p-6
			gap-4
		"
	>
		<h1 class="text-2xl flex justify-center">Welcome!</h1>
		<Input
			label="Email"
			name="email"
			type="email"
			autofocus
			placeholder=""
			value="micheline.pruden@somemail.com"
		/>
		<Input
			label="Password"
			name="password"
			type="password"
			value="TZucsISXhS"
		/>
		<Btn class="mt-2">Sign in</Btn>
	</form>
</template>

<script setup>
definePageMeta({
	layout: "login",
});
</script>

<style lang="scss" scoped>
</style>