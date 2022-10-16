import { defineStore } from "pinia";
export default defineStore("products-store", () => {
	const productsList = ref([]);
	const totalProducts = ref(0);
	const filter = ref({
		offset: 0,
		limit: 25,
	});
	const getProducts = async ({ id, offset = 0, limit = 25 } = {}) => {
		filter.value.offset = offset;
		filter.value.limit = limit;
		const params = new URLSearchParams({
			id,
			offset: filter.value.offset,
			limit: filter.value.limit,
		});
		const { products, total } = await $fetch(`/api/products?${params}`);
		totalProducts.value = total;
		productsList.value = products;
	};
	const createProduct = async ({ id, fields }) => {
		const body = { id };
		for (let field of fields) {
			if (field.value != null) {
				body[field.key] = field.value;
			}
		}
		await $fetch(`/api/products`, {
			method: "POST",
			body,
		});
	};
	return { productsList, totalProducts, filter, getProducts, createProduct };
});
