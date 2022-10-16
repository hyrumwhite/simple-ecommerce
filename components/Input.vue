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
			@input="handleInput"
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
	debounceDelay: {
		type: Number,
		default: 500,
	},
});
const emit = defineEmits(["update:modelValue", "debouncedInput"]);
let debounceTimeout = null;
const handleInput = ($event) => {
	emit("update:modelValue", $event.target.value);
	clearTimeout(debounceTimeout);
	debounceTimeout = setTimeout(() => {
		emit("debouncedInput", $event.target.value);
	}, props.debounceDelay);
};
</script>

<style lang="scss" scoped>
</style>