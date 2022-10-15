<template>
	<dialog
		ref="dialogRef"
		class="backdrop:bg-black/30 rounded-lg p-0"
		@click="offClickListener"
	>
		<div class="bg-white shadow-2xl rounded-lg h-full w-full p-4">
			<slot />
		</div>
	</dialog>
</template>

<script setup>
const props = defineProps({
	modelValue: {
		type: Boolean,
		value: false,
	},
});
const emit = defineEmits(["update:modelValue"]);
const dialogRef = ref(null);
const offClickListener = ($event) => {
	if (dialogRef.value === $event.target) {
		emit("update:modelValue", false);
	}
};
watch(
	() => props.modelValue,
	() => {
		console.log("triggered");
		if (props.modelValue) {
			if (dialogRef) {
				dialogRef.value?.showModal();
			}
		} else {
			dialogRef.value?.close();
		}
	}
);
</script>

<style scoped>
</style>