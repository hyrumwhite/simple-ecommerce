<template>
	<label class="flex flex-col">
		<span class="ml-4">{{ label }}</span>
		<input
			class="
				py-2
				px-4
				bg-slate-100
				border border-slate-200
				rounded-full
				outline-offset-4 outline-blue-500
			"
			v-bind="$attrs"
		/>
	</label>
</template>

<script setup>
const props = defineProps({
	label: {
		type: String,
		default: "",
	},
});
</script>

<style lang="scss" scoped>
</style>