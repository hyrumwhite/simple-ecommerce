<template>
	<div class="flex flex-col gap-4">
		<div class="flex items-center gap-6 justify-between">
			<h1 class="text-3xl">My Products</h1>
			<Btn class="py-2">Add Product</Btn>
		</div>
		<div class="border rounded-md overflow-hidden">
			<DataTable :headers="headers" :items="productsStore.productsList">
				<template #td_description="{ value }">
					<span :title="value">{{ value.slice(0, 20) + "..." }}</span>
				</template>
				<template #td_shipping_price="{ item }">
					{{ item.shippingPriceDisplay }}
				</template>
				<template #td_created_at="{ item }">
					{{ item.createdDisplayDate }}
				</template>
				<template #td_updated_at="{ item }">
					{{ item.updatedDisplayDate }}
				</template>
				<template #td_note="{ value }">
					<Btn v-if="value" class="py-1 bg-slate-200 text-slate-900"
						>View Note</Btn
					>
				</template>
			</DataTable>
			<Pagination
				:page="currentPage"
				@navigate="handleTableNavigation"
				:lastPage="lastPage"
			/>
		</div>
	</div>
</template>

<script setup>
import { schema } from "~/db/schema.mjs";
const productsStore = useProductsStore();
const { currentUser } = useUserStore();
const currentPage = computed(
	() => productsStore.filter.offset / productsStore.filter.limit + 1
);
const lastPage = computed(() =>
	Math.ceil(productsStore.totalProducts / productsStore.filter.limit)
);
const handleTableNavigation = (page) => {
	const { filter, totalProducts } = productsStore;
	if (page == "last") {
		page = Math.ceil(totalProducts / filter.limit);
	}
	productsStore.getProducts({
		id: currentUser.id,
		offset: (page - 1) * filter.limit,
	});
};
//toTileCase is from https://stackoverflow.com/a/64489760/3803371
const toTitleCase = (s) =>
	s
		.replace(/^[-_]*(.)/, (_, c) => c.toUpperCase()) // Initial char (after -/_)
		.replace(/[-_]+(.)/g, (_, c) => " " + c.toUpperCase());
const excludedKeys = ["admin_id", "id"];
const headers = Object.keys(schema.products)
	.filter((key) => !excludedKeys.includes(key))
	.map((key) => ({
		value: key,
		text: toTitleCase(key),
		class: "h-12 border-b pl-2",
	}));
onMounted(async () => {
	productsStore.getProducts(currentUser);
});
</script>

<style scoped>
/* table >>> .th_description {
	max-width: 200px;
} */
</style>