<template>
	<div class="flex items-center justify-end p-2 gap-2">
		<span class="mr-4">Page {{ page }} of {{ lastPage }}</span>
		<Btn icon @click="navigate(0)" :disabled="page === 1"
			><IconFirstPage
		/></Btn>
		<Btn icon @click="navigate(page - 1)" :disabled="page === 1"
			><IconArrowLeft
		/></Btn>
		<Btn icon @click="navigate(page + 1)" :disabled="page === lastPage">
			<IconArrowRight />
		</Btn>
		<Btn icon @click="navigate('last')" :disabled="page === lastPage">
			<IconLastPage />
		</Btn>
	</div>
</template>

<script setup>
const props = defineProps({
	page: {
		type: Number,
		default: 1,
	},
	lastPage: {
		type: Number,
		default: false,
	},
});
const emit = defineEmits(["navigate"]);
const navigate = (page) => {
	if (page < 1) {
		page = 1;
	}
	emit("navigate", page);
};
</script>

