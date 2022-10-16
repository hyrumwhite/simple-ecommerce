<template>
	<div class="flex flex-col gap-4">
		<div class="flex items-center gap-6 justify-between h-10">
			<h1 class="text-3xl">My Inventory</h1>
		</div>
		<div class="flex items-center gap-3">
			<Input
				label="Filter by SKU"
				placeholder="ex. CPESUA"
				@debouncedInput="searchInventory({ sku: $event })"
			/>
			<Input
				label="Filter by Product ID"
				placeholder="ex. 42"
				@debouncedInput="searchInventory({ productId: $event })"
			/>
		</div>
		<div class="border rounded-md overflow-hidden">
			<DataTable :headers="headers" :items="inventoryStore.inventoryList">
				<template
					v-if="inventoryStore.inventoryList.length === 0"
					#body_prepend
				>
					<div class="flex items-center justify-center py-3">
						<span v-if="loadingError">
							An error occurred while loading the table
						</span>
						<span v-else-if="loaded">
							No results found for the current user
						</span>
						<span v-else class="flex items-center gap-1">
							<IconLoader class="animate-spin text-zinc-700" /> Loading...
						</span>
					</div>
				</template>
				<template #th_price_cents> Price </template>
				<template #th_cost_cents> Cost </template>
				<template #td_price_cents="{ item }">
					{{ item.priceDisplay }}
				</template>
				<template #td_cost_cents="{ item }"> {{ item.costDisplay }} </template>
				<template #td_sku="{ value }">
					<span v-if="value">{{ value }}</span>
					<span v-else>N/A</span>
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
import { toTitleCase } from "~/assets/js/toTitleCase";
const inventoryStore = useInventoryStore();
const { currentUser } = useUserStore();
const currentPage = computed(
	() => inventoryStore.filter.offset / inventoryStore.filter.limit + 1
);
const lastPage = computed(() =>
	Math.ceil(inventoryStore.totalInventory / inventoryStore.filter.limit)
);
const handleTableNavigation = (page) => {
	const { filter, totalInventory } = inventoryStore;
	if (page == "last") {
		page = Math.ceil(totalInventory / filter.limit);
	}
	getInventory({
		offset: (page - 1) * filter.limit,
	});
};

const tableKeys = [
	"product_name",
	"sku",
	"quantity",
	"color",
	"size",
	"price_cents",
	"cost_cents",
];
const headers = tableKeys.map((key) => ({
	value: key,
	text: toTitleCase(key),
	class: "h-12 border-b pl-2",
}));
const loaded = ref(false);
const loadingError = ref(false);
const searchInventory = async (search) => {
	loaded.value = false;
	search.offset = 0;
	getInventory(search);
};
const getInventory = async (params) => {
	loadingError.value = false;
	try {
		await inventoryStore.getInventory({ id: currentUser.id, ...params });
	} catch (e) {
		console.error(e);
		loadingError.value = true;
	}
};
onMounted(async () => {
	await getInventory();
	loaded.value = true;
});
</script>

<style scoped>
/* table >>> .th_description {
	max-width: 200px;
} */
</style>