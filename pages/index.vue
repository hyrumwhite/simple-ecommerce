<template>
	<div class="flex flex-col gap-4">
		<div class="flex items-center gap-6 justify-between">
			<h1 class="text-3xl">My Products</h1>
			<Btn class="py-2" @click="showCreateProduct = true">Add Product</Btn>
		</div>
		<div class="border rounded-md overflow-hidden">
			<DataTable :headers="headers" :items="productsStore.productsList">
				<template v-if="productsStore.productsList.length === 0" #body_prepend>
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
		<CreateNewProductDialog
			v-model="showCreateProduct"
			@productSubmitted="createProduct"
		/>
	</div>
</template>

<script setup>
import { toTitleCase } from "~/assets/js/toTitleCase";
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
	getProducts({
		id: currentUser.id,
		offset: (page - 1) * filter.limit,
	});
};

const showCreateProduct = ref(false);

const tableKeys = ["product_name", "style", "brand", "sku"];
const headers = tableKeys
	.filter((key) => tableKeys.includes(key))
	.map((key) => ({
		value: key,
		text: toTitleCase(key),
		class: "h-12 border-b pl-2",
	}));
const loaded = ref(false);
const loadingError = ref(false);

const getProducts = async (params) => {
	try {
		await productsStore.getProducts(params);
	} catch (e) {
		console.error(e);
		loadingError.value = true;
	}
};
onMounted(async () => {
	await getProducts(currentUser);
	loaded.value = true;
});

const { alert } = useAlert();
const createProduct = async (productFields) => {
	try {
		await productsStore.createProduct({
			id: currentUser.id,
			fields: productFields.value,
		});
		//TODO: implement alert system
		alert("Created new product!");
	} catch (e) {
		//TODO: notify user of failure
		console.error("failed to create product");
		console.error(e);
	}
	productsStore.getProducts(currentUser);
};
</script>

<style scoped>
/* table >>> .th_description {
	max-width: 200px;
} */
</style>