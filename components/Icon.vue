<template>
	<svg :style="style" :viewBox="viewBox">
		<slot />
	</svg>
</template>

<script setup>
const props = defineProps({
	size: {
		type: Number,
		default: 24,
	},
});
const style = computed(() => ({
	width: `${props.size}px`,
	height: `${props.size}px`,
}));
const viewBox = computed(() => `0 0 ${props.size} ${props.size}`);
</script>

<style lang="scss" scoped>
</style>