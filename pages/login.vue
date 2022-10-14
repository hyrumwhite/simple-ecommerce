<template>
	<form
		class="
			overflow-hidden
			relative
			flex flex-col
			w-[600px]
			h-[600px]
			rounded-md
			bg-white
			shadow-md
			p-3
			gap-3
		"
	>
		<Input label="Username" autofocus />
		<Input label="Password" autofocus />
		<Btn>Sign in</Btn>
	</form>
</template>

<script setup>
definePageMeta({
	layout: "login",
});
</script>

<style lang="scss" scoped>
</style>