<template>
	<dialog
		ref="dialogRef"
		class="backdrop:bg-black/30 rounded-lg p-0"
		@click="offClickListener"
		@close="closeDialog"
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
const emit = defineEmits(["update:modelValue", "closed"]);
const dialogRef = ref(null);
// invokd on native 'close' event to keep model consistent
const closeDialog = () => {
	emit("update:modelValue", false);
	emit("closed", true);
};
const offClickListener = ($event) => {
	if (dialogRef.value === $event.target) {
		closeDialog();
	}
};
watch(
	() => props.modelValue,
	() => {
		if (props.modelValue) {
			if (dialogRef) {
				dialogRef.value?.showModal();
			}
		} else {
			dialogRef.value?.close();
		}
	}
);
//mostly here bc hmr destroys the element
onUnmounted(closeDialog);
</script>

<style scoped>
</style>