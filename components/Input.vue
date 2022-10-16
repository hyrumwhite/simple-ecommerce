<template>
	<label class="flex flex-col">
		<span class="ml-4">
			{{ label }}
			<span v-if="$attrs.required" class="text-red-600">*</span></span
		>
		<input
			:value="props.modelValue"
			class="
				py-2
				px-4
				bg-slate-100
				border border-slate-200
				rounded-full
				outline-offset-4 outline-blue-500
			"
			v-bind="$attrs"
			@input="emit('update:modelValue', $event.target.value)"
		/>
	</label>
</template>

<script setup>
const props = defineProps({
	modelValue: {
		type: String,
		default: "",
	},
	label: {
		type: String,
		default: "",
	},
});
const emit = defineEmits(["update:modelValue"]);
</script>

<style lang="scss" scoped>
</style>