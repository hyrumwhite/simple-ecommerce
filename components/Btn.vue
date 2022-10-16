<template>
	<button :class="computedClass" v-bind="$attrs">
		<slot />
	</button>
</template>

<script setup>
const props = defineProps({
	icon: {
		type: Boolean,
		default: false,
	},
});
const computedClass = computed(() => ({
	"px-6 py-2 rounded-3xl bg-blue-700 text-white font-bold": !props.icon,
	"bg-transparent w-10 h-10 text-slate-700 p-0 hover:bg-slate-100 flex items-center justify-center rounded-full disabled:bg-transparent disabled:text-slate-300":
		props.icon,
}));
</script>

<style lang="scss" scoped>
</style>